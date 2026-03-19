<template>
  <el-form
    ref="formRef"
    :model="modelValue"
    :rules="rules"
    :label-width="labelWidth"
    class="base-form"
  >
    <el-form-item
      v-for="item in config"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="modelValue[item.prop]"
        :placeholder="item.placeholder || '请输入'"
        :type="item.inputType || 'text'"
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
      <el-date-picker
        v-else-if="item.type === 'date'"
        v-model="modelValue[item.prop]"
        type="date"
        :placeholder="item.placeholder || '请选择日期'"
        value-format="YYYY-MM-DD"
        clearable
      />
      <!-- 其他表单类型在此扩展 -->
      <slot v-else-if="item.type === 'slot'" :name="item.prop"></slot>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: { type: Object, required: true },
  config: { type: Array, required: true },
  rules: { type: Object, default: () => ({}) },
  labelWidth: { type: String, default: '100px' }
});

const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);

const formRef = ref(null);

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', props.modelValue);
    }
  });
};

const handleCancel = () => {
  emit('cancel');
};
</script>
