<script setup lang="ts">
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const headingVariants = cva('font-bold text-krds-gray-90 leading-[1.5]', {
  variants: {
    level: {
      h1: 'text-krds-title-xl tracking-[-0.84px]',
      h2: 'text-krds-title-lg tracking-[-0.56px]',
      h3: 'text-krds-title-md tracking-[-0.48px]',
      h4: 'text-krds-title-sm tracking-[-0.4px]',
      h5: 'text-krds-title-xs tracking-[-0.36px]',
    },
  },
  defaultVariants: {
    level: 'h2',
  },
});

const props = withDefaults(
  defineProps<{
    level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    id?: string;
    class?: string;
  }>(),
  {
    level: 'h2',
  }
);

const headingId = computed(() => {
  if (props.id) return props.id;
  // Try to generate ID from slot content (only works for simple text)
  return '';
});

const classes = computed(() => cn(headingVariants({ level: props.level }), props.class));
</script>

<template>
  <h1 v-if="level === 'h1'" :id="headingId || undefined" :class="classes">
    <slot />
  </h1>
  <h2 v-else-if="level === 'h2'" :id="headingId || undefined" :class="classes">
    <slot />
  </h2>
  <h3 v-else-if="level === 'h3'" :id="headingId || undefined" :class="classes">
    <slot />
  </h3>
  <h4 v-else-if="level === 'h4'" :id="headingId || undefined" :class="classes">
    <slot />
  </h4>
  <h5 v-else-if="level === 'h5'" :id="headingId || undefined" :class="classes">
    <slot />
  </h5>
  <h2 v-else :id="headingId || undefined" :class="classes">
    <slot />
  </h2>
</template>
