<template>
  <div class="base-search">
    <el-form :inline="true" :model="modelValue" class="search-form">
      <el-form-item
        v-for="item in config"
        :key="item.prop"
        :label="item.label"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="modelValue[item.prop]"
          :placeholder="item.placeholder || '请输入'"
          clearable
        />
        <el-select
          v-else-if="item.type === 'select'"
          v-model="modelValue[item.prop]"
          :placeholder="item.placeholder || '请选择'"
          clearable
        >
          <el-option
            v-for="opt in item.options"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
        <!-- 其他表单类型可在此扩展 -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" icon="Search">查询</el-button>
        <el-button @click="handleReset" icon="Refresh">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
  config: { type: Array, required: true } // [{ label, prop, type, options, placeholder }]
});

const emit = defineEmits(['update:modelValue', 'search', 'reset']);

const handleSearch = () => {
  emit('search', props.modelValue);
};

const handleReset = () => {
  const resetData = {};
  props.config.forEach(item => {
    resetData[item.prop] = '';
  });
  emit('update:modelValue', resetData);
  emit('reset', resetData);
};
</script>

<style scoped>
.base-search {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.search-form {
  display: flex;
  flex-wrap: wrap;
}
</style>
