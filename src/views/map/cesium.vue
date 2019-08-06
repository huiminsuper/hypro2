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
                            }
                    },
                   mounted(){
                        var Cesium = this.Cesium;
                        var cesiumContainer = document.getElementById("cesiumContainer");
                        var viewer = new Cesium.Viewer("cesiumContainer",{
                              //加载在线谷歌地图
                              imageryProvider: new Cesium.UrlTemplateImageryProvider({
                                    url:"http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}"
                              })
                      })
                  }
      }
</script>
<style scoped="">

      /* Add "scoped" attribute to limit CSS to this component only */
      .container {
            width: 100%;
            height: 100%;
      }
      #cesiumContainer {
            width: 100%;
            height: 100%;
      }

</style>
