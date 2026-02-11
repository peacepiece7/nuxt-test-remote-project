<script setup lang="ts">
  import { inject, computed, ref, watch } from 'vue'
  import { CircleX } from 'lucide-vue-next'
  import { cn } from '@/lib/utils'
  import {
    FormFieldContextKey,
    type FormFieldContext,
  } from '@/composables/useFormField'

  const props = defineProps<{
    class?: string
    errorMessage?: string
  }>()

  const formField = inject<FormFieldContext | null>(FormFieldContextKey, null)

  const isVisible = computed(
    () =>
      !!(
        (formField?.meta?.touched && formField?.errorMessage) ||
        props.errorMessage
      ),
  )

  // leave 중에도 마지막 에러 메시지를 유지해 애니메이션이 보이도록
  const displayMessage = ref('')

  watch(
    [() => formField?.errorMessage, () => props.errorMessage],
    ([fieldMsg, propMsg]) => {
      const msg = propMsg || fieldMsg
      if (msg) displayMessage.value = msg
    },
    { immediate: true },
  )

  const containerClasses = computed(() =>
    cn('min-h-[22px] overflow-hidden', props.class),
  )

  const innerClasses = cn(
    'form-error-inner grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
  )

  const contentClasses = cn(
    'form-error-content flex items-center gap-1 min-h-0 overflow-hidden text-[15px] text-krds-danger-60 leading-[150%]',
    'transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]',
  )
</script>

<template>
  <div :class="containerClasses">
    <Transition name="form-error">
      <div
        v-if="isVisible"
        :id="formField?.errorId"
        :class="innerClasses"
        role="alert"
        aria-live="polite"
        :aria-hidden="!isVisible"
      >
        <div :class="contentClasses">
          <span class="text-krds-danger-60 shrink-0" aria-hidden="true">
            <Icon name="cautrion-filled" />
          </span>
          <span>
            <slot>
              {{ errorMessage || displayMessage || formField?.errorMessage }}
            </slot>
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  .form-error-enter-from,
  .form-error-leave-to {
    grid-template-rows: 0fr;
    opacity: 0;
  }
  .form-error-enter-to,
  .form-error-leave-from {
    opacity: 1;
  }
  .form-error-enter-from .form-error-content,
  .form-error-leave-to .form-error-content {
    opacity: 0;
    transform: translateY(-20%);
  }
  .form-error-enter-to .form-error-content,
  .form-error-leave-from .form-error-content {
    opacity: 1;
    transform: translateY(0);
  }
</style>
