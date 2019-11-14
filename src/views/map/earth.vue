<template>
      <section class="setFlexColumn">
            <div class="dv"><el-button size="mini" @click="backTo(-1)">退出</el-button></div>
             <div style="setFlexOne" id="cesiumContainer"></div>
      </section>
</template>
<script>
export default {
      data() {
            return {
                  m: 0,
                  stationData: [
                        { name: '牡丹江', label: 'MDJ', lon: 0.0, lat: 0.0,bgColor: 'PURPLE', description: 'MDJ的站点信息' },
                        { name: '陵水', label: 'LS', lon: 20.0, lat: 20.0, bgColor: 'BLUE', description: 'LS的站点信息' }
                  ],
                  // 卫星数据
                  satelliteData: [
                        {
                              name: 'Jiabing8-6', identify: 'CFO', time: '2019-01-01 00:00', check: true, image: '../../static/satellite/H1C.png',
                              list: [{lon:0, lat:0, alt:2000000, time:0},{lon:116.2821, lat:39.918145, alt: 900, time:40},{lon:115.497402, lat:39.344641, alt: 950, time:100},{lon:107.942392, lat:29.559967, alt:70000, time:280}, {lon:106.549265, lat:29.559967, alt:0, time:360}],
                              zcList: {
                                    Projectindex: '0001', SpyReqId: '0001', Planindex: '0001', Taskuid: '0001', Sinumber: '0001', Dcnumber: '0001',
                                    Tstime: '0001', Tetime: '0001', Duration: '1h', Isrealtime: '0001', Ifconvert: 'true', Teltracstate: 'false', 
                                    CatalogTime: '2019-8-12 22：22：22', MsgXml: ''  
                              },
                              fusheList:[{lon: 0, lat: 0, alt: 0, time: 0}]
                        }, 
                        {
                              name: 'Jianbing8-7', identify: 'H2B', time: '2019-02-06 00:00', check: true, image: '../../static/satellite/H1A.png',
                              list: [{lon:0.23, lat:0.234, alt:3000000, time:0},{lon:117.034586, lat:39.881202, alt:0, time:40},{lon:116.340088, lat:38.842224, alt:70000, time:100},{lon:113.489176, lat:23.464017, alt:70000, time:280}, {lon:113.262084, lat:23.13901, alt:0, time:360}],
                              zcList: {
                                    Projectindex: '0002', SpyReqId: '0002', Planindex: '0002', Taskuid: '0002', Sinumber: '0002', Dcnumber: '0002',
                                    Tstime: '0002', Tetime: '0002', Duration: '1h', Isrealtime: '0002', Ifconvert: 'true', Teltracstate: 'false',
                                    CatalogTime: '2019-8-12 22：22：22', MsgXml: ''  
                              },
                              fusheList:[{lon: 0.23, lat: 0.234, alt: 0, time: 0}]
                        }, 
                        {
                              name: 'Jingbing8-8', identify: 'H2A', time: '2019-03-08 00:00', check: true, image: '../../static/satellite/H2C.png',
                              list: [{lon:100.23, lat:43.34, alt:4000000, time:0},{lon:118.438838, lat:32.03777, alt:0, time:40},{lon:117.802406, lat:31.91231, alt:70000, time:100},{lon:104.043645, lat:35.993845, alt:70000, time:280}, {lon:101.807224, lat:36.660972, alt:0, time:360}],
                              zcList: {
                                    Projectindex: '0003', SpyReqId: '0003', Planindex: '0003', Taskuid: '0003', Sinumber: '0003', Dcnumber: '0003',
                                    Tstime: '0003', Tetime: '0003', Duration: '1h', Isrealtime: '0003', Ifconvert: 'true', Teltracstate: 'false',
                                    CatalogTime: '2019-8-12 22：22：22', MsgXml: ''  
                              },
                              fusheList:[{lon: 100.23, lat: 43.34, alt: 0, time: 0}]
                        }
                  ],
                  // 放射点数据
                  radiationData: [
                        //{ name: '台湾', identify: 'taiwan', lon: 100.23, lat: 83.34 },
                        // { name: '钓鱼岛', identify: 'diaoyudao', lon: 40.23, lat: 0.234 },
                        // { name: '日本',  identify: 'riben', lon: 0, lat: -40 }
                  ],
                  // 显示水波纹位置数据
                  waterWave: [
                        {"name":"台湾", "value":20000, "identify": "Taiwan", "COLOR": "PURPLE", "coordinates":[100.23, 83.34]},
                        {"name":"钓鱼岛", "value":20000, "identify": "Diaoyudao", "COLOR": "PURPLE","coordinates":[40.23, 0.234]},
                        {"name":"日本", "value":20000, "identify": "Riben", "COLOR": "RED","coordinates":[0, -40]},
                        // {"name":"北京D", "value":40,"coordinates":[116.259491, 39.593590]},
                        // {"name":"北京E", "value":10,"coordinates":[117.264262, 40.184631]}
                  ],
                  waveBaseNumer: 8000

            }
      },
      mounted() {
            console.log('cesium :', Cesium);
            this.initView();
            const self = this
            self.intervial = setInterval(function(){
                  self.m +=2
                  self.getCurrentTime()
            }, 1000)
      },
      methods: {
            initView(){
                  // let  Cesium = this.Cesium;
                  let viewer = new Cesium.Viewer('cesiumContainer', {
                        creditContainer:"cesiumContainer", // 存放图的div
                        navigationHelpButton: false,
                        requestRenderMode: true, //启用请求渲染模式
                        scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存 
                        baseLayerPicker : false,
                        shouldAnimate : true,
                        infoBox: true,
                         // 加载在线谷歌地图
            //             imageryProvider: new Cesium.UrlTemplateImageryProvider({
            //                   //url:"http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
            //                   url: "../static/world.bmp"
            //             }),
                        imageryProvider: Cesium.createTileMapServiceImageryProvider({
                              url: '../../static/Textures/NaturalEarthII',
                              credit: '../../static/Textures/NaturalEarthII'
                        }),
                  });
                  this.viewer = viewer;
                  viewer.entities.add({ // 添加一个点
                        name: '指示点1',
                        position : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
                        point : { pixelSize : 10, color : Cesium.Color.RED },
                        description: '这是一个红色指示点'
                  });
                  this.stationData.map((item => { // 添加站点信息
                        viewer.entities.add({
                              position:Cesium.Cartesian3.fromDegrees(item.lon, item.lat),
                              name: `${item.name}站`,
                              ellipse:{
                                    semiMinorAxis:2000000.0,
                                    semiMajorAxis:2000000.0,
                                    material: Cesium.Color[item.bgColor].withAlpha(0.5)
                              },
                              billboard: { image: '../../static/images/satellite.png', width: 20, height: 20 }, // 广告牌
                              label: {
                                    text: item.name,
                                    font: '12pt monospace',
                                    pixelOffset: new Cesium.Cartesian2(40,0)
                              },
                              description: item.description
                        });
                  }));
                  viewer.entities.add({ // 添加蓝色边框的粉色盒子
                        name : 'name: pink box',
                        position: Cesium.Cartesian3.fromDegrees(-197.0, 40.0, 300000.0),
                        box : {
                              dimensions : new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
                              material : Cesium.Color.PINK.withAlpha(0.5),
                              outline : true,
                              outlineColor : Cesium.Color.BLUE
                        },
                        description: '描述：黑色边的粉色盒子'
                  });
                  // 通过czml添加黑色边框的红色盒子
                  // let czml = [ 
                  //       {  "id" : "document", "name" : "box", "version" : "1.0" },
                  //       {
                  //             "id" : "shape2",
                  //             "name" : "Red box with black outline",
                  //             "position" : { "cartographicDegrees" : [-107.0, 40.0, 300000.0] },
                  //             "box" : {
                  //                   "dimensions" : { "cartesian": [400000.0, 300000.0, 500000.0] },
                  //                   "material" : { "solidColor" : { "color" : { "rgba" : [255, 0, 0, 128] } } },
                  //                   "outline" : true,
                  //                   "outlineColor" : { "rgba" : [0, 0, 0, 255] }
                  //             }
                  //       }];
                  // let dataSourcePromise = Cesium.CzmlDataSource.load(czml);
                  // viewer.dataSources.add(dataSourcePromise);
                  // viewer.zoomTo(dataSourcePromise);
                  // 设置材质
                  let entity = viewer.entities.add({
                        name: 'name: 网格',
                        position: Cesium.Cartesian3.fromDegrees(-90.0, 40.0),
                        ellipse : {
                              semiMinorAxis : 2000000.0,
                              semiMajorAxis : 2000000.0,
                              // material : Cesium.Color.BLUE.withAlpha(0.5)//可设置不同的MaterialProperty
                        },
                        description: '描述: 黄色区域扫描位置'
                  });
                  // 针对 material 重新设置属性
                  let ellipse = entity.ellipse;
                  ellipse.material = Cesium.Color.RED;                  
                  ellipse.material = new Cesium.GridMaterialProperty({
                        color : Cesium.Color.YELLOW,
                        cellAlpha : 0.2,
                        lineCount : new Cesium.Cartesian2(8, 8),
                        lineThickness : new Cesium.Cartesian2(2.0, 2.0)
                  });
                  // 添加 纹理 线
                  let entity2 = viewer.entities.add({
                        name: 'name: Polyline 纹理',
                        polyline : {
                              positions : Cesium.Cartesian3.fromDegreesArray([-20, 35, -77.1, 35]),
                              width : 5,
                        //      material : Cesium.Color.RED,
                             material: new Cesium.PolylineGlowMaterialProperty({ // 发光颜色(中心颜色为白色)
                                    glowPower : 0.2,
                                    color : Cesium.Color.BLUE
                             })
                        },
                        description: '描述：发光纹理线哦~'
                  });
                  
                  let wyoming = viewer.entities.add({ 
                        name : 'Wyoming',
                        polygon : {
                              hierarchy : Cesium.Cartesian3.fromDegreesArray([
                                                -109.080842,45.002073, -105.91517,45.002073, -104.058488,44.996596, -104.053011,43.002989,
                                                -104.053011,41.003906, -105.728954,40.998429, -107.919731,41.003906, -109.04798,40.998429,
                                                -111.047063,40.998429, -111.047063,42.000709, -111.047063,44.476286, -111.05254,45.002073]),
                              height : 0,
                              material : Cesium.Color.RED.withAlpha(0.5),
                              outline : true,
                              outlineColor : Cesium.Color.BLACK
                        },
                        description:'描述: divID 黑色边红色的覆盖范围'//方法一
                  });
                  viewer.zoomTo(wyoming);
                  viewer.zoomTo(viewer.entities);
                  //添加卫星
                  this.satelliteData.forEach(val=> {  // 卫星
                        this.addSatellite(val)
                  });
                  // 添加扩散水波纹
                  //构造动的扩散涟漪  实际上就是把图片圆形按时间改变半径
                  this.waterWave.forEach(val => {
                        this.addCircleRipple({
                              json:val,
                              deviationR: 5500,//差值 差值也大 速度越快
                              eachInterval:1700,//两个圈的时间间隔
                              // imageUrl:"assets/home/redCircle2.png",
                              //imageUrl: '../../assets/images/logo.png',
                              maxR:(val.value)*20
                        });
                        
                  })

            }, // initView ending
            addSatellite(val){ // 球上添加卫星
                  // var start = Cesium.JulianDate.fromDate(new Date(2019, 10, 20, 16, 0, 0));  // 起始时间
                  var start = Cesium.JulianDate.fromDate(new Date());  // 起始时间
                  var stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());   // 终止时间
                  // 设置时间轴范围
                  this.viewer.clock.startTime = start.clone();
                  this.viewer.clock.stopTime = stop.clone();
                  this.viewer.clock.currentTime = start.clone();
                  this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
                  this.viewer.clock.multiplier = 2; //时间变化来控制速度
                  // 给时间线设置边界
                  this.viewer.timeline.zoomTo(start, stop);

                  this.viewer.entities.add({
                        id: val.identify,
                        name : val.name,
                        availability : new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                              start: start,
                              stop: stop
                        })]),
                        description: `${val.name} 正在绕地球旋转ing`,
                        position : this.computeCirclularFlight(val.list[0].lon, val.list[0].lat, val.list[0].alt, start),
                        billboard : { image : val.image , },  //图标
                        // 基于位置移动计算方向
                        orientation : new Cesium.VelocityOrientationProperty(this.position),
                        path: { // 卫星轨迹
                              show: true,
                              resolution: 1,
                              material: Cesium.Color.ORANGE,
                              width: 1
                        },
                        label: {
                              show: true,
                              text: val.name,
                              fillColor: Cesium.Color.GREEN, 
                              font : 'normal 32px Microsoft YaHei',
                              scale: 0.5,
                              pixelOffset:new Cesium.Cartesian2(40,0),
                        },
                        rectangle: {
                              // coordinates: Cesium.Rectangle.fromDegrees(val.list[0].lon, val.list[0].lat, -90.0, 30.0),
                              material: new Cesium.StripeMaterialProperty({
                                    evenColor: Cesium.Color.WHITE,
                                    oddcolor: Cesium.Color.BLUE,
                                    repeat: 5
                              })
                        },
                        ellipse: {
                              semiMinorAxis: 600000.0,
                              semiMajorAxis: 850000.0,
                              material: Cesium.Color.AQUA.withAlpha(0.3)
                        }
                  })
            },
            computeCirclularFlight(lon, lat, alt, start) { // 计算轨迹
                  let property = new Cesium.SampledPositionProperty(); 
                  if (alt === 2000000) {
                        for(let i=0; i<=360; i+=1){
                              var radians = Cesium.Math.toRadians(i);
                              let time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate);
                              let position = Cesium.Cartesian3.fromDegrees(lon, lat-i, alt);
                              // 添加位置，和时间对应
                              property.addSample(time, position);
                        }
                  } else if (alt === 3000000) {
                       for(let i=0; i<=360; i+=1){
                              var radians = Cesium.Math.toRadians(i);
                              let time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate);
                              let position = Cesium.Cartesian3.fromDegrees(lon + i, lat, alt);
                              // 添加位置，和时间对应
                              property.addSample(time, position);
                        } 
                  } else if (alt === 4000000) {
                        for(let i=0; i<=360; i+=1){
                              var radians = Cesium.Math.toRadians(i);
                              let time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate);
                              let position = Cesium.Cartesian3.fromDegrees(lon, lat + i, alt);
                              // 添加位置，和时间对应
                              property.addSample(time, position);
                        }
                  }
                  return property;
            },
            getCurrentTime(){
                  if (this.m === 10) {
                        this.addZCFormModel = this.satelliteData[1].zcList
                        this.radiationData.forEach(val => this.addRadiation(val))
                        // this.handleCommand('addZC')
                  }
            },
            addRadiation(val){ // 球上添加放射点
                  var x = 6, flog = true;
                  this.viewer.entities.add({
                        name: `name: ${val.name}`,
                        description: `${val.name}-(${val.identify}) 相关信息`,
                        id: val.identify,
                        position: Cesium.Cartesian3.fromDegrees(val.lon, val.lat),
                        point: {
                              show: true,
                              color: new Cesium.CallbackProperty(function(){
                                    if (flog){
                                          x = x - 1
                                          if (x < 5) { flog = false }
                                    } else {
                                          x = x + 1
                                          if (x > 25) { flog = true }
                                    }
                                    return Cesium.Color.AQUA.withAlpha(x)
                              }, false),
                              pixelSize: new Cesium.CallbackProperty(function(){
                                    if (flog){
                                          x = x - 1
                                          if (x < 3) { flog = false }
                                    } else {
                                          x = x + 1
                                          if (x > 15) { flog = true }
                                    }
                                    return x
                              }, false),
                              outlineWidth: 0
                        }
                  })
            },
            // *******添加水波纹 start**************************************
            addCircleRipple(data){
                  var r1=this.waveBaseNumer,r2=this.waveBaseNumer; var r3=this.waveBaseNumer,r4=this.waveBaseNumer;
                  let changeR1 = () => { //这是callback，参数不能内传
                        r1=r1+data.deviationR;
                        if(r1>=data.maxR){ r1=this.waveBaseNumer; }
                        return r1;
                  }
                  let changeR2 = () => {
                        r2=r2+data.deviationR;
                        if(r2>=data.maxR){ r2=this.waveBaseNumer; }
                        return r2;
                  }
                  //第一个圆先跑
                  this.viewer.entities.add({
                        name: `name: ${data.json.name}`,
                        description: `${data.json.name}-(${data.json.identify}) 相关信息`,
                        position:Cesium.Cartesian3.fromDegrees(data.json.coordinates[0],data.json.coordinates[1],0),
                        show:true,
                        ellipse:{
                              semiMinorAxis :new Cesium.CallbackProperty(changeR1,false),
                              semiMajorAxis :new Cesium.CallbackProperty(changeR2,false),
                              height:10,
                              material:new Cesium.ImageMaterialProperty({
                              image:data.imageUrl,
                              repeat:Cesium.Cartesian2(1.0, 1.0),  //指定图像在每个方向上重复的次数,默认为Cesium.Cartesian2(1.0, 1.0),{Cartesian2}类型
                              transparent:true,// 默认为false，当图像具有透明性时设置为true（例如，当png具有透明部分时）
                              color:new Cesium.CallbackProperty(function () {
                                    var alp=1-r1/data.maxR;
                                    // return  Cesium.Color.WHITE.withAlpha(alp)
                                    return  Cesium.Color[data.json.COLOR].withAlpha(0.3)
                                    //entity的颜色透明 并不影响材质，并且 entity也会透明
                              },false)
                              })
                        }
                  });
                  //第二个圆开始跑
                  setTimeout(() => {
                        let changeR11 = () => { //这是callback，参数不能内传
                              r3=r3+data.deviationR;
                              if(r3>=data.maxR){ r3=this.waveBaseNumer; }
                              return r3;
                        }
                        let changeR12 = () => {
                              r4=r4+data.deviationR;
                              if(r4>=data.maxR){ r4=this.waveBaseNumer; }
                              return r4;
                        }
                        this.viewer.entities.add({
                              name: `name: ${data.json.name}`,
                              description: `${data.json.name}-(${data.json.identify}) 相关信息`,
                              position:Cesium.Cartesian3.fromDegrees(data.json.coordinates[0],data.json.coordinates[1],0),
                              show:true,
                              ellipse:{
                              semiMinorAxis :new Cesium.CallbackProperty(changeR11,false),
                              semiMajorAxis :new Cesium.CallbackProperty(changeR12,false),
                              height:10,
                              material:new Cesium.ImageMaterialProperty({
                                    image:data.imageUrl,
                                    repeat:Cesium.Cartesian2(1.0, 1.0),
                                    transparent:true,
                                    color:new Cesium.CallbackProperty(function () {
                                          var alp=1-r1/data.maxR;
                                          // return  Cesium.Color.WHITE.withAlpha(alp)
                                          return  Cesium.Color[data.json.COLOR].withAlpha(0.3)
                                          //entity的颜色透明 并不影响材质，并且 entity也会透明
                                    },false)
                              })
                              }
                        });
                  },data.eachInterval)
                  this.viewer.entities.add({
                              name: `name: ${data.json.name}`,
                              description: `${data.json.name}-(${data.json.identify}) 相关信息`,
                              position:Cesium.Cartesian3.fromDegrees(data.json.coordinates[0],data.json.coordinates[1],0),
                              show:true,
                              ellipse:{
                                    semiMinorAxis :(data.json.value)*5,
                                    semiMajorAxis :(data.json.value)*5,
                                    height:10,
                                    // material:new Cesium.Color(1,0,0,1)
                                    material: Cesium.Color[data.json.COLOR].withAlpha(0.8)
                              }
                        });
                  },
// ******************添加水波纹 ending **************************
            backTo(p){ if(p === -1) this.$router.go(-1) }
      },
}
</script>
<style scoped>
      .dv {text-align: left;}
      .dv button  { position: absolute; left: 0; top: 0; z-index: 100; background-color: transparent;}
      #cesiumContainer { width: 100%; height: 100%; }
</style>