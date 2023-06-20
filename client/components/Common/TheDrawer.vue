<template>
  <Transition name="slide-fade">
    <div
      v-show="show"
      class="lg:hidden fixed h-screen top-0 right-0 w-full"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed h-screen top-0 right-0 z-10 w-full overflow-visible bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/"
            class="-m-1.5 p-1.5"
          >
            <div class="fill-current text-emerald-700 w-10 h-10;">
              <svg class="hover:animate-spin" viewBox="0 0 500 500">
                <use xlink:href="~assets/images/icons.svg#random" />
              </svg>
            </div>
          </NuxtLink>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="emit('close')"
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="mt-6 bg-white">
          <div class="-my-6 divide-y divide-gray-500/10" @click="emit('close')">
            <!-- @slot Default slot to show content -->
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  show: {
    required: true,
    type: Boolean
  }
})
const emit = defineEmits<{ (e: 'close'): void }>()
defineSlots<{
  default(props: {}): void
}>()
</script>

<style lang="postcss">
.slide-fade-enter-active {
  transition: all 0.15s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
}
</style>
