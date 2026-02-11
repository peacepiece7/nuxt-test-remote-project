<script setup lang="ts">
  import { computed, inject, ref } from 'vue'
  import { cva } from 'class-variance-authority'
  import { cn } from '@/lib/utils'
  import Icon from '@/components/hanui/Icon.vue'
  import { FormFieldContextKey } from '@/composables/useFormField'

  const inputVariants = cva(
    'flex w-full rounded-[8px] border border-krds-gray-30 bg-krds-white font-medium tracking-[-0.32px] transition-colors placeholder:text-krds-gray-60 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60 focus-visible:ring-offset-2 focus-visible:border-krds-primary-80 disabled:cursor-not-allowed disabled:bg-krds-gray-10 read-only:bg-krds-gray-10 read-only:cursor-default',
    {
      variants: {
        size: {
          md: 'h-12 px-4 text-[16px] leading-[150%]',
          lg: 'h-14 px-4 text-[16px] leading-[150%]',
        },
      },
      defaultVariants: {
        size: 'md',
      },
    },
  )

  const props = withDefaults(
    defineProps<{
      modelValue?: string
      type?: string
      maxLength?: number
      size?: 'md' | 'lg'
      status?: 'error' | 'success' | 'info'
      /** 단위 */
      unit?: string
      /** 숫자 포맷 */
      number?: boolean
      /** 금액 포맷 */
      money?: boolean
      /** 날짜 포맷 */
      date?: boolean
      /** 날짜 아이콘 표시 */
      dateIcon?: boolean
      /** input id */
      inputId?: any
      /** aria-label */
      ariaLabel?: string
      /** 비활성화 여부 */
      disabled?: boolean
      /** 읽기 전용 여부 */
      readonly?: boolean
      /** 지우기 가능 여부 */
      clearable?: boolean
      /** 텍스트 정렬 */
      textAlign?: 'left' | 'center' | 'right'
      placeholder?: string
      class?: string
      min?: number
      max?: number
      autocomplete?: string
    }>(),
    {
      type: 'text',
      size: 'md',
      disabled: false,
      readonly: false,
      clearable: false,
      textAlign: 'left',
      min: undefined,
      max: undefined,
      autocomplete: 'on',
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: string]
    clear: []
  }>()

  const showPassword = ref(false)
  const inputRef = ref<HTMLInputElement | null>(null)
  /** 다음 포커스가 마우스로 인한 것인지 (wrapper mousedown 시 true) */
  const focusByMouse = ref(false)
  /** 현재 포커스가 마우스로 들어온 경우 → 링 숨김 */
  const hasFocusByMouse = ref(false)

  const formField = inject(FormFieldContextKey, null)
  const effectiveId = computed(() => formField?.id ?? props.inputId)
  const effectiveStatus = computed(() => formField?.status ?? props.status)

  const ariaDescribedBy = computed(() => {
    if (!formField) return undefined

    return formField.status === 'error' ? formField.errorId : undefined
  })

  /* ======================
 computed
====================== */

  const inputType = computed(() => {
    if (props.date) return 'text'
    if (props.type === 'password' && showPassword.value) return 'text'
    return props.type
  })

  const hasValue = computed(() => !!props.modelValue)
  const hasError = computed(() => effectiveStatus.value === 'error')
  const hasSuccess = computed(() => effectiveStatus.value === 'success')
  const isReadonly = computed(() => props.readonly)
  const isDisabled = computed(() => props.disabled)
  const isStaticState = computed(() => isReadonly.value || isDisabled.value)

  const statusClasses = computed(() => {
    if (hasError.value)
      return 'border-krds-danger-60 focus:ring-0 focus-visible:border-krds-danger-60 focus-visible:ring-2 focus-visible:ring-krds-danger-60'
    if (hasSuccess.value)
      return 'border-krds-success-60 focus:ring-0 focus-visible:border-krds-success-60 focus-visible:ring-2 focus-visible:ring-krds-success-60'
    return ''
  })

  const readonlyClasses = computed(() =>
    isReadonly.value ? 'text-krds-gray-80' : '',
  )
  const statusTextClasses = computed(() =>
    hasError.value || hasSuccess.value ? 'text-krds-gray-80' : '',
  )
  const disabledClasses = computed(() =>
    isDisabled.value ? 'text-krds-gray-50' : '',
  )

  const $slots = defineSlots<{
    leftAddon?: () => any
    rightAddon?: () => any
  }>()

  const hasLeftAddon = computed(() => !!$slots.leftAddon)
  const hasRightAddon = computed(() => !!$slots.rightAddon)
  const isNumberFormat = computed(() => props.money)
  const rightPaddingClasses = computed(() => {
    if (hasRightAddon.value && props.clearable) return 'pr-20'
    if (hasRightAddon.value || (props.clearable && !props.money)) return 'pr-10'
    if (props.money && props.clearable) return 'pr-12'
    if (hasLeftAddon.value) return 'pl-9'
    return ''
  })

  const inputClasses = computed(() =>
    cn(
      inputVariants({ size: props.size }),
      isStaticState.value && 'border-krds-gray-30',
      readonlyClasses.value,
      statusClasses.value,
      statusTextClasses.value,
      disabledClasses.value,
      rightPaddingClasses.value,
      props.textAlign === 'right' && 'text-right',
      props.textAlign === 'center' && 'text-center',
      props.textAlign === 'left' && 'text-left',
    ),
  )

  const wrapperClasses = computed(() =>
    cn('relative flex items-center ', props.class),
  )
  const hasMinMax = computed(
    () => props.min !== undefined || props.max !== undefined,
  )
  const inputMode = computed(() =>
    props.date || isNumberFormat.value || hasMinMax.value ? 'numeric' : 'none',
  )
  const inputMaxLength = computed(() => (props.date ? 10 : props.maxLength))

  /* ======================
 format helpers
====================== */

  const formatDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8)

    if (digits.length <= 4) return digits
    if (digits.length <= 6) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`
    }
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`
  }

  const formatNumber = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (!digits) return ''
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const displayValue = computed(() => {
    if (props.date) return props.modelValue ?? ''
    if (isNumberFormat.value) return formatNumber(props.modelValue ?? '')
    return props.modelValue ?? ''
  })

  /* ======================
 handlers
====================== */

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement

    // DATE (숫자 + 하이픈)
    if (props.date) {
      const raw = target.value.replace(/[^0-9-]/g, '')
      const formatted = formatDate(raw)

      // 🔑 인풋 표시값 즉시 동기화
      target.value = formatted

      formField?.setValue?.(formatted)
      emit('update:modelValue', formatted)
      return
    }

    // NUMBER + COMMA
    if (isNumberFormat.value) {
      const raw = target.value.replace(/\D/g, '')
      const formatted = raw // modelValue는 숫자만 유지

      // 🔑 인풋 표시값 즉시 동기화
      target.value = formatNumber(formatted)

      formField?.setValue?.(formatted)
      emit('update:modelValue', formatted)
      return
    }

    if (hasMinMax.value) {
      const raw = target.value.replace(/\D/g, '')
      const nextValue = raw ? Number(raw) : NaN
      const minValue = props.min ?? undefined
      const maxValue = props.max ?? undefined

      let clampedValue = nextValue
      if (!Number.isNaN(nextValue)) {
        if (minValue !== undefined)
          clampedValue = Math.max(clampedValue, minValue)
        if (maxValue !== undefined)
          clampedValue = Math.min(clampedValue, maxValue)
      }

      const finalValue = Number.isNaN(clampedValue) ? '' : String(clampedValue)
      target.value = finalValue
      formField?.setValue?.(finalValue)
      emit('update:modelValue', finalValue)
      return
    }

    formField?.setValue?.(target.value)
    emit('update:modelValue', target.value)
  }

  const allowOnlyDateKey = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) return

    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ]
    if (allowedKeys.includes(e.key)) return

    if (/^\d$/.test(e.key)) return
    if (e.key === '-') return

    e.preventDefault()
  }

  const allowOnlyNumberKeyWithComma = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) return

    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ]
    if (allowedKeys.includes(e.key)) return

    if (/^\d$/.test(e.key)) return
    if (e.key === ',') return

    e.preventDefault()
  }

  const allowOnlyNumberKey = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) return

    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ]
    if (allowedKeys.includes(e.key)) return
    if (/^\d$/.test(e.key)) return

    e.preventDefault()
  }

  const handleKeydown = (e: KeyboardEvent) => {
    if (props.date) {
      allowOnlyDateKey(e)
      return
    }

    if (isNumberFormat.value) {
      allowOnlyNumberKeyWithComma(e)
      return
    }
    if (hasMinMax.value) {
      allowOnlyNumberKey(e)
    }
  }

  const onWrapperMousedown = () => {
    focusByMouse.value = true
  }
  const onInputFocus = () => {
    hasFocusByMouse.value = focusByMouse.value
    focusByMouse.value = false
  }
  const onInputBlur = () => {
    hasFocusByMouse.value = false
  }

  const handleClear = () => {
    formField?.setValue?.('')
    emit('update:modelValue', '')
    emit('clear')
    inputRef.value?.focus()
  }

  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      if (typeof window === 'undefined') return
      if (newVal === formField?.value) return

      formField?.setValue?.(newVal)
    },
  )

  // form field value 변경시 modelValue 업데이트
  watch(
    () => formField?.value,
    (newValue) => {
      if (typeof window === 'undefined') return
      if (newValue === props.modelValue) return

      emit('update:modelValue', newValue)
    },
  )

  // clearable
  //
