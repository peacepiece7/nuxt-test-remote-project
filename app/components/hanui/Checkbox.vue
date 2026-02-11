<script setup lang="ts">
  import { computed, useId, watch } from 'vue'
  import { cva } from 'class-variance-authority'
  import { FormFieldContextKey } from '@/composables/useFormField'

  const props = withDefaults(
    defineProps<{
      modelValue?: Array<string | number>
      value: string | number | Record<string, any>
      name: string
      variant?: 'default' | 'button'
      label?: string
      disabled?: boolean
      valueKey?: string
      labelKey?: string
      inputId?: any
      status?: 'error' | 'success' | 'info'
    }>(),
    {
      variant: 'default',
      disabled: false,
      valueKey: 'value',
      labelKey: 'label',
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: Array<string | number>]
  }>()

  const instanceId = useId()

  const resolveValue = (value: typeof props.value) => {
    if (value && typeof value === 'object') {
      return (value as Record<string, any>)[props.valueKey]
    }
    return value
  }

  const resolveLabel = (value: typeof props.value) => {
    if (value && typeof value === 'object') {
      return (value as Record<string, any>)[props.labelKey]
    }
    return value
  }

  const actualValue = computed(() => resolveValue(props.value))
  const fallbackLabel = computed(() => resolveLabel(props.value))

  const valueId = computed(() =>
    String(actualValue.value).trim().replace(/\s+/g, '-'),
  )
  const displayLabel = computed(
    () => props.label ?? String(fallbackLabel.value ?? actualValue.value),
  )

  const selectedValues = computed<Array<string | number>>(() =>
    Array.isArray(props.modelValue) ? props.modelValue : [],
  )
  const isChecked = computed(() =>
    selectedValues.value.includes(actualValue.value as string | number),
  )

  const formField = inject(FormFieldContextKey, null)
  const effectiveId = computed(() => props.inputId ?? instanceId)
  const effectiveStatus = computed(() => formField?.status ?? props.status)

  const ariaDescribedBy = computed(() => {
    if (!formField) return undefined

    return formField.status === 'error' ? formField.errorId : undefined
  })

  const hasError = computed(() => effectiveStatus.value === 'error')
  const isDisabled = computed(() => props.disabled)

  const rootVariants = cva('', {
    variants: {
      variant: {
        default: 'inline-flex items-center gap-2',
        button: 'items-stretch',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  })

  const focusWrapperClass = cva(
    'items-center gap-2 rounded-[8px] peer-focus-visible:ring-2 peer-focus-visible:ring-primary-600 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white',
  )
  const focusRingLabel = cva(
    'inline-flex items-center peer-focus-visible:ring-2 peer-focus-visible:ring-primary-600 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white rounded-[6px]',
  )
  const indicatorVariants = cva(
    'relative flex size-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ',
    {
      variants: {
        checked: {
          true: 'bg-primary-600 border-primary-600',
          false: 'bg-white border-krds-gray-30',
        },
        disabled: {
          true: 'bg-krds-gray-10! border-krds-gray-30',
          false: '',
        },
        error: {
          true: 'border-krds-danger-60!',
        },
      },

      compoundVariants: [
        // ✅ checked + disabled
        {
          checked: true,
          disabled: true,
          class: 'bg-krds-gray-10! border-krds-gray-30!',
        },

        // ✅ checked + error
      ],

      defaultVariants: {
        checked: false,
        disabled: false,
        error: false,
      },
    },
  )

  const labelVariants = cva(
    'text-krds-body-md tracking-[-0.32px] select-none',
    {
      variants: {
        disabled: {
          true: 'text-krds-gray-60 cursor-not-allowed',
          false: 'text-krds-gray-90 cursor-pointer',
        },
        readonly: {
          true: 'text-krds-gray-70 cursor-default',
          false: '',
        },
      },
      defaultVariants: {
        disabled: false,
        readonly: false,
      },
    },
  )

  const indicatorLabelVariants = cva(
    ' items-center focus-within:outline-none',
    {
      variants: {
        disabled: {
          true: 'cursor-not-allowed',
          false: 'cursor-pointer',
        },
        readonly: {
          true: 'cursor-default',
          false: '',
        },
      },
      defaultVariants: {
        disabled: false,
        readonly: false,
      },
    },
  )

  const buttonLabelVariants = cva(
    'inline-flex h-12 min-w-[107px] items-center justify-center gap-1 rounded-[8px] border px-4 text-krds-body-md tracking-[-0.32px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary-600 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white',
    {
      variants: {
        checked: {
          true: 'bg-krds-primary-5 border border-primary-600 text-primary-600 font-bold ring-1 ring-primary-600 ring-inset',
          false:
            'bg-white border border-krds-gray-30 text-krds-gray-80 font-medium',
        },
        disabled: {
          true: 'bg-krds-gray-10! border border-krds-gray-30! text-krds-gray-50! font-medium cursor-not-allowed ring-0!',
          false: 'cursor-pointer',
        },
      },
      compoundVariants: [
        {
          checked: true,
          disabled: true,
          class:
            'bg-krds-gray-10! border border-krds-gray-30! text-krds-gray-50 font-medium',
        },
        // {
        //   checked: true,
        //   readonly: true,
        //   class: 'bg-krds-gray-10 border border-krds-gray-30 text-krds-gray-80 font-semibold',
        // },
        // {
        //   checked: true,
        //   error: true,
        //   class: 'ring-2 ring-krds-danger-60 ring-inset',
        // },
      ],
      defaultVariants: {
        checked: false,
        disabled: false,
      },
    },
  )

  const rootClass = computed(() => rootVariants({ variant: props.variant }))
  const indicatorLabelClass = computed(() =>
    indicatorLabelVariants({
      disabled: isDisabled.value,
    }),
  )
  const indicatorClass = computed(() =>
    indicatorVariants({
      checked: isChecked.value,
      disabled: isDisabled.value,
      error: hasError.value,
    }),
  )
  const labelClass = computed(() =>
    labelVariants({
      disabled: isDisabled.value,
    }),
  )
  const buttonLabelClass = computed(() =>
    buttonLabelVariants({
      checked: isChecked.value,
      disabled: isDisabled.value,
    }),
  )

  const handleChange = (event: Event) => {
    if (isDisabled.value) {
      const target = event.target as HTMLInputElement
      target.checked = isChecked.value
      event.preventDefault()
      return
    }
    const value = actualValue.value as string | number
    const nextValues = isChecked.value
      ? selectedValues.value.filter((item) => item !== value)
      : [...selectedValues.value, value]
    emit('update:modelValue', nextValues)
    formField?.setValue?.(nextValues)
  }
  const defaultCheckClasses = computed(() =>
    isDisabled.value ? 'text-krds-gray-30 absolute' : 'text-white absolute',
  )

  const buttonCheckClasses = computed(() => {
    if (isDisabled.value && isChecked.value) return ''
    if (isChecked.value) return 'text-primary-600'
    if (hasError.value) return 'text-krds-danger-60'
    if (isDisabled.value) return 'text-krds-gray-50'
    return 'text-grey-700'
  })

  const toggleByKeyboard = () => {
    if (isDisabled.value) return

    const value = actualValue.value as string | number
    const nextValues = isChecked.value
      ? selectedValues.value.filter((item) => item !== value)
      : [...selectedValues.value, value]

    emit('update:modelValue', nextValues)
    formField?.setValue?.(nextValues)
  }

  // form field 연동: modelValue 변경 시 setValue
  watch(
    () => props.modelValue,
    (newVal) => {
      if (typeof window === 'undefined') return
      const formVal = formField?.value
      if (
        Array.isArray(formVal) &&
        Array.isArray(newVal) &&
        formVal.length === newVal.length &&
        formVal.every((v, i) => v === newVal[i])
      )
        return

      formField?.setValue?.(newVal ?? [])
    },
  )

  // form field value 변경 시 modelValue 업데이트
  watch(
    () => formField?.value,
    (newValue) => {
      if (typeof window === 'undefined') return
      const modelVal = props.modelValue ?? []
      const nextVal = Array.isArray(newValue) ? newValue : []
      if (
        modelVal.length === nextVal.length &&
        modelVal.every((v, i) => v === nextVal[i])
      )
        return

      emit('update:modelValue', nextVal)
    },
  )
</script>

<template>
  <div :class="[label ? rootClass : 'inline-block']">
    <input
      :id="effectiveId"
      :aria-describedby="ariaDescribedBy"
      class="peer absolute h-0 w-0 opacity-0"
      type="checkbox"
      :name="name"
      :value="actualValue"
      :checked="isChecked"
      :disabled="disabled"
      :aria-invalid="hasError || undefined"
      :aria-label="label ? undefined : displayLabel"
      @change="handleChange"
      @keydown.space.prevent="toggleByKeyboard"
      @keydown.enter.prevent="toggleByKeyboard"
    />

    <!-- ✅ default variant -->
    <template v-if="variant === 'default'">
      <div :class="['inline-flex align-middle', focusWrapperClass()]">
        <!-- 체크 시각 요소 -->
        <label :for="effectiveId" :class="indicatorLabelClass">
          <span aria-hidden="true" :class="indicatorClass">
            <Icon
              v-show="isChecked"
              name="checkbox-check"
              :size="16"
              :class="defaultCheckClasses"
            />
          </span>
        </label>
        <!-- 텍스트 라벨 -->
        <label v-if="label" :for="effectiveId" :class="labelClass">
          {{ label }}
        </label>
      </div>
    </template>

    <!-- ✅ button variant -->
    <template v-else>
      <label :for="effectiveId" :class="buttonLabelClass">
        <Icon
          name="check"
          :size="20"
          :class="buttonCheckClasses"
          aria-hidden="true"
        />
        {{ displayLabel }}
      </label>
    </template>
  </div>
</template>
