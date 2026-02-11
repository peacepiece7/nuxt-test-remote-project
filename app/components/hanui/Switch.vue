<script setup lang="ts">
  import { computed, inject, watch } from 'vue'
  import { cn } from '@/lib/utils'
  import { FormFieldContextKey } from '@/composables/useFormField'

  const props = withDefaults(
    defineProps<{
      modelValue?: boolean
      disabled?: boolean
      label?: string
      status?: 'error' | 'success' | 'info'
      ariaLabel?: string
      id?: string
      class?: string
    }>(),
    {
      modelValue: false,
      disabled: false,
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: boolean]
  }>()

  const formField = inject(FormFieldContextKey, null)

  const effectiveId = computed(() => formField?.id ?? props.id)
  const effectiveStatus = computed(() => formField?.status ?? props.status)
  const ariaDescribedBy = computed(() => {
    if (!formField) return undefined
    return formField.status === 'error' ? formField.errorId : undefined
  })

  const hasError = computed(() => effectiveStatus.value === 'error')

  const labelId = computed(() => `${effectiveId.value}-label`)
  const stateId = computed(() => `${effectiveId.value}-state`)

  const wrapperClasses = computed(() => cn('inline-flex items-center gap-2'))

  const buttonClasses = computed(() =>
    cn(
      'cursor-pointer inline-flex items-center justify-center min-h-[24px] min-w-[44px] rounded-full',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-60',
      props.class,
    ),
  )

  const trackClasses = computed(() =>
    cn(
      'relative h-6 w-12 rounded-full transition-colors duration-200 ease-out',
      props.modelValue
        ? 'bg-[color:var(--color-new-blue-600)]'
        : 'bg-[color:var(--color-grey-300)]',
    ),
  )

  const thumbClasses = computed(() =>
    cn(
      'absolute top-[2px] left-[2px] h-[20px] w-[20px] rounded-full bg-[color:var(--color-common-100)]',
      'shadow-[0px_1px_2px_0px_rgba(0,0,0,0.12)] transition-transform duration-200 ease-out will-change-transform',
      props.modelValue ? 'translate-x-[24px]' : 'translate-x-0',
    ),
  )

  const onLabelClasses =
    'absolute left-[6px] text-[12px] font-bold text-white transition-opacity duration-150 leading-[24px]'

  const offLabelClasses =
    'absolute right-[4px] text-[11px] text-[color:var(--color-grey-600)] transition-opacity duration-150 leading-[24px]'

  const labelClasses = computed(() =>
    cn(
      'text-krds-body-md text-krds-gray-90 cursor-pointer select-none',
      props.disabled && 'cursor-not-allowed opacity-60',
    ),
  )

  const handleClick = () => {
    if (!props.disabled) {
      const next = !props.modelValue
      formField?.setValue?.(next)
      emit('update:modelValue', next)
    }
  }

  // v-model(ref) 변경 시 formField 동기화 (Input/Textarea와 동일 패턴)
  watch(
    () => props.modelValue,
    (newVal) => {
      if (typeof window === 'undefined') return
      if (newVal === formField?.value) return
      formField?.setValue?.(newVal)
    },
    { immediate: true },
  )

  // setValues 등 폼 필드 변경 시 부모 ref 동기화
  watch(
    () => formField?.value,
    (newValue) => {
      if (typeof window === 'undefined') return
      const next = newValue === true
      if (next === props.modelValue) return
      emit('update:modelValue', next)
    },
  )

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      handleClick()
    }
  }
</script>

<template>
  <div :class="wrapperClasses">
    <span
      v-if="label"
      :id="labelId"
      :class="labelClasses"
      @click="handleClick"
    >
      {{ label }}
    </span>

    <button
      :id="effectiveId"
      type="button"
      role="switch"
      :aria-checked="modelValue ? 'true' : 'false'"
      :aria-disabled="disabled ? 'true' : 'false'"
      :aria-labelledby="label ? labelId : undefined"
      :aria-label="!label ? ariaLabel || '스위치' : undefined"
      :aria-describedby="ariaDescribedBy"
      :aria-invalid="hasError ? true : undefined"
      :disabled="disabled"
      :class="buttonClasses"
      @click="handleClick"
      @blur="formField?.handleBlur?.()"
      @keydown="handleKeyDown"
    >
      <span :class="trackClasses" aria-hidden="true">
        <span :class="thumbClasses" />

        <span :class="onLabelClasses" :style="{ opacity: modelValue ? 1 : 0 }">
          ON
        </span>

        <span :class="offLabelClasses" :style="{ opacity: modelValue ? 0 : 1 }">
          OFF
        </span>
      </span>

      <span :id="stateId" class="sr-only">
        {{ modelValue ? '켜짐' : '꺼짐' }}
      </span>
    </button>
  </div>
</template>
