<template>
  <header class="bg-emerald-700 rounded-b-2xl shadow-xl">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <span class="sr-only">Random App</span>
        <NuxtLink to="/">
          <div class="logo-icon">
            <svg
              class="hover:animate-spin"
              viewBox="0 0 500 500"
            >
              <use xlink:href="~assets/images/icons.svg#random" />
            </svg>
          </div>
        </NuxtLink>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-base font-semibold leading-6 text-white hover:bg-white hover:rounded-lg hover:bg-opacity-50 px-3 py-1"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink
          to="/"
          class="text-base font-semibold leading-6 text-white hover:bg-white hover:rounded-lg hover:bg-opacity-50 px-3 py-1"
        >
          About <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
      <button
        type="button"
        class="lg:hidden flex"
        @click="dialog = !dialog"
      >
        <div class="fill-current text-white w-8 h-8">
          <svg viewBox="0 0 1 1">
            <use xlink:href="~assets/images/icons.svg#menu" />
          </svg>
        </div>
      </button>
    </nav>
    <Teleport to="body">
      <TheDrawer
        :show="dialog"
        @close="dialog = !dialog"
      >
        <div class="space-y-2 py-6">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
        <div class="py-6">
          <NuxtLink
            to="/"
            class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
          >
            About
          </NuxtLink>
        </div>
      </TheDrawer>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import TheDrawer from './TheDrawer.vue'
import { ref } from '#imports'

const dialog = ref(false)

const links = [
  {
    label: 'Guess a number',
    to: 'guessnumber'
  },
  {
    label: 'Tab Killer',
    to: 'tabkiller'
  },
  {
    label: 'Epilepsy check',
    to: 'epilepsycheck'
  }
]
</script>

<style lang="postcss">
.logo-icon {
  @apply fill-current text-white w-10 h-10;
}</style>
