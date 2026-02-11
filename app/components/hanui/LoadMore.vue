<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';
import Icon from '@/components/hanui/Icon.vue';

interface Labels {
  loadMore?: string;
  loading?: string;
}

const props = withDefaults(
  defineProps<{
    currentPage: number;
    totalPages: number;
    hasMore?: boolean;
    isLoading?: boolean;
    labels?: Labels;
    class?: string;
  }>(),
  {
    hasMore: true,
    isLoading: false,
    labels: () => ({}),
  }
);

const emit = defineEmits<{
  loadMore: [];
}>();

const defaultLabels = {
  loadMore: '더보기',
  loading: '콘텐츠를 불러오는 중',
};

const mergedLabels = computed(() => ({ ...defaultLabels, ...props.labels }));

const handleLoadMore = () => {
  emit('loadMore');
};
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-2', props.class)">
    <button
      type="button"
      @click="handleLoadMore"
      :disabled="!hasMore || isLoading"
      :aria-busy="isLoading"
      :class="cn(
        'inline-flex items-center justify-center gap-1 rounded-[8px]',
        'h-12 w-full',
        'border border-krds-gray-30 bg-krds-white',
        'text-krds-gray-70 text-krds-body-sm font-medium tracking-[-0.32px] leading-[1.5]',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'hover:bg-krds-gray-5 hover:border-krds-gray-5'
      )"
      :aria-label="`${mergedLabels.loadMore} (${currentPage}/${totalPages})`"
    >
      <span>{{ isLoading ? mergedLabels.loading : mergedLabels.loadMore }}({{ currentPage }}/{{ totalPages }})</span>
      <Icon name="chevron-down" :size="16" class="text-krds-gray-50" aria-hidden="true" />
    </button>
  </div>
</template>
