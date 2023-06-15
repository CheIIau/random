<template>
  <div
    class="w-full h-screen bg-zinc-950 custom-layout-wrapper"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineSlots<{
  default(props: {}): any
}>()
</script>
