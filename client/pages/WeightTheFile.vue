<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 p-1 shadow-xl">
    <div
      class="block rounded-xl bg-white p-4 sm:p-6 lg:p-18"
      :class="{ 'bg-emerald-100 before:content-[`Hello_World`]': isOverDropZone }"
    >
      <div class="mt-2">
        <h3 class="mb-6 text-lg font-bold text-gray-900 sm:text-xl">
          Drop a file of similar size (+-10%) as on the right side of the scale
        </h3>
        <div
          ref="dropZoneRef"
          class="scales"
        >
          <div class="px-10 sm:px-16">
            <div class="relative">
              <img
                class=""
                src="~assets/images/scalespole.png"
                alt=""
              >
              <img
                ref="scalesSwing"
                class="absolute left-[0%] top-[6.5%] w-full z-10"
                src="~assets/images/swing.png"
                alt=""
              >
              <img
                ref="scalesLeftCup"
                class="absolute top-[20%] w-[35%] left-[-11%]"
                src="~assets/images/leftcup.png"
                alt=""
              >
              <img
                ref="scalesRightCup"
                class="absolute top-[20%] w-[35%] left-[77%]"
                src="~assets/images/leftcup.png"
                alt=""
              >
              <div
                ref="rightCupFile"
                class="fill-current text-sky-500 absolute top-[47%] w-[18%] left-[86%] z-10"
              >
                <svg
                  class="hover:animate-pulse"
                  viewBox="0 0 500 500"
                >
                  <use xlink:href="~assets/images/icons.svg#file" />
                </svg>
              </div>
              <Transition name="fade">
                <div
                  v-show="filesData.length"
                  ref="leftCupFile"
                  class="fill-current text-emerald-500 absolute top-[47%] w-[18%] left-[-2%] z-10"
                >
                  <svg
                    class="hover:animate-pulse"
                    viewBox="0 0 500 500"
                  >
                    <use xlink:href="~assets/images/icons.svg#file" />
                  </svg>
                </div>
              </Transition>

              <p class="absolute bottom-[5%] font-bold right-[0%] min-w-[50px] text-xl">
                {{ randomFileSize }} KB
              </p>
              <p
                v-if="filesData[0]"
                class="absolute bottom-[5%] font-bold left-[0%] min-w-[50px] text-xl"
              >
                {{ filesData[0].size }} KB
              </p>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center mt-6">
          <ButtonComponent
            v-if="scalingComplete"
            label="Wanna scale again?"
            @click="restartScaling"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDropZone } from '@vueuse/core'
import ButtonComponent from '../components/Common/UI/ButtonComponent.vue'
import { $apiFetch, useAPIFetch } from '../composables/useMyFetch'
import { definePageMeta, onBeforeMount, onBeforeUnmount, useState } from '#imports'

definePageMeta({
  title: 'Scales'
})

const dropZoneRef = ref<HTMLDivElement | null>(null)
const scalesSwing = ref<HTMLImageElement | null>(null)
const scalesLeftCup = ref<HTMLImageElement | null>(null)
const scalesRightCup = ref<HTMLImageElement | null>(null)
const rightCupFile = ref<HTMLDivElement | null>(null)
const leftCupFile = ref<HTMLDivElement | null>(null)

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)
const filesData = ref<{ lastModified: number; name: string; size: number; type: string }[]>([])
const randomFileSize = useState('fileSize', () => Math.ceil(Math.random() * 990 + 9))

let timeout: NodeJS.Timeout
const scalingComplete = ref(false)

function onDrop(files: File[] | null) {
  filesData.value = []
  if (files) {
    filesData.value = files.map(file => ({
      name: file.name,
      size: Math.ceil(file.size / 1024),
      type: file.type,
      lastModified: file.lastModified
    }))
  }

  timeout = setTimeout(() => {
    scalingComplete.value = true
  }, 5700)

  if (isDiffLessThan10Percent(filesData.value[0].size, randomFileSize.value)) {
    scalesLeftCup.value?.classList.add('scales__left-cup-center')
    leftCupFile.value?.classList.add('scales__left-cup-center')
    scalesRightCup.value?.classList.add('scales__right-cup-center')
    rightCupFile.value?.classList.add('scales__right-cup-center')
    scalesSwing.value?.classList.add('scales__swing_center')
    return
  }
  if (randomFileSize.value < filesData.value[0].size) {
    scalesLeftCup.value?.classList.add('scales__left-cup-down')
    leftCupFile.value?.classList.add('scales__left-cup-down')
    scalesRightCup.value?.classList.add('scales__right-cup-up')
    rightCupFile.value?.classList.add('scales__right-cup-up')
    scalesSwing.value?.classList.add('scales__swing_left-heavier')
    return
  }
  scalesLeftCup.value?.classList.add('scales__left-cup-up')
  leftCupFile.value?.classList.add('scales__left-cup-up')
  scalesRightCup.value?.classList.add('scales__right-cup-down')
  rightCupFile.value?.classList.add('scales__right-cup-down')
  scalesSwing.value?.classList.add('scales__swing_right-heavier')
}

