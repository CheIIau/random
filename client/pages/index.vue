<template>
  <div class="mx-auto max-w-2xl">
    <p class="text-gray-700 font-medium text-lg text-center">
      Small site with absolute random stuff
    </p>
    <div class="mt-5 flex justify-center">
      <ButtonComponent
        label="Try something random"
        @click="openRandomPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app'
import ButtonComponent from '~/components/Common/UI/ButtonComponent.vue'
import { $apiFetch, useAPIFetch } from '~/composables/useMyFetch'
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
const $router = useRouter()
function openRandomPage() {
  const routes = $router.getRoutes().filter((route) => route.path.length !== 1)
  const randomNumber = Math.floor(Math.random() * (routes.length))
  return $router.push(routes[randomNumber])
}
</script>
