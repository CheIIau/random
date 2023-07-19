<template>
  <input
    v-model="modelValue"
    class="rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-500 hover:ring-teal-300 sm:text-sm sm:leading-6"
    :class="{ 'bg-slate-200 opacity-40 cursor-not-allowed': disabled }"
    :disabled="disabled"
    @focus="$emit('focus')"
    @blur="$emit('blur')"
  >
</template>

<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps({
  disabled: {
    default: false,
    type: Boolean
  },
  number: {
    default: true,
    type: Boolean
  }
})
const emit = defineEmits<{ (e: 'blur'): void, (e: 'focus'): void }>()
const modelValue = defineModel<number | string>()
watch(modelValue, () => {
  if (props.number) {
    modelValue.value = +modelValue.value!.toString().replaceAll(/\D/g, '')
  }
})
</script>
