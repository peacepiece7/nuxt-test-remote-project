<script setup lang="ts">
  import { computed, useId } from 'vue'
  import { cva } from 'class-variance-authority'
  import { FormFieldContextKey } from '@/composables/useFormField'

  const props = withDefaults(
    defineProps<{
      modelValue?: string | number
      value: string | number | Record<string, any>
      name: string
      variant?: 'default' | 'button'
      label?: string
      disabled?: boolean
      status?: 'error' | 'success' | 'info'
      valueKey?: string
      labelKey?: string
      /** input id */
      inputId?: any
    }>(),
    {
      variant: 'default',
      disabled: false,
      valueKey: 'value',
      labelKey: 'label',
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: string | number]
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
  const formField = inject(FormFieldContextKey, null)
  const effectiveId = computed(() => props.inputId ?? instanceId)
  const effectiveStatus = computed(() => formField?.status ?? props.status)

  const ariaDescribedBy = computed(() => {
    if (!formField) return undefined

    return formField.status === 'error' ? formField.errorId : undefined
  })

  const hasError = computed(() => effectiveStatus.value === 'error')
  const isChecked = computed(() => props.modelValue === actualValue.value)
  const isDisabled = computed(() => props.disabled)

  const rootVariants = cva('inline-flex', {
    variants: {
      variant: {
        default: 'items-center gap-2',
        button: 'items-stretch',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  })

  const indicatorVariants = cva(
    'flex items-center justify-center rounded-full shrink-0 size-5 border transition-colors',
    {
      variants: {
        checked: {
          true: 'bg-primary-600 border-primary-600',
          false: 'bg-white border-krds-gray-30',
        },
        disabled: {
          true: 'bg-krds-secondary-10! border-krds-gray-30!',
        },
        error: {
          true: 'border-krds-danger-60!',
        },
      },
      compoundVariants: [
        {
          checked: true,
          disabled: true,
          class: 'border-krds-gray-30',
        },
      ],
      defaultVariants: {
        checked: false,
        disabled: false,
        error: false,
      },
    },
  )

  const dotVariants = cva('rounded-full size-2 transition-colors', {
    variants: {
      checked: {
        true: '',
        false: 'bg-transparent',
      },
      disabled: {
        true: '',
        false: '',
      },
      error: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        checked: true,
        disabled: false,
        class: 'bg-white',
      },
      {
        checked: true,
        disabled: true,
        class: 'bg-krds-gray-30',
      },
      {
        checked: true,
        error: true,
        class: 'bg-white',
      },
    ],
    defaultVariants: {
      checked: false,
      disabled: false,
      error: false,
    },
  })

  const labelVariants = cva(
    'text-krds-body-md tracking-[-0.32px] select-none',
    {
      variants: {
        disabled: {
          true: 'text-krds-gray-60 cursor-not-allowed',
          false: 'text-krds-gray-90 cursor-pointer',
        },
      },
      defaultVariants: {
        disabled: false,
      },
    },
  )

  const indicatorLabelVariants = cva('inline-flex', {
    variants: {
      disabled: {
        true: 'cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  })
  const focusWrapperClass = cva(
    'inline-flex items-center gap-2 rounded-[8px] peer-focus-visible:ring-2 peer-focus-visible:ring-krds-primary-base peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white',
  )
  const buttonLabelVariants = cva(
    'inline-flex h-12 min-w-[107px] items-center justify-center gap-1 rounded-[8px] border px-4 text-krds-body-md tracking-[-0.32px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-krds-primary-base peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white',
    {
      variants: {
        checked: {
          true: 'bg-krds-primary-5 border-2 border-primary-600 text-primary-600 font-bold',
          false:
            'bg-white border border-krds-gray-30 text-krds-gray-80 font-medium',
        },
        disabled: {
          true: 'bg-krds-gray-10! border-krds-gray-30! text-krds-gray-50! font-medium cursor-not-allowed',
          false: 'cursor-pointer',
        },
        error: {
          true: 'border-krds-danger-60',
          false: '',
        },
      },
      compoundVariants: [
        {
          checked: true,
          disabled: true,
          class:
            'bg-krds-gray-10 border-1! border-krds-gray-30 text-krds-gray-50 font-medium',
        },
        {
          checked: true,
          error: true,
          class: 'border-krds-danger-60',
        },
      ],
      defaultVariants: {
        checked: false,
        disabled: false,
        error: false,
      },
    },
  )

  const handleChange = (event: Event) => {
    if (isDisabled.value) {
      const target = event.target as HTMLInputElement
      target.checked = isChecked.value
      event.preventDefault()
      return
    }
    emit('update:modelValue', actualValue.value as string | number)
  }

  const buttonCheckClasses = computed(() => {
    if (hasError.value) return 'text-krds-danger-60'
    if (isDisabled.value) return 'text-krds-gray-50'
    return 'text-primary-600'
  })

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
</script>

<template>
  <div :class="rootVariants({ variant })">
    <template v-if="variant === 'default'">
      <input
        :id="effectiveId"
        :aria-describedby="ariaDescribedBy"
        type="radio"
        class="peer sr-only"
        :name="name"
        :value="actualValue"
        :checked="isChecked"
        :disabled="disabled"
        :aria-invalid="hasError || undefined"
        :aria-label="label ? undefined : displayLabel"
        @change="handleChange"
        @click="handleChange"
      />
      <div :class="focusWrapperClass()">
        <label
          :for="effectiveId"
          :class="indicatorLabelVariants({ disabled: isDisabled })"
        >
          <span
            aria-hidden="true"
            :class="
              indicatorVariants({
                checked: isChecked,
                disabled: isDisabled,
                error: hasError,
              })
            "
          >
            <span
              :class="
                dotVariants({
                  checked: isChecked,
                  disabled: isDisabled,
                  error: hasError,
                })
              "
            />
          </span>
        </label>

        <label
          v-if="label"
          :for="effectiveId"
          :class="labelVariants({ disabled: isDisabled })"
        >
          {{ label }}
        </label>
      </div>
    </template>

    <template v-else>
      <input
        :id="effectiveId"
        class="peer sr-only"
        type="radio"
        :name="name"
        :value="actualValue"
        :checked="isChecked"
        :disabled="disabled"
        role="radio"
        :aria-invalid="hasError ? 'true' : undefined"
        :aria-describedby="ariaDescribedBy"
        :aria-label="label ? undefined : displayLabel"
        @change="handleChange"
        @click="handleChange"
      />
      <label
        :for="effectiveId"
        :class="
          buttonLabelVariants({
            checked: isChecked,
            disabled: isDisabled,
            error: hasError,
          })
        "
      >
        <Icon
          v-if="isChecked"
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
<style scoped>
  .visually-hidden-focusable {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
    margin: 0;
    pointer-events: none;
  }
</style>
