<template>
      <div>
            <el-button size="mini" @click="backTo(-1)">back</el-button>
            <!-- 非组件实现读取文件 -->
            <input type="file" id="file" @change="importf()" />
            <el-form v-model="argForm">
                  <el-form-item>
                        <el-input type="textarea"  v-model="argForm.xml" :autosize="{ minRows: 2, maxRows: 6 }" />
                  </el-form-item>
            </el-form>
            <!-- 组件实现读取文件 -->
            <loadComponent @load="handleLoad"></loadComponent>

            <!-- 下载文件 -->
            <ul>
                  <!-- <li ref="item" v-for="(item, index) in list" :key="index">{{item.name}}</li> -->
                  <template  v-for="(item, index) in list">
                        <div :key="index">
                              <form ref="aa" :action="item.URL" :method="method" style="display:none"></form>
                              <button @click="handleSubmit(index, item)">下载{{index}}</button>
                        </div>
                  </template>
                  
            </ul>
            
            
             <a href="https://codeload.github.com/douban/douban-client/legacy.zip/master" download = "记事本">点击下载</a>
      </div>
</template>
<script>
import loadComponent from '../../components/FileReader.vue'

export default {
      name: 'uplaodData',
      components: { loadComponent },
      data(){
            return{
                  argForm: {
                        xml:null
                  },
                  
                  method: 'get',
                  list: [
                        {name: '111', age: 20,URL: 'https://codeload.github.com/douban/douban-client/legacy.zip/master'},
                        {name: '222', age: 20,URL: ''},
                        {name: '333', age: 20,URL: ''},
                  ]
            }
      },
      mounted(){
            
      },
      methods: {
            handleSubmit(index, item) {
                  // 每次dom更新提交一次，批量提交
                  
                  
                  this.$nextTick(_=>{
                        console.log('aa',this.$refs);
                        this.$refs.aa[index].submit();
                  })
            },
            handleLoad(text){
                  console.log('111');
                  this.argForm.xml = text
            },
            importf() {
                  let reader = new FileReader();
                  let file = document.getElementById('file').files[0];
                  // console.log('000',reader)
                  // console.log('11111',file);

                  reader.onload = e => this.argForm.xml = reader.result;

                  reader.readAsText(file);
                  
            },
            backTo(p){
                  if(p === -1){
                        this.$router.go(-1);
                  } 
            }
      }
}
</script>
<style scoped>

</style>
