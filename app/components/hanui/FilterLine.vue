<script setup lang="ts">
  import { cn } from '@/lib/utils'

  const props = withDefaults(
    defineProps<{
      totalCount: number | string
      countLabel?: string
      countUnit?: string
      class?: string
    }>(),
    {
      countLabel: '총',
      countUnit: '건',
      class: undefined,
    },
  )
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-wrap items-end justify-between gap-x-4 gap-y-3',
        props.class,
      )
    "
  >
    <div
      class="flex items-center gap-1 text-[15px] leading-[1.5] tracking-[-0.3px] text-krds-gray-80"
      aria-live="polite"
    >
      <span class="font-medium">{{ countLabel }}</span>
      <span class="flex items-center gap-0.5">
        <span class="font-semibold text-krds-primary-60">{{ totalCount }}</span>
        <span class="font-medium text-krds-gray-80">{{ countUnit }}</span>
      </span>
    </div>

    <slot name="right" />
  </div>
</template>
