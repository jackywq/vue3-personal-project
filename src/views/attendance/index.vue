<template>
  <div class="attendance-container">
    <BaseSearch
      v-model="searchForm"
      :config="searchConfig"
      @search="handleSearch"
      @reset="handleReset"
    />

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

<!-- 标准写法：vue3 setup 写法 -->
<script setup>
import {
  ref,
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated
} from 'vue';
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

// --- Vue3 生命周期钩子 ---
onBeforeMount(() => {
  console.log('--- onBeforeMount: 组件挂载前 ---');
});

onMounted(() => {
  console.log('--- onMounted: 组件挂载完成 ---');
});

onBeforeUpdate(() => {
  console.log('--- onBeforeUpdate: 组件更新前 ---');
});

onUpdated(() => {
  console.log('--- onUpdated: 组件更新完成 ---');
});

onBeforeUnmount(() => {
  console.log('--- onBeforeUnmount: 组件卸载前 ---');
});

onUnmounted(() => {
  console.log('--- onUnmounted: 组件卸载完成 ---');
});

onErrorCaptured((err, instance, info) => {
  console.log('--- onErrorCaptured: 捕获到子组件错误 ---', err, info);
});

onRenderTracked((e) => {
  console.log('--- onRenderTracked: 渲染依赖被追踪 ---', e);
});

onRenderTriggered((e) => {
  console.log('--- onRenderTriggered: 渲染依赖被触发 ---', e);
});

onActivated(() => {
  console.log('--- onActivated: keep-alive 组件激活 ---');
});

onDeactivated(() => {
  console.log('--- onDeactivated: keep-alive 组件停用 ---');
});
</script>

<!-- vue3 没有setup 写法 -->
<!-- <script>
import { ref, reactive } from 'vue';
import BaseTable from '@/components/BaseTable/index.vue';
import BaseSearch from '@/components/BaseSearch/index.vue';

export default {
  components: { BaseTable, BaseSearch },
  setup() {
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

    return {
      searchForm,
      searchConfig,
      tableData,
      total,
      queryParams,
      columns,
      getStatusType,
      fetchData,
      handleSearch,
      handleReset
    };
  }
}

</script> -->


<!-- vue2 option api 写法 -->
<!-- <script>
// 导入需要的组件
import BaseTable from '@/components/BaseTable/index.vue';
import BaseSearch from '@/components/BaseSearch/index.vue';

export default {
  // 注册组件（必须写）
  components: {
    BaseTable,
    BaseSearch
  },

  // 响应式数据（全部放这里）
  data() {
    return {
      searchForm: { empName: '', date: '' },
      searchConfig: [
        { label: '员工姓名', prop: 'empName', type: 'input', placeholder: '请输入员工姓名' },
        { label: '考勤日期', prop: 'date', type: 'date', placeholder: '选择日期' }
      ],
      tableData: [
        { id: 1, empName: '张三', date: '2023-10-01', checkIn: '08:50', checkOut: '18:10', status: 1, statusText: '正常' },
        { id: 2, empName: '李四', date: '2023-10-01', checkIn: '09:10', checkOut: '18:05', status: 2, statusText: '迟到' },
      ],
      total: 2,
      queryParams: { page: 1, limit: 10 },
      columns: [
        { label: '记录ID', prop: 'id', width: '80' },
        { label: '员工姓名', prop: 'empName' },
        { label: '考勤日期', prop: 'date' },
        { label: '上班打卡', prop: 'checkIn' },
        { label: '下班打卡', prop: 'checkOut' },
        { label: '状态', prop: 'status', slot: 'status' }
      ]
    };
  },

  // 方法（全部放这里）
  methods: {
    // 状态样式映射
    getStatusType(status) {
      const map = { 1: 'success', 2: 'warning', 3: 'danger' };
      return map[status] || 'info';
    },

    // 获取数据
    fetchData() {
      console.log('Fetching data with:', this.queryParams, this.searchForm);
    },

    // 搜索
    handleSearch() {
      this.queryParams.page = 1;
      this.fetchData();
    },

    // 重置
    handleReset() {
      this.searchForm.empName = '';
      this.searchForm.date = '';
      this.handleSearch();
    },

    // 分页切换（补充，和原代码逻辑一致）
    handlePageChange(page) {
      this.queryParams.page = page;
      this.fetchData();
    }
  }
};
</script> -->