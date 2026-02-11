<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const toastVariants = cva(
  'group pointer-events-auto bg-[#181e25cc] fixed left-1/2 top-6 z-[1100] text-white flex min-w-[320px] w-[320px] h-12 -translate-x-1/2 items-center gap-6 overflow-hidden rounded-[1000px] pl-8 pr-6 transition-all lg:min-w-[520px] lg:w-[520px] lg:h-16 lg:pl-10 lg:pr-6'
)

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    duration?: number
    open: boolean
    class?: string
  }>(),
  {
    duration: 1500,
  }
)

const emit = defineEmits<{
  close: []
  'update:open': [value: boolean]
}>()

let timeoutId: ReturnType<typeof setTimeout> | null = null

const classes = computed(() => cn(toastVariants(), props.class))

const close = () => {
  emit('update:open', false)
  emit('close')
}

const startTimer = () => {
  if (props.duration <= 0) return

  if (timeoutId) clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    close()
  }, props.duration)
}

watch(
  () => props.open,
  (open) => {
    if (open) startTimer()
    else if (timeoutId) clearTimeout(timeoutId)
  },
  { immediate: true }
)

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="open"
      :class="classes"
      role="alert"
      aria-live="polite"
    >
      <!-- Content -->
      <div class="flex-1 min-w-0 text-center">
        <div
          v-if="title"
          class="text-krds-body-sm font-medium leading-[1.5] tracking-[-0.32px] lg:text-krds-body-lg lg:tracking-[-0.4px]"
        >
          {{ title }}
        </div>

        <div
          v-if="description || $slots.default"
          class="text-krds-body-sm font-medium leading-[1.5] tracking-[-0.32px] lg:text-krds-body-lg lg:tracking-[-0.4px]"
        >
          <slot>{{ description }}</slot>
        </div>

        <div v-if="$slots.action" class="mt-2">
          <slot name="action" />
        </div>
      </div>

    </div>
  </Transition>
</template>
