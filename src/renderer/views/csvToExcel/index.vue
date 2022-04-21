<template>
  <div class="app-container">
    
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>csv文件转excel文件</span>
        </div>
        <div style="margin-bottom:0px;">
          <el-row :gutter="20">
            <el-col :span="12" class="text-center clearfix">
              <el-button type="primary">选择文件</el-button>
              <input type="file" class="input-file" accept=".csv" @change="fileChange" multiple="multiple" >
            </el-col>
            <el-col :span="12" class="text-center clearfix">
              <el-button type="success" :loading="loading" @click="start">开始转换</el-button>
              <el-button class="fr" @click="clear">清空</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="m-t20">
            <el-col :span="12" class="text-center">
                <div class="textarea">
                  <el-scrollbar style="height:62vh;" ref="myScrollbar1">
                    <div style="padding: 0px 10px;" v-html="textarea1"></div>
                  </el-scrollbar>
                </div>
            </el-col>
            <el-col :span="12" class="text-center">
                <div class="textarea">
                  <el-scrollbar style="height:62vh;" ref="myScrollbar2">
                    <div style="padding: 0px 10px;" v-html="textarea2"></div>
                  </el-scrollbar>
                </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
  </div>
</template>

<script>
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');
export default {
  data() {
    return {
      loading:false,
      textarea1:'请选择文件...',
      textarea2:'',
      files:[],
    }
  },
  methods: {
    fileChange(e) {
      this.textarea1='';
      this.files=e.target.files;
      for (let i = 0; i < this.files.length; i++) {
        let path = this.files[i].path;
        this.textarea1+=`<span style="color:#000"> ${i+1}、 </span>${path}<br/>`;
      };
      this.$nextTick(()=>{
        this.scrollDown();
      });
    },
    start(){
      if(this.files.length==0){
        this.$notify({
          title: '警告',
          message: '请选择文件后转换！',
          type: 'warning'
        });
        return;
      };
      this.loading=true;
      this.textarea2='';
      let index=0;
      let foo=()=>{
        if(index<=this.files.length-1){
          try {
            let path=this.files[index].path;
            let sheetList = xlsx.parse(path);
            let newPath=path.replace('.csv','.xlsx');
            fs.writeFileSync(newPath,xlsx.build(sheetList),"binary");
            this.textarea2+=`<span style="color:#000"> ${index+1}、 </span>${newPath}<br/>`;
          } catch (error) {
            this.textarea2+=`<span style="color:#000"> ${index+1}、 </span><span style="color:red"> ${error}</span><br/>`;
          }
          
          console.log(index);
          index++;
          foo();
          this.$nextTick(()=>{
            this.scrollDown();
          });
        }else{
          this.loading=false;
        };
      };
      foo();
    },
    clear(){
      this.loading=false;
      this.textarea1='请选择文件...';
      this.textarea2='';
      this.files=[];
    },
    scrollDown() {
      this.$refs['myScrollbar1'].wrap.scrollTop = this.$refs['myScrollbar1'].wrap.scrollHeight;
      this.$refs['myScrollbar2'].wrap.scrollTop = this.$refs['myScrollbar2'].wrap.scrollHeight;
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.text-center{
  position: relative;
}
.input-file{
  position: absolute;
  left: 10px;
  height: 48px;
  font-size: 30px;
  width: 100px;
  overflow: hidden;
  opacity: 0;
}
.textarea{
  height: 60vh;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  line-height: 2;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  font-size: 14px;
  color: #606266;
  font-family: sans-serif;
  word-break: break-all;
  white-space: pre-line;
}
</style>

