<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r to-emerald-500 via-cyan-500 from-sky-500 p-1 shadow-xl">
    <div class="block rounded-xl bg-white p-4 sm:p-6 lg:p-8">
      <div class="mt-2">
        <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
          ...Or i could guess a number you think of <br>
          with 100% accuracy
        </h3>
        <p
          v-if="!numbers.firstAddStepAmount"
          class="mt-2 text-base text-gray-700"
        >
          Wanna try it out?
        </p>
        <div
          v-if="!numbers.firstAddStepAmount"
          class="mt-4"
        >
          <ButtonComponent
            label="Sure, why not"
            @click="showSteps"
          />
        </div>
        <div
          v-if="numbers.firstAddStepAmount && result === undefined"
          class="mt-4"
        >
          <ol class="list-decimal list-inside">
            <li>Guess any number</li>
            <li>Add {{ numbers.firstAddStepAmount }} to it</li>
            <li>Multiply by {{ numbers.multiplier }}</li>
            <li>Add {{ numbers.secondAddStepAmount }}</li>
            <li>Subtract {{ numbers.thirdSubtactStepAmount }}</li>
            <li>Add {{ numbers.fourthAddStepAmount }}</li>
            <li>Divide by {{ numbers.multiplier }}</li>
            <li>Subtract the number you guessed at the first step</li>
            <li>Add {{ numbers.lastAddStepAmount }}</li>
            <li>Think only of the <b>resulting</b> number</li>
          </ol>
          <ButtonComponent
            class="mt-4"
            :label="loading ? 'Trying to guess...' : 'Try to guess'"
            :loading="loading"
            @click="guessNumber"
          />
        </div>

        <div
          v-if="loading"
          class="mt-5"
        >
          <p class="animate-pulse mb-2 text-gray-700">
            Tune in to your brain waves...
          </p>
          <div class=" w-full bg-slate-400 h-2 rounded-full">
            <div class="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 loading-bar rounded-full" />
          </div>
        </div>
        <div
          v-if="result !== undefined"
          class="mt-4"
        >
          <p class="text-2xl font-medium text-gray-700">
            Your number is {{ result }}
          </p>
          <ButtonComponent
            class="mt-4"
            label="Try again"
            @click="showSteps"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import ButtonComponent from '../Common/UI/ButtonComponent.vue'
const numbers = ref({
  firstAddStepAmount: 0,
  fourthAddStepAmount: 0,
  lastAddStepAmount: 0,
  multiplier: 0,
  secondAddStepAmount: 0,
  thirdSubtactStepAmount: 0
})
const loading = ref(false)
const result = ref<number>()

const guessNumber = async () => {
  loading.value = true
  setTimeout(() => {
    result.value =
      (numbers.value.firstAddStepAmount * numbers.value.multiplier +
        numbers.value.secondAddStepAmount -
        numbers.value.thirdSubtactStepAmount +
        numbers.value.fourthAddStepAmount) /
      numbers.value.multiplier +
      numbers.value.lastAddStepAmount
    loading.value = false
  }, 3000)
  await nextTick()
  scrollToTheBottom()
}

const assignRandomNumbers = () => {
  numbers.value.firstAddStepAmount = Math.floor(Math.random() * 15) + 1
  numbers.value.secondAddStepAmount = Math.floor(Math.random() * 15) + 1
  numbers.value.thirdSubtactStepAmount = Math.floor(Math.random() * 15) + 1
  numbers.value.lastAddStepAmount = Math.floor(Math.random() * 15) + 1
  numbers.value.multiplier = Math.floor(Math.random() * 4) + 2

  const subResult =
    numbers.value.firstAddStepAmount * numbers.value.multiplier +
    numbers.value.secondAddStepAmount -
    numbers.value.thirdSubtactStepAmount
  const remainder = subResult % numbers.value.multiplier
  if (remainder === 0) {
    numbers.value.fourthAddStepAmount =
      numbers.value.multiplier * (Math.floor(Math.random() * 3) + 1)
  } else {
    numbers.value.fourthAddStepAmount =
      numbers.value.multiplier * (Math.floor(Math.random() * 3) + 1) - remainder
  }
}

const showSteps = async () => {
  result.value = undefined
  assignRandomNumbers()
  await nextTick()
  scrollToTheBottom()
}
const scrollToTheBottom = () => {
  if (document.body.scrollHeight > window.innerHeight) {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight })
  }
}
</script>
