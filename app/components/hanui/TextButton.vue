<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import Icon from '@/components/hanui/Icon.vue';
import type { IconName } from '~/types/icon-font';
import { cn } from '@/lib/utils';

const textButtonVariants = cva(
  'inline-flex cursor-pointer items-center text-(--color-neutral-title) gap-1 rounded-[4px] px-0.5 font-semibold underline underline-offset-2 transition-colors hover:bg-[#181e250d] active:text-krds-primary-80 active:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2 disabled:text-krds-gray-50 disabled:pointer-events-none',
  {
    variants: {
      size: {
        sm: 'text-(length:--krds-body-xxs) leading-[1.5] tracking-[-0.32px]',
        md: 'text-(length:--krds-body-sm) leading-[1.5] tracking-[-0.32px]',
        lg: 'leading-[1.5] tracking-[-0.32px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    icon?: IconName;
    disabled?: boolean;
    class?: string;
    iconColor?: string;
  }>(),
  {
    size: 'md',
    disabled: false,
  }
);

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const classes = computed(() =>
  cn(textButtonVariants({ size: props.size }), props.class)
);

</script>

<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
    <Icon
      v-if="props.icon"
      :name="props.icon"
      :size="16"
      :color="props.disabled ? 'text-krds-gray-50' :props.iconColor"
      aria-hidden="true"
    />
  </button>
</template>
