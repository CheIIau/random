<template>
  <div class="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-500 p-1 shadow-xl">
    <div class="block rounded-xl bg-white p-4 sm:p-6 lg:p-8">
      <div class="relative flex flex-col items-center mt-4">
        <img
          ref="wheelPointer"
          src="~assets/images/wheel-pointer.png"
          class="aspect-square h-12 absolute z-10 top-[-30px] wheel-pointer"
          :class="isSpinning ? $style['wheel-pointer'] : ''"
        >

        <div
          ref="wheel"
          :class="$style.wheel"
          class="flex mt-1 w-full aspect-square max-w-[400px] border-solid border-black border-2 rounded-[50%] overflow-hidden bg-gray-700 relative"
        >
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white aspect-square max-w-[40px] w-[15%] z-10 rounded-full shadow-md"
          >
            <div class="mx-auto h-full rounded-full flex flex-row justify-center items-center">
              <div class="bg-emerald-700 w-5 aspect-square rounded-full" />
            </div>
          </div>
          <div ref="wheelSectorParent">
            <div
              v-for="(sector, i) in colors"
              :key="sector"
              :class="$style.sector"
              :style="{
                backgroundColor: randomColorsArray[i],
                transform: `rotate(${(i * 360) / colors}deg)`
              }"
            >
              <svg class="w-full absolute top-[-105px] left-[-64px] rotate-[48deg] h-[240px]">
                <path
                  id="textPath"
                  fill="transparent"
                  d="M 200,200 a 200,200 0 1,1 400,0 200,200 0 1,1 -400,0"
                />
                <text>
                  <textPath
                    :textLength="Math.floor((Math.PI * 2 * 200) / colors - 30)"
                    xlink:href="#textPath"
                  >
                    {{ sectorTextInputs[i]?.value }}
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between w-full mt-7">
          <ButtonComponent
            class="mt-4 mr-4"
            label="Change sectors' colors"
            @click="randomColorsArray = getRandomColorsArray(colors)"
          />
          <ButtonComponent
            class="mt-4 mr-4"
            label="Spin the wheel"
            @click="spin"
          />
          <ButtonComponent
            class="mt-4"
            label="Change sectors' texts"
            @click="showSectorsTextInputs = !showSectorsTextInputs"
          />
        </div>
        <p
          v-if="result"
          class="mt-3"
        >
          Sector {{ result }} wins
        </p>
        <div class="mt-7 flex items-center justify-evenly w-full">
          <InputComponent
            v-model="colors"
            type="number"
            min="4"
            max="14"
            class="mr-4"
          />
          <p>You may change the number of sectors in range between 4 and 14</p>
        </div>
        <div
          v-if="showSectorsTextInputs"
          class="mt-7"
        >
          <div class="max-w-full grid grid-cols-3 gap-x-4 gap-y-2 items-center justify-center px-3">
            <div
              v-for="(input, i) in sectorTextInputs"
              :key="i"
            >
              <div class="flex flex-row items-center w-full">
                <p class="mr-3">
                  {{ i + 1 }}
                </p>
                <InputComponent
                  v-model="input.value"
                  :number="false"
                  class="w-1/3 flex-grow"
                  @focus="sectorFocus(i)"
                  @blur="sectorBlur"
                />
              </div>
            </div>
          </div>
          <div class="mt-7 flex flex-row justify-center">
            <ButtonComponent
              label="Clear sectors' texts"
              @click="clearInputs"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonComponent from '../components/Common/UI/ButtonComponent.vue'
import InputComponent from '../components/Common/UI/InputComponent.vue'
import { computed, definePageMeta, onBeforeUnmount, ref, useState, watch } from '#imports'

definePageMeta({
  title: 'Wheel of Fortune'
})
const SECTOR_WIDTH_MODIFIER = 10 / 9
const SPIN_TIME = 4
const spinTimeCssLiteral = computed(() => SPIN_TIME + 's')

const colors = ref(8)
const sectorTextInputs = ref<string[]>([])
// sectorTextInputs.value = (()=>{
//   const array = []
//   new Array(colors.value).fill()
// })
watch(colors, () => {
  const inputs: { value: string }[] = []
  for (let i = 0; i < colors.value; i++) {
    inputs.push({ value: '' })
  }
  sectorTextInputs.value = inputs
}, { immediate: true })

const clearInputs = () => {
  sectorTextInputs.value.forEach((input) => input.value = '')
}

const showSectorsTextInputs = ref(false)
const wheel = ref<HTMLDivElement | null>(null)
const wheelPointer = ref<HTMLImageElement | null>(null)
const result = ref('')
const isSpinning = ref(false)

const sectorDegree = computed(() => 360 / colors.value)
const sectorWidth = computed(
  () => {
    let adjustWidth = 0
    if (colors.value > 4 && colors.value < 10) {
      adjustWidth = -10 + colors.value
    }
    return Math.ceil(sectorDegree.value * SECTOR_WIDTH_MODIFIER) + adjustWidth + '%'
  }
)
const sectorShift = computed(() => sectorDegree.value - 45)

const getRandomColorsArray = (arrayLength: number) => {
  const arrayOfColors: string[] = []
  const randomNumber = () => Math.ceil(Math.random() * (255 - 50) + 50)
  for (let i = 0; i <= arrayLength; i++) {
    const red = randomNumber()
    const green = randomNumber()
    const blue = randomNumber()
    arrayOfColors.push(`rgb(${red}, ${green}, ${blue})`)
  }

  return arrayOfColors
}

const randomColorsArray = useState('colorsArray', () =>
  getRandomColorsArray(colors.value)
)

