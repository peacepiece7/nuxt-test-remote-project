<script setup lang="ts">
  import { computed, provide, useId } from 'vue'
  import { cn } from '@/lib/utils'
  import { FormFieldContextKey } from '@/composables/useFormField'

  const props = withDefaults(
    defineProps<{
      name: string
      id?: string
      status?: 'error' | 'success' | 'info'
      disabled?: boolean
      required?: boolean
      class?: string
    }>(),
    { id: undefined, status: undefined, class: undefined },
  )

  const generatedId = useId()

  const { value, errorMessage, handleBlur, setValue, meta } = useField(
    () => props.name,
  )

  const fieldId = computed(() => props.id || generatedId)
  const formStatus = computed(() => {
    if (props.status) return props.status
    if (meta.touched && errorMessage.value) return 'error'
    return undefined
  })
  const errorId = computed(() =>
    formStatus.value === 'error' ? `${fieldId.value}-error` : undefined,
  )
  const classes = computed(() =>
    cn('relative flex flex-col gap-2', props.class),
  )

  provide(FormFieldContextKey, {
    get id() {
      return fieldId.value
    },
    get status() {
      return formStatus.value
    },
    get disabled() {
      return props.disabled
    },
    get required() {
      return props.required
    },
    get errorId() {
      return errorId.value
    },
    get errorMessage() {
      return errorMessage.value
    },
    get meta() {
      return meta
    },
    get value() {
      return value.value
    },
    handleBlur,
    setValue,
  })
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
