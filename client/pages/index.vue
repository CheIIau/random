<template>
  <div class="mx-auto max-w-2xl">
    <p
      v-if="pending"
      class="mb-3"
    >
      Loading...
    </p>
    <div
      v-for="user in users?.data"
      :key="user.id"
      class="mb-3"
    >
      <p>
        <span class="mr-2">{{ user.id }}</span>{{ user.name }}
      </p>
    </div>
    <div class="mb-3">
      <ButtonComponent
        label="Fetch some data"
        @click="fetchData"
      />
    </div>
    <div v-if="pong">
      {{ pong }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useFetch } from '#imports'
import ButtonComponent from '~/components/Common/UI/ButtonComponent.vue'
interface TestDataResponse {
  data: {
    id: number,
    name: string
  }[]
}
interface Pong {
  text: 'pong'
}
const pong = ref<Pong>()
const { data: users, pending } = await useFetch<TestDataResponse>('/api/testdata/')
async function fetchData() {
  pong.value = await $fetch<Pong>('/api/ping/')
}
</script>