</script>

<template>
  <div :class="['group', wrapperClasses]" @mousedown="onWrapperMousedown">
    <div
      v-if="hasLeftAddon"
      class="text-krds-gray-60 pointer-events-none absolute left-3 flex items-center"
    >
      <slot name="leftAddon" />
    </div>
    <input
      v-bind="$attrs"
      :id="effectiveId"
      ref="inputRef"
      :min="min"
      :max="max"
      :type="inputType"
      :value="displayValue"
      :inputmode="inputMode"
      :maxlength="inputMaxLength"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :class="[inputClasses, hasFocusByMouse && 'focus-by-mouse']"
      :aria-label="ariaLabel"
      :aria-invalid="hasError ? true : undefined"
      :aria-describedby="ariaDescribedBy"
      :autocomplete="autocomplete"
      @input="handleInput"
      @focus="onInputFocus"
      @blur="
        () => {
          onInputBlur()
          formField?.handleBlur?.()
        }
      "
      @keydown="handleKeydown"
    />
    <div
      v-if="
        hasRightAddon ||
        date ||
        (clearable && !disabled && !readonly) ||
        type == 'password'
      "
      class="text-krds-gray-60 absolute right-[15px] flex items-center"
      :class="[
        unit ? 'right-10!' : '',
        clearable && !disabled && !readonly ? 'gap-0.5' : '',
      ]"
    >
      <KeepTransition direction="down">
        <button
          v-if="clearable && !disabled && !readonly && !!displayValue"
          type="button"
          class="hover:text-krds-primary-80 pointer-events-auto flex cursor-pointer items-center justify-center transition-[color] duration-200 ease-out"
          aria-label="입력 지우기"
          @click="handleClear"
        >
          <Icon
            name="delete"
            :size="20"
            class="text-krds-secondary-50 hover:text-krds-secondary-60"
          />
        </button>
      </KeepTransition>
      <KeepTransition direction="down">
        <button
          v-if="type === 'password'"
          type="button"
          :aria-pressed="showPassword"
          :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 표시'"
          class="hover:text-krds-primary-80 flex cursor-pointer items-center justify-center transition-colors"
          @click="togglePassword"
        >
          <Icon
            v-if="showPassword"
            name="eye-on"
            :size="20"
            class="text-krds-secondary-50 hover:text-krds-secondary-60"
          />
          <Icon
            v-else
            name="eye-off"
            :size="20"
            class="text-krds-secondary-50 hover:text-krds-secondary-60"
          />
        </button>
      </KeepTransition>

      <slot name="rightAddon" />
    </div>
    <!-- <span v-if="unit"  class="inline-block ml-2 text-[color:var(--krds-color-light-gray-70)] text-[length:var(--krds-body-sm)]">{{ unit }}</span></div> -->
    <span
      v-if="unit"
      class="text-krds-gray-70 text-krds-body-md ml-2 inline-block font-medium"
      >{{ unit }}</span
    >
  </div>
</template>

<style scoped>
  /* 마우스 클릭 시 링 제거 (CSS만으로 안 될 때 대비) */
  input:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }

  /* 마우스로 포커스된 경우 링 강제 제거 (크롬/엣지 등) */
  input.focus-by-mouse {
    outline: none !important;
    box-shadow: none !important;
  }
</style>
