<template>
  <div class="flex flex-col gap-8">
    <ComputerGuessNumber />
    <UserGuessNumber />
  </div>
</template>

<script setup lang="ts">
import ComputerGuessNumber from '~/components/GuessNumber/ImpresiseGuessNumber.vue'
import UserGuessNumber from '~/components/GuessNumber/PreciseGuessNumber.vue'
</script>

<style>
.loading-bar {
  animation: loading 3s ease-in-out;
}

@keyframes loading {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}
</style>
