<script setup lang="ts">
  import { computed } from 'vue'
  import { cva } from 'class-variance-authority'

  export type ProgressStep = {
    step: number
    title: string
  }

  type Props = {
    steps: ProgressStep[]
    /** 0-based */
    current: number
    /** 반려 상태 (true일 경우 빨간색 표시) */
    reject?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    reject: false,
  })

  const currentStep = computed(() => props.current + 1)
  const totalSteps = computed(() => props.steps.length)
  const currentStepData = computed(() => props.steps[props.current])
  const nextStepData = computed(() => {
    const nextIndex = props.current + 1
    return nextIndex < props.steps.length ? props.steps[nextIndex] : null
  })
  const previousStepData = computed(() => {
    const prevIndex = props.current - 1
    return prevIndex >= 0 ? props.steps[prevIndex] : null
  })

  // 진행률 계산 (0-100)
  const progress = computed(() => {
    if (totalSteps.value === 0) return 0
    return (currentStep.value / totalSteps.value) * 100
  })

  // 원형 progress의 stroke-dasharray 계산
  const circumference = computed(() => 2 * Math.PI * 18) // 반지름 18 (크기 40의 절반 - stroke-width 4)
  const strokeDashoffset = computed(() => {
    return circumference.value - (progress.value / 100) * circumference.value
  })

  // SVG stroke 색상 — @theme 기준 Tailwind stroke-* 클래스
  const getProgressStrokeClass = computed(() =>
    props.reject ? 'stroke-functional-negative' : 'stroke-primary-700',
  )
  const getBorderStrokeClass = computed(() =>
    props.reject ? 'stroke-functional-negative' : 'stroke-grey-300',
  )

  // 텍스트 스타일 variants — @theme 기준 Tailwind 색상
  const countTextVariants = cva('text-xs leading-[1.5] font-medium', {
    variants: {
      reject: {
        true: 'text-functional-negative',
        false: 'text-grey-700',
      },
    },
    defaultVariants: {
      reject: false,
    },
  })

  const currentLabelVariants = cva(
    'text-xl leading-[1.5] font-medium tracking-[-0.4px]',
    {
      variants: {
        reject: {
          true: 'text-functional-negative',
          false: 'text-grey-900',
        },
      },
      defaultVariants: {
        reject: false,
      },
    },
  )
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- 원형 Progress Indicator -->
    <div class="relative shrink-0">
      <svg class="size-10 -rotate-90" viewBox="0 0 40 40">
        <!-- 배경 원 (회색) -->
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          :class="getBorderStrokeClass"
          stroke-width="4"
        />
        <!-- 진행 원 (primary 또는 빨간색) -->
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          :class="[getProgressStrokeClass, 'transition-all duration-300 ease-in-out']"
          stroke-width="4"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
        />
      </svg>
      <!-- 중앙 텍스트 (현재 단계 / 총 단계) -->
      <div class="absolute inset-0 flex items-center justify-center">
        <span :class="countTextVariants({ reject: props.reject })">
          {{ currentStep }} / {{ totalSteps }}
        </span>
      </div>
    </div>

    <!-- 라벨 영역 -->
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <!-- 현재 단계 라벨 -->
      <div :class="currentLabelVariants({ reject: props.reject })">
        {{ currentStepData?.title }}
      </div>
      <!-- 다음 단계 라벨 또는 이전 단계 라벨 -->
      <div
        v-if="nextStepData"
        class="text-sm leading-[1.5] tracking-[-0.4px] text-grey-600"
      >
        다음: {{ nextStepData.title }}
      </div>
      <div
        v-else-if="previousStepData"
        class="text-sm leading-[1.5] tracking-[-0.4px] text-grey-600"
      >
        이전: {{ previousStepData.title }}
      </div>
    </div>
  </div>
</template>
