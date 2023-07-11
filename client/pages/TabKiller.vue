<template>
  <div class="flex flex-col">
    <div class="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-pink-500 via-orange-500 to-rose-500 p-1 shadow-xl">
      <div class="block rounded-xl bg-white p-4 sm:p-6 lg:p-8">
        <h3 class="text-lg font-bold text-slate-700 sm:text-xl">
          Kill current tab
        </h3>
        <p class="mt-2 text-base text-gray-700">
          Pressing the button below will start an endless loop and kill the tab
        </p>
        <ButtonComponent
          class="mt-3 bg-red-500 hover:bg-red-700"
          label="Kill the tab"
          @click="killTab"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import ButtonComponent from '~/components/Common/UI/ButtonComponent.vue'
definePageMeta({
  title: 'Tab Killer'
})
const killTab = () => {
  while (true) {
    let i = 1
    i++
  }
}
</script>
