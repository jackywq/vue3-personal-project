<template>
  <div class="base-table">
    <el-table :data="data" v-bind="$attrs" style="width: 100%" stripe border>
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :align="col.align || 'center'"
      >
        <template #default="scope" v-if="col.slot">
          <slot :name="col.slot" :row="scope.row" :index="scope.$index"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container" v-if="showPagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  total: { type: Number, default: 0 },
  showPagination: { type: Boolean, default: true },
  page: { type: Number, default: 1 },
  limit: { type: Number, default: 10 }
});

const emit = defineEmits(['update:page', 'update:limit', 'pagination']);

const currentPage = ref(props.page);
const pageSize = ref(props.limit);

watch(() => props.page, (val) => { currentPage.value = val; });
watch(() => props.limit, (val) => { pageSize.value = val; });

const handleSizeChange = (val) => {
  emit('update:limit', val);
  emit('pagination', { page: currentPage.value, limit: val });
};

const handleCurrentChange = (val) => {
  emit('update:page', val);
  emit('pagination', { page: val, limit: pageSize.value });
};
</script>

<style scoped>
.base-table {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
