// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  /* --------------------------------------------------
   * Core / Versioning
   * 페이지 구조를 nuxt 4 기준으로 변경
   * -------------------------------------------------- */
  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    componentIslands: true,
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  /* --------------------------------------------------
   * Styles
   * -------------------------------------------------- */
  css: [
    '@/assets/css/main.css',
    '@/assets/css/figma-main.css',
    '@vuepic/vue-datepicker/dist/main.css',
    'vue-final-modal/style.css',
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  /* --------------------------------------------------
   * Modules
   * -------------------------------------------------- */
  modules: [
    '@nuxt/image',
    '@nuxt/eslint',
    'dayjs-nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
  ],

  /* --------------------------------------------------
   * Module Configs
   * -------------------------------------------------- */
  // pinia: {
  //   storesDirs: ['./app/stores/**'],
  // },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
        ignore: ['molecules/MyCKEditor.vue', 'hanui/DateInput.vue'],
      },
    ],
  },

  runtimeConfig: {
    public: {
      environment: process.env.ENVIRONMENT || 'dev',
      context: process.env.CONTEXT_PATH,
      appDomain: process.env.DOMAIN_URL,
      kakaoMapKey: process.env.KAKAO_MAP_KEY,
      kakaoRestKey: process.env.KAKAO_MAP_REST_KEY,
      kakaoJsKey: process.env.KAKAO_JS_KEY,
      naverClientId: process.env.NAVER_CLIENT_ID,
    },
  },

  /* --------------------------------------------------
   * Build
   * -------------------------------------------------- */
  build: {
    transpile: ['@ckeditor/ckeditor5-vue', '@vuepic/vue-datepicker'],
  },

  /* --------------------------------------------------
   * Tooling
   * -------------------------------------------------- */
  sourcemap: {
    client: false,
    server: false,
  },
})
