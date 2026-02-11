<script setup lang="ts">
  import { computed } from 'vue'
  import { cva } from 'class-variance-authority'
  import { cn } from '@/lib/utils'

  const badgeVariants = cva(
    'inline-flex items-center justify-center font-medium transition-colors',
    {
      variants: {
        variant: {
          /* gray: bg F3F5F8, text 6A7583 */
          gray: 'bg-krds-gray-10 text-krds-gray-60',
          /* primary: bg E6ECFF, text 3661E5 */
          primary: 'bg-krds-primary-10 text-krds-primary-80',
          secondary: 'bg-krds-gray-10 text-krds-gray-80',
          /* success: bg E5FFE9, text 008A3E */
          success: 'bg-krds-success-10 text-krds-success-60',
          /* yellow: bg FFF0B2, text DDA600 */
          warning: 'bg-krds-warning-10 text-krds-warning-60',
          /* danger: bg FFDDE1, text DE1F37 */
          error: 'bg-krds-danger-10 text-krds-danger-60',
          /* info: bg E2F6FF, text 0291D8 (유사: info-5, info-40) */
          info: 'bg-krds-info-5 text-krds-info-40',
          /* purple: bg F5ECFF, text 7729CB */
          purple: 'bg-krds-purple-10 text-krds-purple-60',
          /* orange: bg FFE3C9, text EE6F00 */
          orange: 'bg-krds-orange-10 text-krds-orange-60',
          'outline-gray':
            'border border-krds-gray-30 bg-transparent text-krds-gray-60',
          'outline-primary':
            'border border-krds-primary-80 bg-transparent text-krds-primary-80',
          'outline-secondary':
            'border border-krds-gray-50 bg-transparent text-krds-gray-90',
          'outline-success':
            'border border-krds-success-60 bg-transparent text-krds-success-60',
          'outline-warning':
            'border border-krds-warning-60 bg-transparent text-krds-warning-60',
          'outline-error':
            'border border-krds-danger-60 bg-transparent text-krds-danger-60',
          'outline-info':
            'border border-krds-info-40 bg-transparent text-krds-info-40',
          'solid-gray': 'bg-krds-gray-60 text-white',
          'solid-primary': 'bg-krds-primary-80 text-white',
          'solid-secondary': 'bg-krds-gray-50 text-white',
          'solid-success': 'bg-krds-success-60 text-white',
          'solid-warning': 'bg-krds-warning-60 text-white',
          'solid-error': 'bg-krds-danger-60 text-white',
          'solid-info': 'bg-krds-info-40 text-white',
        },
        size: {
          md: 'text-[15px] h-8 px-3 rounded-[4px]',
          lg: 'text-[17px] h-8 px-2.5 rounded-[4px]',
        },
        shape: {
          rounded: '',
          pill: 'rounded-full',
          square: 'rounded-none',
        },
      },
      defaultVariants: {
        variant: 'primary',
        size: 'md',
        shape: 'rounded',
      },
    },
  )

  type BadgeVariant =
    | 'gray'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'purple'
    | 'orange'
    | 'outline-gray'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-warning'
    | 'outline-error'
    | 'outline-info'
    | 'solid-gray'
    | 'solid-primary'
    | 'solid-secondary'
    | 'solid-success'
    | 'solid-warning'
    | 'solid-error'
    | 'solid-info'

  const props = withDefaults(
    defineProps<{
      variant?: BadgeVariant
      size?: 'md' | 'lg'
      shape?: 'rounded' | 'pill' | 'square'
      class?: string
    }>(),
    {
      variant: 'primary',
      size: 'md',
      shape: 'pill',
    },
  )

  const classes = computed(() =>
    cn(
      badgeVariants({
        variant: props.variant,
        size: props.size,
        shape: props.shape,
      }),
      props.class,
    ),
  )
</script>

<template>
  <span :class="classes">
    <span v-if="$slots.iconLeft" class="mr-1 -ml-0.5" aria-hidden="true">
      <slot name="iconLeft" />
    </span>
    <slot />
    <span v-if="$slots.iconRight" class="-mr-0.5 ml-1" aria-hidden="true">
      <slot name="iconRight" />
    </span>
  </span>
</template>
