<script setup lang="ts">
  import { ModalsContainer } from 'vue-final-modal'
  import '~/assets/icon-font/icon-font.css'

  const route = useRoute()

  const pageMeta = computed(() => {
    const meta: { title?: string; description?: string } = {}

    if (typeof route.meta.title === 'string') meta.title = route.meta.title
    if (typeof route.meta.description === 'string')
      meta.description = route.meta.description

    return meta
  })

  useHead(pageMeta)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <ModalsContainer />
    <GNB :visible="true" :is-at-top="true" />
    <!-- @TODO: mt-50 임의로 한거니까 실제 개발땐 braekpoint 걸어서 조정하기!! -->
    <main class="mx-auto mt-50 max-w-[1440px] flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style></style>