let timeout: NodeJS.Timer
function spin() {
  if (isSpinning.value || !wheel.value) {
    return
  }
  isSpinning.value = true
  const rotations = Math.floor(Math.random() * 3) + 5 // random number of rotations between 5 and 7
  const degrees = Math.floor(Math.random() * 360) + 1 // random degree between 1 and 360
  const previousRotationDegrees = wheel.value.style.transform.replace(/\D/g, '')

  const totalDegrees = rotations * 360 + degrees
  wheel.value.style.transform = `rotate(${+previousRotationDegrees + totalDegrees
    }deg)`
  const degressWithSectorShift = degrees + sectorShift.value
  const sectorIndex = calculateSectorIndex(degressWithSectorShift, +previousRotationDegrees)

  timeout = setTimeout(() => {
    result.value = sectorIndex + 1
    isSpinning.value = false
  }, SPIN_TIME * 1000)
}

const wheelSectorParent = ref<HTMLDivElement | null>(null)

function sectorFocus(i: number) {
  const currentSector = wheelSectorParent.value.children[i]
  currentSector.classList.add('!animate-pulse')
}

function sectorBlur() {
  Array.prototype.forEach.call(wheelSectorParent.value.children, (sector) => sector.classList.remove('!animate-pulse'))
}

const calculatePreviousRotationDegree = (degree: number) =>
  degree ? degree % 360 : 0

const calculateSectorIndex = (degree: number, previousDegrees = 0) => {
  const sector = Math.ceil(
    turnDegree(degree, previousDegrees) / sectorDegree.value
  )
  const index = sector === colors.value ? 0 : sector
  return index
}

const turnDegree = (degree: number, previousDegree = 0) => {
  let turnDegree =
    360 - calculatePreviousRotationDegree(previousDegree) - degree
  if (turnDegree > 0) {
    return turnDegree
  }
  turnDegree = 360 + turnDegree
  return turnDegree
}

watch(colors, () => {
  randomColorsArray.value = getRandomColorsArray(colors.value)
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
})
</script>

<style module lang="postcss">
.wheel {
  transition: transform v-bind(spinTimeCssLiteral);
}

.wheel-pointer {
  animation: twitch 4s ease-out;
  transform-origin: 50% calc(50% - 8px);
}

@keyframes twitch {
  0% {
    transform: rotate(0);
  }

  1% {
    transform: rotate(-30deg);
  }

  2% {
    transform: rotate(-27deg);
  }

  3% {
    transform: rotate(-30deg);
  }

  4% {
    transform: rotate(-27deg);
  }

  5% {
    transform: rotate(-30deg);
  }

  6% {
    transform: rotate(-27deg);
  }

  7% {
    transform: rotate(-30deg);
  }

  8% {
    transform: rotate(-27deg);
  }

  9% {
    transform: rotate(-30deg);
  }

  10% {
    transform: rotate(-27deg);
  }

  11% {
    transform: rotate(-30deg);
  }

  12% {
    transform: rotate(-27deg);
  }

  13% {
    transform: rotate(-30deg);
  }

  14% {
    transform: rotate(-27deg);
  }

  15% {
    transform: rotate(-30deg);
  }

  16% {
    transform: rotate(-27deg);
  }

  17% {
    transform: rotate(-30deg);
  }

  18% {
    transform: rotate(-27deg);
  }

  19% {
    transform: rotate(-30deg);
  }

  20% {
    transform: rotate(-27deg);
  }

  21% {
    transform: rotate(-30deg);
  }

  22% {
    transform: rotate(-27deg);
  }

  23% {
    transform: rotate(-30deg);
  }

  24% {
    transform: rotate(-26deg);
  }

  25% {
    transform: rotate(-30deg);
  }

  26% {
    transform: rotate(-26deg);
  }

  27% {
    transform: rotate(-30deg);
  }

  28% {
    transform: rotate(-26deg);
  }

  30% {
    transform: rotate(-29deg);
  }

  31% {
    transform: rotate(-25deg);
  }

  32% {
    transform: rotate(-29deg);
  }

  33% {
    transform: rotate(-25deg);
  }

  34% {
    transform: rotate(-28deg);
  }

  35% {
    transform: rotate(-25deg);
  }

  36% {
    transform: rotate(-28deg);
  }

  37% {
    transform: rotate(-25deg);
  }

  38% {
    transform: rotate(-28deg);
  }

  39% {
    transform: rotate(-25deg);
  }

  40% {
    transform: rotate(-27deg);
  }

  41% {
    transform: rotate(-24deg);
  }

  42% {
    transform: rotate(-27deg);
  }

  44% {
    transform: rotate(-24deg);
  }

  46% {
    transform: rotate(-27deg);
  }

  48% {
    transform: rotate(-22deg);
  }

  50% {
    transform: rotate(-26deg);
  }

  52% {
    transform: rotate(-20deg);
  }

  55% {
    transform: rotate(-25deg);
  }

  58% {
    transform: rotate(-18deg);
  }

  61% {
    transform: rotate(-24deg);
  }

  64% {
    transform: rotate(-15deg);
  }

  67% {
    transform: rotate(-23deg);
  }

  70% {
    transform: rotate(-11deg);
  }

  73% {
    transform: rotate(-22deg);
  }

  76% {
    transform: rotate(-8deg);
  }

  79% {
    transform: rotate(-22deg);
  }

  82% {
    transform: rotate(-5deg);
  }

  85% {
    transform: rotate(-22deg);
  }

  89% {
    transform: rotate(-2deg);
  }

  93% {
    transform: rotate(-22deg);
  }

  100% {
    transform: rotate(0);
  }
}

.sector {
  @apply absolute top-0 left-0 w-full h-full origin-center;
  clip-path: polygon(50% 50%, 0% 0%, v-bind(sectorWidth) -5%);
}
</style>
