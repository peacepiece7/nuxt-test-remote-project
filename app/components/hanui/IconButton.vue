<script setup lang="ts">
  import { computed } from 'vue'
  import { cn } from '@/lib/utils'
  import Icon, { type IconSize } from '@/components/hanui/Icon.vue'
  import type { IconName } from '~/types/icon-font'

  const props = withDefaults(
    defineProps<{
      icon: IconName
      ariaLabel: string
      size?: IconSize
      color?: string
      disabled?: boolean
      class?: string | string[]
    }>(),
    {
      size: 20,
      disabled: false,
    },
  )

  const buttonClasses = computed(() =>
    cn(
      'inline-flex items-center justify-center p-[5px]',
      'rounded-full',
      'transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60 focus-visible:ring-offset-2',
      'hover:bg-krds-gray-10 active:bg-krds-gray-20 cursor-pointer',
      'disabled:opacity-50 disabled:pointer-events-none',
      props.class,
    ),
  )
</script>

<template>
  <button
    type="button"
    :aria-label="props.ariaLabel"
    :disabled="props.disabled"
    :class="buttonClasses"
  >
    <Icon :name="props.icon" :size="props.size" aria-hidden="true" />
  </button>
</template>
