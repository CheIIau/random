<template>
  <div class="pt-36 p-6">
    <div
      v-if="!runningTest"
      class="mx-auto max-w-lg rounded-2xl bg-gradient-to-r from-emerald-800 via-cyan-800 to-sky-800 p-1 shadow-xl"
    >
      <div class="block rounded-xl bg-zinc-900 p-4 sm:p-6 lg:p-8">
        <div class="mt-2">
          <h3 class="text-white text-lg font-bold">
            To check if you have epilepsy push to button below
          </h3>
          <p v-if="testDone" class="text-white mb-6 mt-2">
            If you're still there well done. Wanna try again?
          </p>
          <ButtonComponent
            label="Epilepsy Check"
            class="bg-emerald-800 hover:bg-emerald-950 mt-4"
            @click="epilepsyTest"
          />
        </div>
      </div>
    </div>
    <div class="absolute top-6 left-6">
      <ButtonComponent
        label="← Back"
        class="bg-emerald-800 hover:bg-emerald-950"
        @click="$nuxt.$router.back()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, onBeforeUnmount, onMounted, ref } from '#imports'
import ButtonComponent from '~/components/Common/UI/ButtonComponent.vue'

definePageMeta({
  layout: 'custom',
  layoutTransition: {
    name: 'slow-slide-in'
  }
})

const runningTest = ref(false)
const testDone = ref(false)

const changeColorInterval = 60
let redAndBlueColorChangeTimeout: NodeJS.Timeout
let zincColorChangeTimeout: NodeJS.Timeout
let intervalId: NodeJS.Timer
let layoutWrapper: HTMLDivElement | null

onMounted(() => {
  layoutWrapper = document.querySelector('.custom-layout-wrapper')
})
const epilepsyTest = () => {
  if (!layoutWrapper) { return }

  const addRedColorClass = () => {
    layoutWrapper?.classList.add('bg-red-600')
    layoutWrapper?.classList.remove('bg-blue-600')
  }
  const addBlueColorClass = () => {
    layoutWrapper?.classList.add('bg-blue-600')
    layoutWrapper?.classList.remove('bg-red-600')
  }
  runningTest.value = true
  layoutWrapper.classList.remove('bg-zinc-950')
  layoutWrapper.classList.add('bg-blue-600')
  intervalId = setInterval(() => {
    addRedColorClass()
    setTimeout(addBlueColorClass, changeColorInterval)
  }, changeColorInterval * 2)
  redAndBlueColorChangeTimeout = setTimeout(() => {
    clearInterval(intervalId)
    setTimeout(() => {
      addZincColorClass()
      runningTest.value = false
      testDone.value = true
    }, changeColorInterval)
  }, 5000)
}

onBeforeUnmount(() => {
  clearInterval(intervalId)
  clearTimeout(redAndBlueColorChangeTimeout)
  clearTimeout(zincColorChangeTimeout)
  addZincColorClass()
})

const addZincColorClass = () => {
  if (!layoutWrapper) { return }
  layoutWrapper.classList.add('bg-zinc-950', 'transition-colors', 'ease-in-out', 'duration-700')
  layoutWrapper.classList.remove('bg-red-600', 'bg-blue-600')
  zincColorChangeTimeout = setTimeout(() => {
    layoutWrapper?.classList.remove('transition-colors', 'ease-in-out', 'duration-700')
  }, 600)
}
</script>
