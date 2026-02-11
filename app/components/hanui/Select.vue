<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { cn } from '~/lib/utils'
  import { FormFieldContextKey } from '@/composables/useFormField'

  const props = withDefaults(
    defineProps<{
      options: Record<string, any>[]
      modelValue?: string | string[]
      placeholder?: string
      disabled?: boolean
      disabledValues?: string[]
      readonly?: boolean
      status?: 'error' | 'success' | 'info'
      size?: 'lg' | 'md' | 'sm'
      label?: string
      labelKey?: string
      valueKey?: string
      class?: string
      multiple?: boolean
      multipleDisplayLimit?: number
    }>(),
    {
      placeholder: '선택하세요',
      disabled: false,
      disabledValues: () => [],
      readonly: false,
      size: 'md',
      labelKey: 'label',
      valueKey: 'value',
      multiple: false,
      multipleDisplayLimit: 2,
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: string | string[]]
  }>()

  // =====================================================================
  // VFormField 연동 (useField 값 · 에러 상태 · aria)
  // =====================================================================
  const formField = inject(FormFieldContextKey, null)

  // =====================================================================
  // 상태 관리
  // =====================================================================
  const isOpen = ref(false)
  const activeIndex = ref(-1)

  // 마우스 hover와 키보드 네비게이션을 구분하기 위한 플래그
  // 키보드로 이동 중일 때는 마우스 hover가 activeIndex를 변경하지 않도록 함
  const isKeyboardNavigating = ref(false)

  // =====================================================================
  // DOM 참조
  // =====================================================================
  const triggerRef = ref<HTMLButtonElement | null>(null)
  const containerRef = ref<HTMLDivElement | null>(null)
  const listboxRef = ref<HTMLDivElement | null>(null)

  // 각 옵션 DOM 요소 참조 - 방향키 이동 시 scrollIntoView에 사용
  const optionRefs = ref<(HTMLDivElement | null)[]>([])

  // =====================================================================
  // ARIA ID 생성
  // =====================================================================
  const instanceId = useId()
  const labelId = `${instanceId}-label`
  const buttonId = `${instanceId}-button`
  const listboxId = `${instanceId}-listbox`

  const effectiveStatus = computed(() => formField?.status ?? props.status)
  const effectiveId = computed(() => formField?.id ?? buttonId)
  const ariaDescribedBy = computed(() => {
    if (!formField) return undefined

    return formField.status === 'error' ? formField.errorId : undefined
  })

  // =====================================================================
  // 사이즈 클래스
  // =====================================================================
  const sizeClasses = {
    lg: 'h-14',
    md: 'h-12',
    sm: 'h-10',
  } as const

  // =====================================================================
  // 옵션 유틸리티 함수
  // =====================================================================
  const getOptionValue = (option: Record<string, any>) =>
    String(option?.[props.valueKey] ?? '')
  const getOptionLabel = (option: Record<string, any>) =>
    String(option?.[props.labelKey] ?? '')
  const isOptionDisabled = (option: Record<string, any>) =>
    props.disabledValues?.includes(getOptionValue(option)) ?? false

  // =====================================================================
  // Computed: 선택 상태
  // =====================================================================
  const selectedValues = computed<string[]>(() => {
    if (props.modelValue === null || props.modelValue === undefined) return []
    if (props.multiple) {
      return Array.isArray(props.modelValue)
        ? props.modelValue
        : [props.modelValue]
    }
    return [String(props.modelValue)]
  })

  const selectedOption = computed(() =>
    props.modelValue !== null &&
    props.modelValue !== undefined &&
    !props.multiple
      ? props.options.find(
          (opt) => getOptionValue(opt) === String(props.modelValue ?? ''),
        )
      : null,
  )

  const selectedOptions = computed(() =>
    props.options.filter((opt) =>
      selectedValues.value.includes(getOptionValue(opt)),
    ),
  )

  const isOptionSelected = (option: Record<string, any>) =>
    selectedValues.value.includes(getOptionValue(option))

  // =====================================================================
  // Computed: 표시 텍스트
  // =====================================================================
  const displayText = computed(() => {
    if (props.multiple) {
      const count = selectedOptions.value.length
      if (count === 0) return props.placeholder
      if (count <= props.multipleDisplayLimit) {
        return selectedOptions.value
          .map((opt) => getOptionLabel(opt))
          .join(', ')
      }
      return `${count}개 선택됨`
    }
    return selectedOption.value
      ? getOptionLabel(selectedOption.value)
      : props.placeholder
  })

  // =====================================================================
  // Computed: ARIA 속성
  // =====================================================================
  const optionIds = computed(() =>
    props.options.map((_, index) => `${listboxId}-option-${index}`),
  )

  // aria-activedescendant: 현재 활성화된 옵션의 ID
  // 실제 포커스는 트리거에 있지만, 스크린 리더에게 현재 위치를 알려줌
  const activeOptionId = computed(() =>
    isOpen.value && activeIndex.value >= 0
      ? optionIds.value[activeIndex.value]
      : undefined,
  )

  const triggerAriaLabel = computed(() => {
    if (props.label) return undefined
    if (!selectedOption.value) return `${props.placeholder} (선택되지 않음)`
    return getOptionLabel(selectedOption.value)
  })

  // =====================================================================
  // Computed: 스타일 클래스
  // =====================================================================
  const hasError = computed(() => effectiveStatus.value === 'error')

  const triggerClasses = computed(() =>
    cn(
      'flex w-full items-center justify-between rounded-[8px] border bg-krds-white px-4 text-[16px] leading-[150%] tracking-[-0.32px] transition-colors relative cursor-pointer',
      sizeClasses[props.size],
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60 focus-visible:ring-offset-2',
      hasError.value
        ? 'border-krds-danger-60 focus-visible:border-krds-danger-60 focus-visible:ring-krds-danger-60'
        : 'border-krds-gray-30 focus:border-krds-primary-60 focus-visible:border-krds-primary-60',
      props.disabled && '!cursor-not-allowed bg-krds-gray-10 text-krds-gray-50',
      props.readonly &&
        '!cursor-default bg-krds-gray-10 text-krds-gray-80 font-semibold',
    ),
  )

  const dropdownClasses = computed(() =>
    cn(
      'hanui-select-dropdown absolute z-50 min-w-[8rem] w-full max-h-[248px] overflow-y-auto rounded-[8px] border border-krds-gray-30 bg-krds-white text-[16px] leading-[150%] tracking-[-0.32px] mt-1 py-1',
    ),
  )

  // =====================================================================
  // 옵션 클래스 - 마우스 hover와 키보드 포커스 스타일 분리
  // =====================================================================
  const getOptionClasses = (option: Record<string, any>, index: number) => {
    const isSelected = isOptionSelected(option)
    const isActive = activeIndex.value === index
    const isDisabled = isOptionDisabled(option)

    return cn(
      'relative flex h-12 cursor-pointer select-none items-center px-4 outline-none font-medium transition-colors',
      // 비활성화 스타일
      isDisabled && 'pointer-events-none opacity-50',
      // 선택된 항목 스타일
      isSelected && 'text-krds-primary-70 font-semibold',
      // 키보드 네비게이션 활성 스타일 - 마우스 hover보다 우선
      isActive && 'bg-krds-primary-5 text-krds-primary-70',
      // 마우스 hover 스타일 - 키보드 네비게이션 중이 아닐 때만
      !isActive && !isKeyboardNavigating.value && 'hover:bg-krds-gray-5',
    )
  }

  // =====================================================================
  // 인덱스 네비게이션 헬퍼
  // =====================================================================
  const getNextEnabledIndex = (startIndex: number, step: 1 | -1) => {
    const last = props.options.length - 1
    let idx = startIndex
    while (idx >= 0 && idx <= last) {
      if (!isOptionDisabled(props.options[idx] ?? {})) return idx
      idx += step
    }
    return -1
  }

  const setInitialActiveIndex = () => {
    // 이미 선택된 값이 있으면 그 위치로, 없으면 첫 번째 활성화된 옵션으로
    const selectedIndex = props.options.findIndex(
      (opt) => getOptionValue(opt) === String(props.modelValue ?? ''),
    )
    const fallback = selectedIndex >= 0 ? selectedIndex : 0
    const next = getNextEnabledIndex(fallback, 1)
    activeIndex.value = next >= 0 ? next : -1
  }

  // =====================================================================
  // 스크롤 동기화
  // activeIndex 변경 시 해당 옵션이 보이도록 스크롤
  // =====================================================================
  const scrollToActiveOption = () => {
    nextTick(() => {
      const optionEl = optionRefs.value[activeIndex.value]
      if (optionEl) {
        // 'nearest': 이미 보이면 스크롤하지 않고, 안 보이면 최소한으로 스크롤
        optionEl.scrollIntoView({ block: 'nearest' })
      }
    })
  }

  // =====================================================================
  // 드롭다운 열기/닫기
  // =====================================================================
  const openDropdown = () => {
    if (props.disabled || props.readonly) return
    isOpen.value = true
    isKeyboardNavigating.value = false
    setInitialActiveIndex()

    // 열릴 때 선택된 옵션으로 스크롤
    nextTick(() => {
      scrollToActiveOption()
    })
  }

  const closeDropdown = (restoreFocus = true) => {
    isOpen.value = false
    isKeyboardNavigating.value = false
    activeIndex.value = -1
    formField?.handleBlur?.()

    // Escape로 닫을 때는 트리거로 포커스 복귀
    // Tab으로 닫을 때는 브라우저 기본 동작에 맡김
    if (restoreFocus) {
      nextTick(() => triggerRef.value?.focus())
    }
  }

  // =====================================================================
  // 옵션 선택 처리
  // =====================================================================
  const handleSelect = (option: Record<string, any>) => {
    if (isOptionDisabled(option)) return
    const value = getOptionValue(option)

    if (props.multiple) {
      const currentValues = [...selectedValues.value]
      const index = currentValues.indexOf(value)
      if (index > -1) {
        currentValues.splice(index, 1)
      } else {
        currentValues.push(value)
      }
      formField?.setValue?.(currentValues)
      emit('update:modelValue', currentValues)
      // 멀티 선택은 드롭다운 유지
    } else {
      formField?.setValue?.(value)
      emit('update:modelValue', value)
      closeDropdown()
    }
  }

  // =====================================================================
  // 키보드 이벤트 핸들러
  // 핵심: 실제 포커스는 트리거에만 있고, 방향키는 activeIndex만 변경
  // =====================================================================
  const handleKeyDown = (e: KeyboardEvent) => {
    if (props.disabled || props.readonly) return

    // Tab: 컴포넌트 탈출 - 드롭다운 닫고 브라우저 기본 동작에 맡김
    if (e.key === 'Tab') {
      if (isOpen.value) {
        // Tab으로 닫을 때는 포커스 복귀하지 않음 (브라우저가 다음 요소로 이동)
        closeDropdown(false)
      }
      // e.preventDefault() 하지 않음 - 브라우저 기본 Tab 동작 허용
      return
    }

    // Escape: 드롭다운 닫고 트리거로 포커스 복귀
    if (e.key === 'Escape') {
      if (isOpen.value) {
        e.preventDefault()
        closeDropdown(true)
      }
      return
    }

    // Enter / Space: 드롭다운 열기 또는 현재 활성 옵션 선택
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!isOpen.value) {
        openDropdown()
        return
      }
      const option = props.options[activeIndex.value]
      if (option) handleSelect(option)
      return
    }

    // ArrowDown: 드롭다운 열기 또는 다음 옵션으로 이동
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      isKeyboardNavigating.value = true

      if (!isOpen.value) {
        openDropdown()
        return
      }

      const next = getNextEnabledIndex(activeIndex.value + 1, 1)
      if (next >= 0) {
        activeIndex.value = next
        scrollToActiveOption()
      }
      return
    }

    // ArrowUp: 이전 옵션으로 이동
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      isKeyboardNavigating.value = true

      if (!isOpen.value) {
        openDropdown()
        return
      }

      const next = getNextEnabledIndex(activeIndex.value - 1, -1)
      if (next >= 0) {
        activeIndex.value = next
        scrollToActiveOption()
      }
      return
    }

    // Home: 첫 번째 옵션으로 이동
    if (e.key === 'Home' && isOpen.value) {
      e.preventDefault()
      isKeyboardNavigating.value = true
      const first = getNextEnabledIndex(0, 1)
      if (first >= 0) {
        activeIndex.value = first
        scrollToActiveOption()
      }
      return
    }

    // End: 마지막 옵션으로 이동
    if (e.key === 'End' && isOpen.value) {
      e.preventDefault()
      isKeyboardNavigating.value = true
      const last = getNextEnabledIndex(props.options.length - 1, -1)
      if (last >= 0) {
        activeIndex.value = last
        scrollToActiveOption()
      }
    }
  }

  // =====================================================================
  // 마우스 이벤트 핸들러
  // =====================================================================
  const handleMouseEnter = (index: number) => {
    // 키보드 네비게이션 중이 아닐 때만 마우스로 activeIndex 변경
    if (!isKeyboardNavigating.value) {
      activeIndex.value = index
    }
  }

  const handleMouseMove = () => {
    // 마우스가 움직이면 키보드 네비게이션 모드 해제
    isKeyboardNavigating.value = false
  }

  // =====================================================================
  // 외부 클릭 감지
  // =====================================================================
  const handleClickOutside = (event: MouseEvent) => {
    if (!isOpen.value) return
    const target = event.target as Node | null
    if (containerRef.value && target && containerRef.value.contains(target))
      return
    closeDropdown(false)
  }

  // =====================================================================
  // 라이프사이클
  // =====================================================================
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })

  // options 변경 시 activeIndex 재설정
  watch(
    () => props.options,
    () => {
      if (isOpen.value) setInitialActiveIndex()
    },
  )

  // optionRefs 배열 크기 동기화
  watch(
    () => props.options.length,
    (len) => {
      optionRefs.value = Array(len).fill(null)
    },
    { immediate: true },
  )

  // useField와 v-model 양방향 동기화: 부모/폼에서 modelValue 변경 시 setValue
  watch(
    () => props.modelValue,
    (newVal) => {
      if (typeof window === 'undefined') return
      formField?.setValue?.(newVal)
    },
    { immediate: true },
  )

  // useField 값 변경 시(예: setValues) v-model로 부모에 반영
  watch(
    () => formField?.value,
    (newValue) => {
      if (typeof window === 'undefined') return
      if (newValue !== props.modelValue) emit('update:modelValue', newValue)
    },
  )
