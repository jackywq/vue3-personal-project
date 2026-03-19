<template>
  <div class="dept-container">
    <BaseSearch v-model="searchForm" :config="searchConfig" @search="handleSearch" @reset="handleReset" />
    
    <div class="action-bar" style="margin-bottom: 20px;">
      <el-button type="primary" icon="Plus" @click="handleAdd">新增部门</el-button>
    </div>

    <BaseTable
      :data="tableData"
      :columns="columns"
      :total="total"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.limit"
      @pagination="fetchData"
    >
      <template #action="{ row }">
        <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import BaseTable from '@/components/BaseTable/index.vue';
import BaseSearch from '@/components/BaseSearch/index.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const searchForm = reactive({ name: '' });
const searchConfig = [
  { label: '部门名称', prop: 'name', type: 'input', placeholder: '请输入部门名称' }
];

const tableData = ref([
  { id: 1, name: '技术部', code: 'DEV', count: 50, manager: '张三' },
  { id: 2, name: '人事部', code: 'HR', count: 10, manager: '李四' },
]);
const total = ref(2);
const queryParams = reactive({ page: 1, limit: 10 });

const columns = [
  { label: 'ID', prop: 'id', width: '80' },
  { label: '部门名称', prop: 'name' },
  { label: '部门编码', prop: 'code' },
  { label: '人数', prop: 'count' },
  { label: '负责人', prop: 'manager' },
  { label: '操作', prop: 'action', slot: 'action', width: '150' }
];

const fetchData = () => {
  console.log('Fetching data with:', queryParams, searchForm);
};

const handleSearch = () => {
  queryParams.page = 1;
  fetchData();
};

const handleReset = () => {
  searchForm.name = '';
  handleSearch();
};

const handleAdd = () => {
  ElMessage.success('点击了新增部门');
};

const handleEdit = (row) => {
  ElMessage.success(`点击了编辑部门: ${row.name}`);
};

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除部门 ${row.name} 吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功');
  }).catch(() => {});
};
</script>
