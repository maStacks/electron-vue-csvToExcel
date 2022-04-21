<template>
  <div class="app-container">
    
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>excel 调整列</span>
        </div>
        <div style="margin-bottom:0px;">
          <el-row :gutter="20">
            <el-col :span="12" class="text-center clearfix">
              <el-button type="primary">选择文件</el-button>
              <input type="file" class="input-file" accept=".xlsx,.xlsx,.csv" @change="fileChange" multiple="multiple" >
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
import { sortExcel } from '@/utils/index'
export default {
  data() {
    return {
      loading:false,
      textarea1:'请选择文件...',
      textarea2:'',
      files:[],//用户已选择的文件
      rules:[[ 1, 10 ], [2, 1 ], [ 3, 2 ], [ 10, 3 ], [ 11, 10 ] ],//置换方法调整列
      
    }
  },
  methods: {
    fileChange(e) {
      this.textarea1='';
      this.textarea2='';
      this.filesFilter=[];
      this.files=e.target.files;
      for (let i = 0; i < this.files.length; i++) {
        let paths = this.files[i].path;
        this.textarea1+=`<span style="color:#000"> ${i+1}、 </span>${paths}<br/>`;
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
            let paths=this.files[index].path;
            let sheetList = xlsx.parse(paths);
            let sheetData=sheetList[0].data;
            let newPath=paths.replace('.csv','.xlsx');
            
            let newData=sortExcel(sheetData,this.rules);
            sheetList[0].data=newData;
            log(88,sheetList);
            fs.writeFileSync(newPath,xlsx.build(sheetList),"binary");
            this.textarea2+=`<span > ${newPath} </span><br/>`;

          } catch (error) {
            this.textarea2+=`<span style="color:#000"> ${index+1}、 </span><span style="color:red"> ${error}</span><br/>`;
          };
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
      this.textarea2+=`<span style="color:#000"> done </span><br/>`;
    },
    clear(){
      this.loading=false;
      this.textarea1='请选择文件...';
      this.textarea2='';
      this.files=[];
      this.filesSort=[];
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

