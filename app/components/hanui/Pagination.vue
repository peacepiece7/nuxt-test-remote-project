<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { cn } from '@/lib/utils'
  import Icon from '@/components/hanui/Icon.vue'

  interface Labels {
    first?: string
    previous?: string
    next?: string
    last?: string
    page?: string
  }

  const props = withDefaults(
    defineProps<{
      /** 표현 방식 (현재는 default만 지원) */
      variant?: 'default'
      /** 현재 페이지 (v-model) */
      currentPage: number
      /** 총 페이지 수 */
      totalPages: number
      /** 현재 페이지 양 옆 표시 개수 */
      siblingCount?: number
      /** 처음/마지막 버튼 표시 */
      showFirstLast?: boolean
      /** 이전/다음 버튼 표시 */
      showPreviousNext?: boolean
      /** 버튼 라벨 문구 재정의 */
      labels?: Labels
      /** 래퍼 추가 클래스 */
      class?: string
    }>(),
    {
      variant: 'default',
      siblingCount: 1,
      showFirstLast: true,
      showPreviousNext: true,
      labels: () => ({}),
    },
  )

  const emit = defineEmits<{
    'update:currentPage': [page: number]
    pageChange: [page: number]
  }>()

  const defaultLabels = {
    first: '처음',
    previous: '이전',
    next: '다음',
    last: '마지막',
    page: '페이지',
  }

  const mergedLabels = computed(() => ({ ...defaultLabels, ...props.labels }))

  const announceMessage = ref('')

  function generatePaginationRange(
    currentPage: number,
    totalPages: number,
    siblingCount: number,
  ): (number | 'ellipsis')[] {
    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftEllipsis = leftSiblingIndex > 2
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1

    if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
      return [...leftRange, 'ellipsis', totalPages]
    }

    if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      )
      return [1, 'ellipsis', ...rightRange]
    }

    if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      )
      return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages]
    }

    return []
  }

  const paginationRange = computed(() =>
    generatePaginationRange(
      props.currentPage,
      props.totalPages,
      props.siblingCount,
    ),
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
      emit('update:currentPage', page)
      emit('pageChange', page)
      announceMessage.value = `${page} 페이지로 이동했습니다`
    }
  }

  const isFirstPage = computed(() => props.currentPage === 1)
  const isLastPage = computed(() => props.currentPage === props.totalPages)

  const buttonClass = computed(() =>
    cn(
      'inline-flex items-center justify-center',
      'min-w-[2.5rem] h-10 px-3',
      'font-medium',
      'rounded-md',
      'transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-50 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
    ),
  )

  const activeClass = 'bg-krds-gray-80 text-krds-white font-semibold'
  const inactiveClass =
    'bg-krds-white text-krds-gray-90 hover:bg-[#e7e9e9] hover:text-krds-gray-90 hover:font-semibold cursor-pointer'
</script>

<template>
  <div :class="cn('flex flex-col items-center gap-2', props.class)">
    <nav
      role="navigation"
      aria-label="페이지 이동"
      class="flex items-center justify-center gap-1"
    >
      <button
        v-if="showFirstLast"
        type="button"
        @click="handlePageChange(1)"
        :disabled="isFirstPage"
        :aria-disabled="isFirstPage"
        :aria-label="`${mergedLabels.first} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        <Icon name="chevron-left-double" :size="20" class="mr-[5px]" />
        {{ mergedLabels.first }}
      </button>

      <button
        v-if="showPreviousNext"
        type="button"
        @click="handlePageChange(currentPage - 1)"
        :disabled="isFirstPage"
        :aria-disabled="isFirstPage"
        :aria-label="`${mergedLabels.previous} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        <Icon name="chevron-left" :size="20" class="mr-[5px]" />
        {{ mergedLabels.previous }}
      </button>

      <template
        v-for="(pageNumber, index) in paginationRange"
        :key="`page-${index}`"
      >
        <span
          v-if="pageNumber === 'ellipsis'"
          class="text-krds-gray-60 inline-flex h-10 w-10 items-center justify-center"
          aria-hidden="true"
        >
          ...
          <span class="sr-only">생략된 페이지 구간</span>
        </span>
        <button
          v-else
          type="button"
          @click="handlePageChange(pageNumber as number)"
          :aria-current="currentPage === pageNumber ? 'page' : undefined"
          :aria-label="`${mergedLabels.page} ${pageNumber}`"
          :class="
            cn(
              buttonClass,
              currentPage === pageNumber ? activeClass : inactiveClass,
            )
          "
        >
          {{ pageNumber }}
        </button>
      </template>

      <button
        v-if="showPreviousNext"
        type="button"
        @click="handlePageChange(currentPage + 1)"
        :disabled="isLastPage"
        :aria-disabled="isLastPage"
        :aria-label="`${mergedLabels.next} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        {{ mergedLabels.next }}
        <Icon name="chevron-right" :size="20" class="ml-[5px]" />
      </button>

      <button
        v-if="showFirstLast"
        type="button"
        @click="handlePageChange(totalPages)"
        :disabled="isLastPage"
        :aria-disabled="isLastPage"
        :aria-label="`${mergedLabels.last} ${mergedLabels.page}`"
        :class="cn(buttonClass, inactiveClass)"
      >
        {{ mergedLabels.last }}
        <Icon name="chevron-right-double" :size="20" class="ml-[5px]" />
      </button>
    </nav>

    <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
      {{ announceMessage }}
    </div>
  </div>
</template>
