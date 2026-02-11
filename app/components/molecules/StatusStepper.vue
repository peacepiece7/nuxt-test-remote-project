<script setup lang="ts">
  import { computed } from 'vue'
  import { cva } from 'class-variance-authority'

  export type StatusStep = {
    step: number
    title: string
  }

  type Props = {
    steps: StatusStep[]
    /** 0-based */
    modelValue: number
    /** 읽기 전용 모드 (기본값: true, 클릭 불가) */
    readonly?: boolean
    /** 반려된 step index 목록 (0-based) */
    rejectedIndices?: number[]
  }

  const props = withDefaults(defineProps<Props>(), {
    readonly: true,
    rejectedIndices: () => [],
  })
  const emit = defineEmits<{
    (e: 'update:modelValue' | 'click', value: number): void
  }>()

  const current = computed(() => props.modelValue)

  const isDisabled = computed(() => props.readonly)

  const onStepClick = (index: number) => {
    if (isDisabled.value) return
    emit('click', index)
    emit('update:modelValue', index)
  }

  // 스텝 상태 결정
  const getStepState = (index: number) => {
    if (props.rejectedIndices?.includes(index)) {
      return 'rejected'
    }
    if (index < current.value) {
      return 'done'
    }
    if (index === current.value) {
      return 'active'
    }
    return 'pending'
  }

  // 버튼 배경 및 테두리 스타일 (cva) — @theme 기준 Tailwind 색상
  // 모든 state에 border-2 + border-color 명시 → 전환 시 브라우저 기본(검정) 미적용
  const buttonVariants = cva(
    'flex items-center gap-4 pl-2 pr-4 py-2 rounded-full w-[144px] border-2 transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-45',
    {
      variants: {
        state: {
          done: 'bg-primary-700 border-primary-700',
          active: 'bg-white border-primary-700',
          rejected: 'bg-white border-functional-negative',
          pending: 'bg-grey-100 border-grey-100',
        },
        readonly: {
          true: 'cursor-default',
          false: 'cursor-pointer',
        },
      },
      defaultVariants: {
        state: 'pending',
        readonly: true,
      },
    },
  )

  // 숫자 배지 스타일 (cva) — active: 배지 흰색 텍스트, @theme 기준 Tailwind 색상
  const numBadgeVariants = cva(
    'flex items-center justify-center rounded-full size-10 text-xl font-semibold leading-[1.5] tracking-[-0.4px] transition-colors duration-300 ease-in-out',
    {
      variants: {
        state: {
          done: 'bg-white text-primary-700',
          active: 'bg-primary-700 text-white',
          rejected: 'bg-functional-negative text-white',
          pending: 'bg-grey-200 text-text-disabled',
        },
      },
      defaultVariants: {
        state: 'pending',
      },
    },
  )

  // 텍스트 스타일 (cva) — active: 파란색, @theme 기준 Tailwind 색상
  const textVariants = cva(
    'text-xl font-medium leading-[1.5] tracking-[-0.4px] transition-colors duration-300 ease-in-out',
    {
      variants: {
        state: {
          done: 'text-white font-bold',
          active: 'text-primary-700 font-bold',
          rejected: 'text-functional-negative',
          pending: 'text-text-disabled',
        },
      },
      defaultVariants: {
        state: 'pending',
      },
    },
  )

  const getButtonClass = (index: number) =>
    buttonVariants({
      state: getStepState(index) as 'done' | 'active' | 'rejected' | 'pending',
      readonly: isDisabled.value,
    })

  const getNumBadgeClass = (index: number) =>
    numBadgeVariants({
      state: getStepState(index) as 'done' | 'active' | 'rejected' | 'pending',
    })

  const getTextClass = (index: number) =>
    textVariants({
      state: getStepState(index) as 'done' | 'active' | 'rejected' | 'pending',
    })

  // Divider 색상 결정 — @theme 기준 Tailwind 색상
  const getDividerColorClass = (index: number) => {
    const isCurrentDone = index < current.value
    const isNextDone = index + 1 < current.value
    const isNextActive = index + 1 === current.value

    // 완료된 스텝 사이 또는 완료-현재 스텝 사이는 파란색
    if (isCurrentDone && (isNextDone || isNextActive)) {
      return 'text-primary-600'
    }
    return 'text-grey-600'
  }
</script>

<template>
  <nav class="w-full" aria-label="신청 단계">
    <ol class="m-0 flex list-none items-center gap-4 p-0">
      <template v-for="(s, i) in props.steps" :key="s.step">
        <!-- Step item -->
        <li class="flex items-center">
          <button
            type="button"
            :class="getButtonClass(i)"
            :aria-current="i === current ? 'step' : undefined"
            :aria-label="`${s.step}단계: ${s.title}`"
            :aria-disabled="isDisabled ? 'true' : undefined"
            @click="onStepClick(i)"
          >
            <!-- 숫자 배지 -->
            <div :class="getNumBadgeClass(i)">
              {{ s.step }}
            </div>
            <!-- 텍스트 -->
            <span :class="getTextClass(i)">
              {{ s.title }}
            </span>
          </button>
        </li>

        <!-- Divider -->
        <div
          v-if="i < props.steps.length - 1"
          class="flex h-0 w-16 items-center justify-center"
        >
          <svg
            class="pointer-events-none h-[3px] w-full flex-shrink transition-colors duration-300 ease-in-out"
            viewBox="0 0 67 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            :class="getDividerColorClass(i)"
          >
            <path
              d="M1.5 1.5H65.5"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="0.1 8"
            />
          </svg>
        </div>
      </template>
    </ol>
  </nav>
</template>
