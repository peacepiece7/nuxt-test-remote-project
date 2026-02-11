<script setup lang="ts">
  import { computed } from 'vue'
  import { VueFinalModal } from 'vue-final-modal'
  import type { DialogSize, DialogProps } from '~/types/dialog'

  const props = withDefaults(defineProps<DialogProps>(), {
    showClose: true,
    // confirmDisabled: false,
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
    close: []
    opened: []
    closed: []
  }>()

  const handleClose = () => {
    emit('close')
  }
</script>

<template>
  <VueFinalModal
    :modal-id="modalId"
    class="flex items-center justify-center"
    :content-class="[
      'flex flex-col md:min-w-[768px] md:w-max min-w-unset w-full bg-krds-white border-krds-gray-10 rounded-xl shadow-xl',
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
    <div
      class="border-krds-gray-10 flex items-center justify-between border-b p-4 md:border-0 md:p-10"
    >
      <div class="flex items-center gap-3">
        <!-- Title -->
        <slot name="header">
          <h2
            class="text-krds-gray-100 md:text-krds-title-lg text-krds-body-md font-semibold"
          >
            {{ title }}
          </h2>
        </slot>
      </div>
      <!-- Close Button -->
      <button
        v-if="showClose"
        type="button"
        class="text-krds-gray-40 hover:bg-krds-gray-7 hover:text-krds-gray-60 rounded-lg transition-colors"
        @click="handleClose"
      >
        <Icon
          name="close"
          color="var(--color-krds-gray-80)"
          class="h-6 w-6 md:h-10 md:w-10"
        />
      </button>
    </div>
    <!-- Body -->
    <div class="text-krds-gray-70 overflow-y-auto px-5 py-8 md:px-10 md:py-8">
      <slot />
    </div>
  </VueFinalModal>
</template>
