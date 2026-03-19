<template>
  <div class="employee-container">
    <BaseSearch v-model="searchForm" :config="searchConfig" @search="handleSearch" @reset="handleReset" />
    
    <div class="action-bar" style="margin-bottom: 20px;">
      <el-button type="primary" icon="Plus" @click="handleAdd">新增员工</el-button>
    </div>

    <BaseTable
      :data="tableData"
      :columns="columns"
      :total="total"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.limit"
      @pagination="fetchData"
    >
      <template #status="{ row }">
        <el-tag :type="row.status === 1 ? 'success' : 'info'">{{ row.status === 1 ? '在职' : '离职' }}</el-tag>
      </template>
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

// 搜索配置
const searchForm = reactive({ name: '', deptId: '' });
const searchConfig = [
  { label: '姓名', prop: 'name', type: 'input', placeholder: '请输入员工姓名' },
  { label: '部门', prop: 'deptId', type: 'select', options: [
    { label: '技术部', value: '1' },
    { label: '人事部', value: '2' }
  ]}
];

// 表格配置
const tableData = ref([
  { id: 1, name: '张三', deptName: '技术部', phone: '13800138000', status: 1, entryDate: '2023-01-10' },
  { id: 2, name: '李四', deptName: '人事部', phone: '13900139000', status: 1, entryDate: '2023-02-15' },
]);
const total = ref(2);
const queryParams = reactive({ page: 1, limit: 10 });

const columns = [
  { label: 'ID', prop: 'id', width: '80' },
  { label: '姓名', prop: 'name' },
  { label: '部门', prop: 'deptName' },
  { label: '手机号', prop: 'phone' },
  { label: '入职日期', prop: 'entryDate' },
  { label: '状态', prop: 'status', slot: 'status' },
  { label: '操作', prop: 'action', slot: 'action', width: '150' }
];

const fetchData = () => {
  // 模拟请求
  console.log('Fetching data with:', queryParams, searchForm);
};

const handleSearch = () => {
  queryParams.page = 1;
  fetchData();
};

const handleReset = () => {
  searchForm.name = '';
  searchForm.deptId = '';
  handleSearch();
};

const handleAdd = () => {
  ElMessage.success('点击了新增员工');
};

const handleEdit = (row) => {
  ElMessage.success(`点击了编辑员工: ${row.name}`);
};

const handleDelete = (row) => {
  ElMessageBox.confirm(`确定要删除员工 ${row.name} 吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功');
  }).catch(() => {});
};
</script>
