<script setup lang="ts">
  import { computed } from 'vue'
  import { cn } from '@/lib/utils'
  import attentionIcon from '@/assets/icons/attention.svg'

  const props = withDefaults(
    defineProps<{
      title?: string
      descriptions?: string[]
      class?: string
    }>(),
    {
      title: '검색결과가 없습니다.',
      descriptions: () => [
        '지역을 변경해서 검색해 보세요.',
        '상세조건을 더 넓은 범위로 지정하거나 상세조건 없이 검색해 보세요.',
      ],
      class: undefined,
    },
  )

  const containerClass = computed(() =>
    cn(
      'flex min-h-[200px] w-full flex-col items-center justify-center gap-4 bg-krds-white p-5 text-center',
      props.class,
    ),
  )

  const formattedDescriptions = computed(() =>
    (props.descriptions ?? []).filter((desc) => desc.trim().length > 0),
  )
</script>

<template>
  <div :class="containerClass" role="status" aria-live="polite">
    <img :src="attentionIcon" alt="" class="h-16 w-16" aria-hidden="true" />
    <p class="text-krds-title-sm font-bold tracking-[-0.4px] text-krds-gray-80">
      {{ title }}
    </p>
    <ul class="space-y-2 text-krds-body-xxs text-krds-gray-70">
      <li v-for="(desc, index) in formattedDescriptions" :key="index">
        <span class="inline-flex items-start gap-1">
          <span class="mt-2 h-px w-[5px] bg-krds-gray-90" aria-hidden="true" />
          <span class="text-center font-medium">{{ desc }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>
