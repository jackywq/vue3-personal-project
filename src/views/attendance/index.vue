<template>
  <div class="attendance-container">
    <BaseSearch v-model="searchForm" :config="searchConfig" @search="handleSearch" @reset="handleReset" />

    <BaseTable
      :data="tableData"
      :columns="columns"
      :total="total"
      v-model:page="queryParams.page"
      v-model:limit="queryParams.limit"
      @pagination="fetchData"
    >
      <template #status="{ row }">
        <el-tag :type="getStatusType(row.status)">{{ row.statusText }}</el-tag>
      </template>
    </BaseTable>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import BaseTable from '@/components/BaseTable/index.vue';
import BaseSearch from '@/components/BaseSearch/index.vue';

const searchForm = reactive({ empName: '', date: '' });
const searchConfig = [
  { label: '员工姓名', prop: 'empName', type: 'input', placeholder: '请输入员工姓名' },
  { label: '考勤日期', prop: 'date', type: 'date', placeholder: '选择日期' }
];

const tableData = ref([
  { id: 1, empName: '张三', date: '2023-10-01', checkIn: '08:50', checkOut: '18:10', status: 1, statusText: '正常' },
  { id: 2, empName: '李四', date: '2023-10-01', checkIn: '09:10', checkOut: '18:05', status: 2, statusText: '迟到' },
]);
const total = ref(2);
const queryParams = reactive({ page: 1, limit: 10 });

const columns = [
  { label: '记录ID', prop: 'id', width: '80' },
  { label: '员工姓名', prop: 'empName' },
  { label: '考勤日期', prop: 'date' },
  { label: '上班打卡', prop: 'checkIn' },
  { label: '下班打卡', prop: 'checkOut' },
  { label: '状态', prop: 'status', slot: 'status' }
];

const getStatusType = (status) => {
  const map = { 1: 'success', 2: 'warning', 3: 'danger' };
  return map[status] || 'info';
};

const fetchData = () => {
  console.log('Fetching data with:', queryParams, searchForm);
};

const handleSearch = () => {
  queryParams.page = 1;
  fetchData();
};

const handleReset = () => {
  searchForm.empName = '';
  searchForm.date = '';
  handleSearch();
};
</script>
