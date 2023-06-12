<template>
  <button
    class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center"
    :class="{ 'opacity-40 cursor-not-allowed': disabled }"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <div v-if="loading" class="animate-spin loader mr-2" />
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'click'): void }>()
const props = defineProps({
  disabled: {
    default: false,
    type: Boolean
  },
  label: {
    required: true,
    type: String
  },
  loading: {
    default: false,
    type: Boolean
  }
})
const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style>
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}

.loader {
  font-size: 2px;
  border-top: 1.5em solid rgba(255, 255, 255, 0.2);
  border-right: 1.5em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.5em solid rgba(255, 255, 255, 0.2);
  border-left: 1.5em solid #ffffff;
}
</style>
