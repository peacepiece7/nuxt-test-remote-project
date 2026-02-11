<script setup lang="ts">
  import { computed, inject, ref, onMounted, watch, nextTick } from 'vue'
  import { cva } from 'class-variance-authority'
  import { cn } from '@/lib/utils'
  import { FormFieldContextKey } from '@/composables/useFormField'

  const textareaVariants = cva(
    'flex w-full h-[144px] rounded-[8px] border border-krds-gray-30 bg-krds-white p-4 font-medium text-[16px] leading-[150%] tracking-[-0.32px] transition-colors resize-none placeholder:text-krds-gray-60 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60 focus-visible:ring-offset-2 focus-visible:border-krds-primary-60 disabled:cursor-not-allowed disabled:bg-krds-gray-10 disabled:text-krds-gray-50 read-only:bg-krds-gray-10 read-only:cursor-default',
  )

  const props = withDefaults(
    defineProps<{
      modelValue?: string
      variant?: never
      status?: 'error' | 'success' | 'info'
      disabled?: boolean
      readonly?: boolean
      autoResize?: boolean
      maxRows?: number
      maxLength?: number
      placeholder?: string
      class?: string
    }>(),
    {
      disabled: false,
      readonly: false,
      autoResize: false,
      maxLength: 1000,
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: string]
  }>()

  const textareaRef = ref<HTMLTextAreaElement | null>(null)
  const focusByMouse = ref(false)
  const hasFocusByMouse = ref(false)

  const formField = inject(FormFieldContextKey, null)
  const effectiveStatus = computed(() => formField?.status ?? props.status)
  const ariaDescribedBy = computed(() => {
    if (!formField) return undefined

    return formField.status === 'error' ? formField.errorId : undefined
  })

  const hasError = computed(() => effectiveStatus.value === 'error')

  const statusClasses = computed(() => {
    if (hasError.value) {
      return 'border-krds-danger-60 focus:ring-0 focus-visible:border-krds-danger-60 focus-visible:ring-2 focus-visible:ring-krds-danger-60'
    }
    return ''
  })

  const classes = computed(() =>
    cn(textareaVariants(), statusClasses.value, props.class),
  )

  const count = computed(() => props.modelValue?.length ?? 0)
  const limitText = computed(() => (props.maxLength ?? 0).toLocaleString())

  const onWrapperMousedown = () => {
    focusByMouse.value = true
  }
  const onTextareaFocus = () => {
    hasFocusByMouse.value = focusByMouse.value
    focusByMouse.value = false
  }
  const onTextareaBlur = () => {
    hasFocusByMouse.value = false
  }

  const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    const value = target.value
    formField?.setValue?.(value)
    emit('update:modelValue', value)
  }

  const adjustHeight = () => {
    if (!props.autoResize || !textareaRef.value) return

    const textarea = textareaRef.value
    textarea.style.height = 'auto'
    const scrollHeight = textarea.scrollHeight

    if (props.maxRows) {
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10)
      const maxHeight = lineHeight * props.maxRows
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
    } else {
      textarea.style.height = `${scrollHeight}px`
      textarea.style.overflowY = 'hidden'
    }
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      if (typeof window === 'undefined') return
      nextTick(adjustHeight)
      formField?.setValue?.(newVal)
    },
    { immediate: true },
  )

  // form field value 변경시 modelValue 업데이트
  watch(
    () => formField?.value,
    (newValue) => {
      if (typeof window === 'undefined') return
      if (newValue !== props.modelValue) emit('update:modelValue', newValue)
    },
  )

  onMounted(() => {
    adjustHeight()
  })
</script>

<template>
  <div class="flex flex-col gap-2">
    <div @mousedown="onWrapperMousedown">
      <textarea
        :id="formField?.id"
        ref="textareaRef"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :maxlength="maxLength"
        :class="[classes, hasFocusByMouse && 'focus-by-mouse']"
        :aria-invalid="hasError ? true : undefined"
        :aria-describedby="ariaDescribedBy || undefined"
        @input="handleInput"
        @focus="onTextareaFocus"
        @blur="
          () => {
            onTextareaBlur()
            formField?.handleBlur?.()
          }
        "
      />
    </div>
    <div
      class="text-krds-body-xxs text-right leading-[150%] font-medium tracking-[-0.28px]"
    >
      <span :class="count > 0 ? 'text-krds-primary-60' : 'text-krds-gray-70'">
        {{ count }}
      </span>
      <span class="text-krds-gray-70"> / </span>
      <span class="text-krds-gray-70">{{ limitText }}</span>
      <span class="text-krds-gray-70">자</span>
    </div>
  </div>
</template>

<style scoped>
  textarea:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }
  textarea.focus-by-mouse {
    outline: none !important;
    box-shadow: none !important;
  }
</style>
