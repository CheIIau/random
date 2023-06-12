<template>
  <div>
    <TheHeader />
    <div class="p-4 mt-8">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '../components/Common/TheHeader.vue'
defineSlots<{
  default(props: {}): any
}>()
defineOptions({
  inheritAttrs: false
})
</script>
