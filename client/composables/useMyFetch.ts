import { useFetch, useRuntimeConfig } from '#app'

type useFetchType = typeof useFetch

export const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()

  options.baseURL = process.server ? config.public.baseUrl : '/api/'
  options.key = 'key'
  return useFetch(path, options)
}

type ApiFetch = typeof $fetch

export const $apiFetch: ApiFetch = (request, options = {}) => {
  const config = useRuntimeConfig()

  options.baseURL = process.server ? config.public.baseUrl : '/api/'
  return $fetch(request, options)
}
