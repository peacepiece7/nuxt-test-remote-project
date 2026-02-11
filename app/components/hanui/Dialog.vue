<script setup lang="ts">
  import { computed } from 'vue'
  import { VueFinalModal } from 'vue-final-modal'
  import Button from '@/components/hanui/Button.vue'
  import type { DialogSize, DialogProps } from '~/types/dialog'

  const props = withDefaults(defineProps<DialogProps>(), {
    size: 'md',
    showClose: true,
    showFooter: true,
    showCancel: true,
    confirmText: '확인',
    cancelText: '취소',
    confirmDisabled: false,
    loading: false,
    clickToClose: false,
    escToClose: true,
    lockScroll: true,
    hideOverlay: false,
    overlayTransition: 'vfm-fade',
    contentTransition: 'vfm-fade',
  })

  const emit = defineEmits<{
    confirm: []
    cancel: []
    close: []
    opened: []
    closed: []
  }>()

  const sizeClasses = computed(() => {
    const sizes: Record<DialogSize, string> = {
      sm: 'max-w-[400px]',
      md: 'max-w-[500px]',
      lg: 'max-w-[600px]',
      xl: 'max-w-[700px]',
      full: 'max-w-full mx-4 sm:mx-8',
    }
    return sizes[props.size!]
  })

  const handleConfirm = () => {
    if (!props.loading && !props.confirmDisabled) {
      emit('confirm')
    }
  }

  const handleCancel = () => {
    emit('cancel')
    emit('close')
  }

  const handleClose = () => {
    emit('close')
  }
</script>

<template>
  <VueFinalModal
    :modal-id="modalId"
    class="flex items-center justify-center"
    :content-class="[
      'flex flex-col w-full mx-4 bg-krds-white border border-krds-gray-10 rounded-xl shadow-xl',
      sizeClasses,
    ]"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
    :lock-scroll="lockScroll"
    :hide-overlay="hideOverlay"
    :overlay-transition="overlayTransition"
    :content-transition="contentTransition"
    overlay-class="bg-krds-black/50"
    @opened="emit('opened')"
    @closed="emit('closed')"
  >
    <!-- Header -->
    <!-- 대충 title 없으면 얼럿으로 처리 (aria-role="alertdialog"  | "dialog" | "alert" 처리 필요함)-->
    <div
      v-if="!!title"
      class="border-krds-gray-10 flex items-center justify-between border-b px-10 pt-10"
    >
      <div class="flex items-center gap-3">
        <!-- Title -->
        <slot name="header">
          <h2 class="text-krds-gray-100 text-lg font-semibold">
            {{ title }}
          </h2>
        </slot>
      </div>
      <!-- Close Button -->
      <button
        v-if="showClose"
        type="button"
        class="text-krds-gray-40 hover:bg-krds-gray-7 hover:text-krds-gray-60 rounded-lg p-1 transition-colors"
        @click="handleClose"
      >
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div class="text-krds-gray-70 max-h-[60vh] overflow-y-auto px-10 pt-8">
      <slot />
    </div>

    <!-- Footer -->
    <div
      v-if="showFooter"
      class="border-krds-gray-10 flex items-center justify-center gap-2 border-t px-10 pt-8 pb-10"
    >
      <slot name="footer">
        <Button
          v-if="showCancel"
          variant="secondary"
          class="w-[200px]"
          size="md"
          type="button"
          :disabled="loading"
          @click="handleCancel"
        >
          {{ cancelText }}
        </Button>
        <Button
          variant="primary"
          class="w-[200px]"
          size="md"
          type="button"
          :disabled="confirmDisabled || loading"
          :loading="loading"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </Button>
      </slot>
    </div>
  </VueFinalModal>
</template>
