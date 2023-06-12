import { useFetch, useRuntimeConfig } from '#app'

type useFetchType = typeof useFetch

export const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()
  
  if (process.server || config.public.baseUrl.includes('localhost')) {
    options.baseURL = config.public.baseUrl
  } else {
    options.baseURL = '/api/'
  }
  options.key = 'key' // any key i suppose (may be set to config.public.baseUrl)
  return useFetch(path, options)
}

type ApiFetch = typeof $fetch

export const $apiFetch: ApiFetch = (request, options = {}) => {
  const config = useRuntimeConfig()

  if (process.server || config.public.baseUrl.includes('localhost')) {
    options.baseURL = config.public.baseUrl
  } else {
    options.baseURL = '/api/'
  }
  return $fetch(request, options)
}
