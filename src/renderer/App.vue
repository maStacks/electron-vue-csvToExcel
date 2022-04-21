<template>
  <div id="app">
    <el-scrollbar style="height:100vh;" class="scrollbar">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
  .scrollbar>.el-scrollbar__wrap{
    height: calc(100% + 17px);
  }
</style>
