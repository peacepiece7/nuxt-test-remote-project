<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted } from 'vue'
  import { cva } from 'class-variance-authority'
  import { cn } from '@/lib/utils'

  const tooltipVariants = cva(
    'absolute z-50 px-3 py-1 text-sm shadow-lg pointer-events-none w-max max-w-xs break-words animate-in fade-in-0 zoom-in-95',
    {
      variants: {
        variant: {
          default: 'bg-krds-gray-90 text-white',
          light: 'bg-white text-krds-gray-90 border border-krds-gray-20',
        },
        position: {
          /* 꼬리표: 아래쪽 가리킴 (툴팁이 위에 있을 때) */
          top: 'bottom-full left-1/2 -translate-x-1/2 mb-2 before:content-[""] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:size-0 before:border-[6px] before:border-transparent',
          /* 꼬리표: 위쪽 가리킴 */
          bottom:
            'top-full left-1/2 -translate-x-1/2 mt-2 before:content-[""] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:size-0 before:border-[6px] before:border-transparent',
        },
      },
      compoundVariants: [
        /* default: 꼬리표 색 = 툴팁 배경(진한 회색) */
        {
          variant: 'default',
          position: 'top',
          class: 'before:!border-t-krds-gray-90',
        },
        {
          variant: 'default',
          position: 'bottom',
          class: 'before:!border-b-krds-gray-90',
        },
        /* light: 꼬리표 색 = 툴팁 배경(흰색) */
        { variant: 'light', position: 'top', class: 'before:!border-t-white' },
        {
          variant: 'light',
          position: 'bottom',
          class: 'before:!border-b-white',
        },
      ],
      defaultVariants: {
        variant: 'default',
        position: 'top',
      },
    },
  )

  const props = withDefaults(
    defineProps<{
      content: string
      variant?: 'default' | 'light'
      position?: 'top' | 'bottom'
      delay?: number
      disabled?: boolean
      autoPosition?: boolean
      class?: string
      wrapperClass?: string
    }>(),
    {
      variant: 'default',
      position: 'top',
      delay: 200,
      disabled: false,
      autoPosition: true,
    },
  )

  const isVisible = ref(false)
  const autoPos = ref<'top' | 'bottom'>('top')
  const wrapperRef = ref<HTMLDivElement | null>(null)
  const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const calculatePosition = () => {
    if (!wrapperRef.value || !props.autoPosition) return

    const rect = wrapperRef.value.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const elementCenter = rect.left + rect.width / 2

    if (elementCenter > viewportWidth / 2) {
      autoPos.value = 'top'
    } else {
      autoPos.value = 'bottom'
    }
  }

  const handleShow = () => {
    if (props.disabled) return

    calculatePosition()

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      isVisible.value = true
    }, props.delay)
  }

  const handleHide = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    isVisible.value = false
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isVisible.value) {
      handleHide()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })

  const finalPosition = computed(
    () => props.position || (props.autoPosition ? autoPos.value : 'top'),
  )

  const tooltipClasses = computed(() =>
    cn(
      tooltipVariants({
        variant: props.variant,
        position: finalPosition.value,
      }),
      props.class,
    ),
  )

  /** 싱글 라인(content에 \n 없음)일 때만 rounded-full */
  const isSingleLine = computed(() => !props.content.includes('\n'))

  /** position에 따른 등장/퇴장 방향 클래스 */
  const transitionEnterFromClass = computed(() =>
    finalPosition.value === 'top'
      ? 'opacity-0 translate-y-2'
      : 'opacity-0 -translate-y-2',
  )
  const transitionLeaveToClass = computed(() =>
    finalPosition.value === 'top'
      ? 'opacity-0 translate-y-2'
      : 'opacity-0 -translate-y-2',
  )
</script>

<template>
  <div
    ref="wrapperRef"
    :class="cn('relative inline-block self-start', wrapperClass)"
    @mouseenter="handleShow"
    @mouseleave="handleHide"
    @focus="handleShow"
    @blur="handleHide"
  >
    <slot />

    <Transition
      enter-active-class="transition ease-out duration-200"
      :enter-from-class="transitionEnterFromClass"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      :leave-to-class="transitionLeaveToClass"
    >
      <div
        v-if="isVisible && !disabled"
        :id="tooltipId"
        role="tooltip"
        :class="[
          tooltipClasses,
          'whitespace-pre-line',
          isSingleLine ? 'rounded-full' : 'rounded-md',
        ]"
      >
        {{ content }}
      </div>
    </Transition>
  </div>
</template>
