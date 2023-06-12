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
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:5000/'
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
