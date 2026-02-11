<script setup lang="ts">
  import { computed } from 'vue'
  import { twMerge } from 'tailwind-merge'
  import clsx from 'clsx'
  import type { IconName } from '~/types/icon-font'

  const rawIcons = import.meta.glob('~/assets/icons/*.svg', {
    eager: true,
    as: 'raw',
  })

  const icons = Object.fromEntries(
    Object.entries(rawIcons).map(([path, svg]) => {
      const name = path.split('/').pop()?.replace('.svg', '') ?? path
      return [name, svg]
    }),
  ) as Record<string, string>

  export type IconSize = 16 | 20 | 24 | 32 | 40 | 48 | 80 | 96 | 120

  const props = withDefaults(
    defineProps<{
      name: IconName
      size?: IconSize
      color?: string
      ariaLabel?: string
      class?: string | string[]
    }>(),
    {
      size: 20,
    },
  )

  const svg = computed(() => {
    const icon = icons[props.name]
    if (!icon && import.meta.env?.DEV) {
      console.warn(`[HANUI Icon] Unknown icon name: ${props.name}`)
    }
    return icon ?? ''
  })

  const ariaHidden = computed(() => (props.ariaLabel ? undefined : 'true'))

  const sizeMap: Record<IconSize, string> = {
  16: 'h-4 w-4',
  20: 'h-5 w-5',
  24: 'h-6 w-6',
  32: 'h-8 w-8',
  40: 'h-10 w-10',
  48: 'h-12 w-12',
  80: 'h-[80px] w-[80px]',
  96: 'h-[96px] w-[96px]',
  120: 'h-[120px] w-[120px]',
}
</script>

<template>
  <span
  class="hanui-icon text-current align-middle"
  :class="twMerge(clsx(sizeMap[props.size], props.class))"
  role="img"
  :style="{ color: props.color }"
  :aria-label="props.ariaLabel"
  :aria-hidden="ariaHidden ? 'true' : undefined"
  v-html="svg"
/>
</template>

<style scoped>
  .hanui-icon {
    display: inline-flex;
    line-height: 1;
  }
  .hanui-icon :deep(svg [fill]) {
    fill: currentColor;
  }

  .hanui-icon :deep(svg [stroke]) {
    stroke: currentColor;
  }

  .hanui-icon :deep(svg) {
    width: 100%;
    height: 100%;
    display: block;
  }

  .icon-font {
    display: none;
  }
</style>