</script>

<template>
  <div ref="containerRef" :class="cn('relative', props.class)">
    <!-- Label -->
    <label
      v-if="label"
      :id="labelId"
      class="text-krds-body-sm text-krds-gray-70 mb-1 block leading-[150%] font-medium"
    >
      {{ label }}
    </label>

    <!-- Trigger Button -->
    <!-- 실제 포커스는 여기에만 존재 -->
    <!-- aria-activedescendant로 현재 활성 옵션을 스크린 리더에 전달 -->
    <button
      :id="effectiveId"
      ref="triggerRef"
      type="button"
      :class="triggerClasses"
      :disabled="disabled"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-controls="listboxId"
      :aria-labelledby="label ? `${labelId} ${effectiveId}` : undefined"
      :aria-label="triggerAriaLabel"
      :aria-describedby="ariaDescribedBy"
      :aria-invalid="hasError ? true : undefined"
      :aria-activedescendant="activeOptionId"
      :aria-readonly="props.readonly ? 'true' : undefined"
      role="combobox"
      @click="isOpen ? closeDropdown() : openDropdown()"
      @keydown="handleKeyDown"
    >
      <span
        :class="
          (multiple ? selectedOptions.length === 0 : !selectedOption) &&
          'text-krds-gray-60'
        "
      >
        {{ displayText }}
      </span>
      <Icon
        name="chevron-down"
        :size="20"
        :class="[
          'text-krds-gray-80 absolute top-1/2 right-4 -translate-y-1/2 transition-transform duration-200',
          isOpen ? 'rotate-180' : '',
        ]"
        aria-hidden="true"
      />
    </button>

    <!-- Dropdown -->
    <Transition name="slide-down">
      <div
        v-if="isOpen"
        :id="listboxId"
        ref="listboxRef"
        :class="dropdownClasses"
        role="listbox"
        :aria-labelledby="label ? labelId : undefined"
        :aria-label="!label ? placeholder : undefined"
        :aria-multiselectable="multiple ? 'true' : undefined"
        tabindex="-1"
        @mousemove="handleMouseMove"
      >
        <div
          v-for="(option, index) in options"
          :id="optionIds[index]"
          :key="getOptionValue(option)"
          :ref="(el) => (optionRefs[index] = el as HTMLDivElement)"
          :class="getOptionClasses(option, index)"
          role="option"
          :aria-selected="isOptionSelected(option)"
          :aria-disabled="isOptionDisabled(option)"
          tabindex="-1"
          @mousedown.prevent
          @click="handleSelect(option)"
          @mouseenter="handleMouseEnter(index)"
        >
          <!-- 멀티 선택 체크박스 -->
          <span
            v-if="multiple"
            :class="
              cn(
                'mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                isOptionSelected(option)
                  ? 'border-krds-primary-60 bg-krds-primary-60 text-white'
                  : 'border-krds-gray-40 bg-white',
              )
            "
          >
            <Icon v-if="isOptionSelected(option)" name="check" :size="16" />
          </span>
          {{ getOptionLabel(option) }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  /* Slide down 애니메이션 */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition:
      opacity 150ms ease,
      transform 150ms ease;
    transform-origin: top center;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-8px);
  }

  .slide-down-enter-to,
  .slide-down-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  /* 스크롤바 스타일링 */
  .hanui-select-dropdown {
    scrollbar-width: thin;
    scrollbar-color: var(--color-krds-gray-30) transparent;
  }

  .hanui-select-dropdown::-webkit-scrollbar {
    width: 8px;
  }

  .hanui-select-dropdown::-webkit-scrollbar-track {
    background: transparent;
  }

  .hanui-select-dropdown::-webkit-scrollbar-thumb {
    background-color: var(--color-krds-gray-30);
    border-radius: 9999px;
  }

  .hanui-select-dropdown::-webkit-scrollbar-button {
    display: none;
  }
</style>
