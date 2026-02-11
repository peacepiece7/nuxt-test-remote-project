<script setup lang="ts">
/**
 * Tag 컴포넌트
 * KRDS 태그 - 콘텐츠를 분류하거나 필터링하는데 사용
 */
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import Icon from '@/components/hanui/Icon.vue';
import { cn } from '@/lib/utils';

export type TagVariant = 'default' | 'card' | 'search';
export type TagData = {
  label: string;
  value: string;
};

const props = withDefaults(
  defineProps<{
    /** 태그 스타일 변형 */
    variant?: TagVariant;
    /** 데이터 바인딩 (label/value) */
    data?: TagData;
    /** 추가 클래스 */ 
    class?: string;
  }>(),
  {
    variant: 'default',
  }
);

const emit = defineEmits<{
  /** search 아이콘 클릭 */
  (e: 'searchIconClick', data?: TagData): void;
}>();

const tagVariants = cva('inline-flex items-center border', {
  variants: {
    variant: {
      default:
        'bg-krds-gray-5 text-krds-gray-80 border-krds-gray-30 rounded-[40px] h-8 px-2 text-[14px] leading-[1.5] tracking-[-0.28px] font-medium lg:px-3 lg:text-krds-body-sm lg:tracking-[-0.32px]',
      card:
        'bg-krds-white text-krds-gray-80 border-krds-gray-30 rounded-[1000px] h-10 px-4 text-[14px] tracking-[-0.28px] font-semibold',
      search:
        'bg-krds-gray-10 text-krds-gray-80 rounded-[1000px] pl-3 pr-2 py-2 leading-[1.5] tracking-[-0.32px] font-normal gap-1.5 border-0 hover:bg-krds-white hover:shadow-[inset_0_0_0_1px_var(--color-krds-gray-30)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const classes = computed(() =>
  cn(tagVariants({ variant: props.variant }), props.class)
);
</script>

<template>
  <span :class="classes">
    <slot>{{ props.data?.label }}</slot>
    <button
      v-if="props.variant === 'search'"
      type="button"
      class="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      aria-label="닫기"
      @click="emit('searchIconClick', props.data)"
    >
      <Icon
        name="close"
        :size="16"
        class="h-[15px] w-[15px] text-krds-gray-80"
        aria-hidden="true"
      />
    </button>
  </span>
</template>