function restartScaling() {
  scalingComplete.value = false
  filesData.value = []
  randomFileSize.value = Math.ceil(Math.random() * 990 + 9)

  scalesLeftCup.value?.classList.remove('scales__left-cup-up', 'scales__left-cup-center', 'scales__left-cup-down')
  leftCupFile.value?.classList.remove('scales__left-cup-up', 'scales__left-cup-center', 'scales__left-cup-down')
  scalesRightCup.value?.classList.remove('scales__right-cup-down', 'scales__right-cup-center', 'scales__right-cup-up')
  rightCupFile.value?.classList.remove('scales__right-cup-down', 'scales__right-cup-center', 'scales__right-cup-up')
  scalesSwing.value?.classList.remove('scales__swing_right-heavier', 'scales__swing_center', 'scales__swing_left-heavier')
}

function isDiffLessThan10Percent(num1: number, num2: number) {
  const diff = Math.abs(num1 - num2)
  const percentDiff = (diff / ((num1 + num2) / 2)) * 100
  return percentDiff < 10
}

onBeforeUnmount(() => {
  clearTimeout(timeout)
})

// interface TestDataResponse {
//   data: {
//     id: number
//     name: string,
//   }[]
// }
// interface Pong {
//   text: 'pong'
// }
// const pong = ref<Pong>()
// const { data: users } = await useAPIFetch<TestDataResponse>('/testdata/')
// async function fetchData() {
//   pong.value = await $apiFetch<Pong>('/ping/')
// }

</script>

<style lang="postcss">
.scales__left-cup-up {
  animation: left-cup-up 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

.scales__left-cup-down {
  animation: left-cup-down 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

.scales__left-cup-center {
  animation: left-cup-center 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes left-cup-up {
  0% {
    transform: translate(0px, 0px)
  }

  30% {
    transform: translate(-1px, -70px)
  }

  60% {
    transform: translate(13px, 70px)
  }

  100% {
    transform: translate(-1px, -70px)
  }
}

@keyframes left-cup-down {
  0% {
    transform: translate(0px, 0px)
  }

  30% {
    transform: translate(13px, 70px)
  }

  60% {
    transform: translate(-1px, -70px)
  }

  100% {
    transform: translate(13px, 70px)
  }
}

@keyframes left-cup-center {
  0% {
    transform: translate(0px, 0px)
  }

  30% {
    transform: translate(13px, 70px)
  }

  60% {
    transform: translate(-1px, -70px)
  }

  100% {
    transform: translate(0px, 0px)
  }
}

.scales__right-cup-up {
  animation: right-cup-up 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

.scales__right-cup-down {
  animation: right-cup-down 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

.scales__right-cup-center {
  animation: right-cup-center 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes right-cup-up {
  0% {
    transform: translate(0px, 0px)
  }

  30% {
    transform: translate(-1px, -70px)
  }

  60% {
    transform: translate(-13px, 70px)
  }

  100% {
    transform: translate(-1px, -70px)
  }
}

@keyframes right-cup-down {
  0% {
    transform: translate(0px, 0px)
  }

  30% {
    transform: translate(-13px, 70px)
  }

  60% {
    transform: translate(-1px, -70px)
  }

  100% {
    transform: translate(-13px, 70px)
  }
}

@keyframes right-cup-center {
  0% {
    transform: translate(0px, 0px)
  }

  30% {
    transform: translate(-1px, -70px)
  }

  60% {
    transform: translate(-13px, 70px)
  }

  100% {
    transform: translate(0px, 0px)
  }
}

.scales__swing_right-heavier {
  animation: swing-right 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

.scales__swing_left-heavier {
  animation: swing-left 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

.scales__swing_center {
  animation: swing-center 5s 0.7s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes swing-right {
  0% {
    transform: rotate(0);
  }

  30% {
    transform: rotate(20deg);
  }

  60% {
    transform: rotate(-20deg);
  }

  100% {
    transform: rotate(20deg);
  }
}

@keyframes swing-left {
  0% {
    transform: rotate(0);
  }

  30% {
    transform: rotate(-20deg);
  }

  60% {
    transform: rotate(20deg);
  }

  100% {
    transform: rotate(-20deg);
  }
}

@keyframes swing-center {
  0% {
    transform: rotate(0);
  }

  30% {
    transform: rotate(-20deg);
  }

  60% {
    transform: rotate(20deg);
  }

  100% {
    transform: rotate(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
