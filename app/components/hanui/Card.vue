<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-[16px] border border-krds-gray-30 bg-krds-white p-[var(--gap-layout-card-padding-large)] transition-all duration-200',
  {
    variants: {
      hoverable: {
        true: 'hover:shadow-xl hover:-translate-y-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-krds-primary-base',
        false: '',
      },
    },
    defaultVariants: {
      hoverable: false,
    },
  }
);

const props = withDefaults(
  defineProps<{
    hoverable?: boolean;
    clickable?: boolean;
    class?: string;
  }>(),
  {
    hoverable: false,
    clickable: false,
  }
);

const emit = defineEmits<{
  click: [];
}>();

const isClickable = computed(() => props.clickable || props.hoverable);

const classes = computed(() =>
  cn(
    cardVariants({
      hoverable: isClickable.value,
    }),
    props.class
  )
);

const handleClick = () => {
  if (isClickable.value) {
    emit('click');
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (isClickable.value && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    emit('click');
  }
};
</script>

<template>
  <div
    :class="classes"
    :role="isClickable ? 'button' : undefined"
    :tabindex="isClickable ? 0 : undefined"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot />
  </div>
</template>
