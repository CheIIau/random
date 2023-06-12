<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 p-1 shadow-xl">
    <div class="block rounded-xl bg-white p-4 sm:p-6 lg:p-8">
      <div class="mt-2">
        <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
          Guess a number
        </h3>
        <p class="mt-2 text-base text-gray-700">
          You'll think of a number from 1 to {{ endNumber }}, and I'll try to guess it
        </p>
        <div class="mt-2 text-base text-gray-700">
          Or you may want to change the end number
          <InputComponent
            v-model="endNumber"
            inputmode="numeric"
            min="2"
            step="1"
            :disabled="loading"
          />
        </div>
        <div
          v-if="!guessedNumber || answer"
          class="mt-5"
        >
          <ButtonComponent
            :label="loading ? 'Trying to guess...' : 'Try to guess'"
            :disabled="endNumber < 2 || !!guessedNumber"
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
          v-if="(guessedNumber && !loading) && !answer"
          class="mt-5"
        >
          <p class="mt-2 text-base text-gray-700">
            Is that your number?
          </p>
          <p class="mt-2 text-2xl font-medium text-gray-700">
            {{ guessedNumber }}
          </p>
          <div class="flex-row flex mt-5">
            <ButtonComponent
              label="Yes, it is!!"
              @click="answer = 'yes', guessedNumber = undefined"
            />
            <ButtonComponent
              class="ml-5"
              label="No, it's not"
              @click="answer = 'no', guessedNumber = undefined"
            />
          </div>
        </div>
        <div class="mt-4 text-gray-700">
          <div v-if="answer === 'yes'">
            Yeah, it's megamind time 😎
          </div>
          <div v-else-if="answer === 'no'">
            Hm, maybe next time... 🤔
          </div>
          <div v-if="answer">
            Wanna try again?
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import ButtonComponent from '~/components/Common/UI/ButtonComponent.vue'
import InputComponent from '~/components/Common/UI/InputComponent.vue'

const endNumber = ref(10)
const guessedNumber = ref<number>()
const loading = ref(false)
const answer = ref<'no' | 'yes'>()
const guessNumber = () => {
  answer.value = undefined
  loading.value = true
  setTimeout(() => {
    loading.value = false
    guessedNumber.value = Math.floor(Math.random() * endNumber.value) + 1
  }, 3000)
}

</script>
