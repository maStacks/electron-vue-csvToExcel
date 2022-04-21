<template>
  <div class="dashboard-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>功能区</span>
        </div>
        <div style="margin-bottom:50px;">
          <!-- <el-col :span="4" class="text-center">
            <router-link class="pan-btn blue-btn" to="/csvToExcel/index">
              CsvToExcel
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn light-blue-btn" to="/excelEdit/index">
              excel 调整列
            </router-link>
          </el-col> -->
          <el-col :span="6" class="text-center">
            <router-link class="pan-btn pink-btn" to="/csvToExcel/index">
              CsvToExcel
            </router-link>
          </el-col>
          <el-col :span="6" class="text-center">
            <router-link class="pan-btn green-btn" to="/excelEdit/index">
              Excel 调整列
            </router-link>
          </el-col>
          <!-- <el-col :span="4" class="text-center">
            <router-link class="pan-btn tiffany-btn" to="/example/create">
              Form
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn yellow-btn" to="/theme/index">
              Theme
            </router-link>
          </el-col> -->
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
