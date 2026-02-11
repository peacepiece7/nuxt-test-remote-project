<script setup lang="ts">
  import Skeleton from '@/components/hanui/Skeleton.vue'
  import Spinner from '@/components/hanui/Spinner.vue'
</script>

<template>
  <div
    class="relative overflow-hidden rounded border border-grey-300 bg-white"
    style="min-height: 450px"
  >
    <!-- Toolbar Skeleton -->
    <div
      class="flex flex-wrap items-center gap-2 border-b border-grey-300 bg-white p-2"
    >
      <Skeleton
        v-for="i in 7"
        :key="i"
        variant="rectangular"
        width="32px"
        height="32px"
        class="shrink-0"
      />
    </div>

    <!-- Content Skeleton -->
    <div class="flex flex-col gap-3 bg-white p-4">
      <Skeleton variant="rectangular" width="100%" height="2rem" />
      <Skeleton variant="rectangular" width="100%" height="2rem" />
      <Skeleton variant="rectangular" width="60%" height="2rem" />
      <Skeleton variant="rectangular" width="100%" height="2rem" />
      <Skeleton variant="rectangular" width="100%" height="2rem" />
      <Skeleton variant="rectangular" width="60%" height="2rem" />
    </div>

    <!-- Loading Message -->
    <div
      class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 font-medium text-grey-900"
    >
      <Spinner size="xs" variant="default" label="에디터를 불러오는 중입니다" />
      <span>에디터를 불러오는 중입니다...</span>
    </div>
  </div>
</template>
