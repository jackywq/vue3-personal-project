<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="box-card">
          <div class="card-title">总员工数</div>
          <div class="card-value">1,245</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="box-card">
          <div class="card-title">本月入职</div>
          <div class="card-value">32</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="box-card">
          <div class="card-title">今日缺勤</div>
          <div class="card-value">5</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="box-card">
          <div class="card-title">待办事项</div>
          <div class="card-value">12</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt-20">
      <el-col :span="24">
        <el-card>
          <template #header>欢迎使用人事管理系统</template>
          <p>基于 Vue3 + Element Plus + Pinia 的现代化人事管理平台。</p>
          <p>模块包括：员工管理、部门管理、考勤管理等核心功能。</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
</script>

<style scoped>
.box-card {
  text-align: center;
  padding: 20px 0;
}
.card-title {
  color: #909399;
  font-size: 14px;
  margin-bottom: 10px;
}
.card-value {
  color: #303133;
  font-size: 28px;
  font-weight: bold;
}
.mt-20 {
  margin-top: 20px;
}
</style>
