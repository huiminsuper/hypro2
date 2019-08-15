<template>
      <div class="container">
            <div id="cesiumContainer"></div>
      </div>
</template>
<script>
      
      export default {
            name: 'cesiumPage',
                    data () {
                            return {
                              stationData: [
                                    { name: '牡丹江', label: 'MDJ', lon: 0.0, lat: 0.0,bgColor: 'PURPLE' },
                                    { name: '陵水', label: 'LS', lon: 20.0, lat: 20.0, bgColor: 'BLUE' }
                              ]
                            }
                    },
                   mounted(){
                       this.initView();
                       //this.initView2();
                  },
                  methods: {
                        initView2(){
                              var viewer = new Cesium.Viewer('cesiumContainer', {
                                    //2.æœ¬åœ°å›¾ç‰‡
                                    // imageryProvider: new Cesium.SingleTileImageryProvider({
                                    // url: '../img/worldimage.jpg'
                                    // }),
                                    baseLayerPicker: false,
                              });

                              var czml = [{
                                    "id": "document",
                                    "name": "polygon",
                                    "version": "1.0",
                                    "clock": {
                                          "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                                          "currentTime": "2012-08-04T16:00:00Z",
                                          "multiplier": 10
                                    }
                              }, {
                                    "id": "shape2",
                                    "name": "Red box with black outline",
                                    "availability": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                                    /*"position" : {
                                          "cartographicDegrees" : [-66.62557, 516.92809, 100.0]
                                    },*/
                                    "box": {
                                    "dimensions": {
                                          "cartesian": [30.0, 30.0]
                                    },
                                    "material": {
                                          "stripe": {
                                                "orientation": "VERTICAL",
                                                "evenColor": {
                                                "rgba": [10, 211, 250, 0]
                                                },
                                                "oddColor": {
                                                "rgba": [10, 211, 250, 255]
                                                },
                                                "offset": {
                                                "number": 1
                                                },
                                                "repeat": 0.5
                                          }
                                    },
                                    },
                                    "path": {
                                    "material": {
                                          "solidColor": {
                                                "color": {
                                                "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                                                "rgba": [255, 0, 0, 128]
                                                }
                                          }
                                    },
                                    "width": [{
                                          "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                                          "number": 3.0
                                    }],
                                    "show": [{
                                          "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                                          "boolean": true
                                    }]
                                    },
                                    "position": {
                                          "interpolationAlgorithm": "LAGRANGE",
                                          "interpolationDegree": 1,
                                          "epoch": "2012-08-04T16:00:00Z",
                                          "cartographicDegrees": [
                                                0.0, 118.87841653400005, 30.95679870500004, 0.0,
                                                10.0, 118.87826541800007, 30.95680770900003, 0.0,
                                                20.0, 118.8774481050001, 30.956860625000047, 0.0,
                                                30.0, 118.87660414600009, 30.956910105000077, 0.0,
                                                40.0, 118.8759846580001, 30.95694296000005, 0.0,
                                                50.0, 118.87542502500003, 30.956978761000073, 0.0,
                                                60.0, 118.87473380100005, 30.957024103000037, 0.0

                                          ]
                                    }
                              }];

                              var dataSourcePromise;
                              var i = 30.957024;
                              var a = 60;
                              setInterval(function() {
                                    i += 0.0001;
                                    a += 10;
                                    czml[1].position.cartographicDegrees.push(a, 118.8747338, i, 0);
                                    czml[0].clock.currentTime = viewer.clock.currentTime.toString();
                                    viewer.entities.removeAll();
                                    viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
                              }, 1000);

                              dataSourcePromise = Cesium.CzmlDataSource.load(czml);
                              viewer.dataSources.add(dataSourcePromise);
                              viewer.zoomTo(dataSourcePromise);
                        },
                        initView(){
                              var Cesium = this.Cesium;
                              var cesiumContainer = document.getElementById("cesiumContainer");
                              var viewer = new Cesium.Viewer("cesiumContainer",{
                                    creditContainer:"cesiumContainer", // 存放图的div
                                    navigationHelpButton: false,
                                    requestRenderMode: true, //启用请求渲染模式
                                    scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存 
                                    terrainProvider : Cesium.createWorldTerrain(),
                                    baseLayerPicker : false,
                                    shouldAnimate : true
                                   
                                    //加载在线谷歌地图
                        //             imageryProvider: new Cesium.UrlTemplateImageryProvider({
                        //                   //url:"http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
                        //                   url: "../static/world.bmp"
                        //             })
                              });// viewer ending
                              //viewer.scene.debugShowFramesPerSecond = true; // 显示侦速
                              
                             viewer.scene.globe.enableLighting = true;

                              
                              let promise = viewer.dataSources.add(Cesium.CzmlDataSource.load('../static/xl.czml'));
                              
                              promise.then(dataSource => {
                                   let entities =  dataSource.entities.values;
                                    console.log(entities[1])
                                    var i = 30.957024;
                                    var a = 60;
                                    setInterval(function() {
                                          i += 0.0001;
                                          a += 10;
                                          //entities[1].position.cartesian.push(a, 118.8747338, i, 0);
                                          entities[0].clock.currentTime = viewer.clock.currentTime.toString();
                                          viewer.entities.removeAll();
                                          viewer.dataSources.add(Cesium.CzmlDataSource.load('../static/xl.czml'));
                                    }, 10000);

                              });
                             
                               viewer.zoomTo(promise);
                              
                              // ======================

                        

                              //=======================

                              viewer.entities.add({ // 添加一个点
                                    position : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
                                    point : {
                                    pixelSize : 10,
                                    color : Cesium.Color.RED
                                    }
                              });
                              this.stationData.map((item => {
                                    viewer.entities.add({
                                          position:Cesium.Cartesian3.fromDegrees(item.lon, item.lat),
                                          name:'Red ellipse on surface with outline',
                                          ellipse:{
                                                semiMinorAxis:2000000.0,
                                                semiMajorAxis:2000000.0,
                                                material: Cesium.Color[item.bgColor].withAlpha(0.5)
                                          },
                                          billboard: {
                                                image: '../../static/images/satellite-1.png',
                                                width: 20,
                                                height: 20
                                          },
                                          label: {
                                                text: item.name,
                                                font: '12pt monospace',
                                                pixelOffset: new Cesium.Cartesian2(40,0)
                                          }
                                    });
                              }))
                              
                              this.viewer = viewer;
                        },
                  }
      }
</script>
<style>

      /* Add "scoped" attribute to limit CSS to this component only */
      .container {
            width: 100%;
            height: 100%;
      }
      #cesiumContainer {
            width: 100%;
            height: 100%;
      }
      .cesium-widget-credits {
            display: none!important;
      }
</style>
