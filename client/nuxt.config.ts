// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      meta: [{ content: 'Some Random Stuff', name: 'description' }],
      title: 'Random Stuff'
    }
  },
  css: ['@/assets/css/main.css'],
  debug: true,
  devtools: {
    enabled: true
  },
  imports: {
    autoImport: false
  },
  modules: ['@nuxtjs/tailwindcss'],
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {}
    }
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  }
})
