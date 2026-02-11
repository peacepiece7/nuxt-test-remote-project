<script setup lang="ts">
  import { computed, nextTick, ref, watch } from 'vue'
  import { cva as cvaFn } from 'class-variance-authority'
  import { cn } from '@/lib/utils'

  import { useId } from 'vue'

  const instanceId = useId()
  const props = withDefaults(
    defineProps<{
      modelValue?: string
      options: Record<string, unknown>[]
      labelKey?: string
      valueKey?: string
      variant?: 'depth1' | 'depth2'
      size?: 'page' | 'popup'
      disabled?: boolean
      class?: string
    }>(),
    {
      variant: 'depth1',
      size: 'page',
      disabled: false,
      labelKey: 'label',
      valueKey: 'value',
    },
  )

  const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [value: string]
  }>()

  const listRef = ref<HTMLDivElement | null>(null)

  const enabledOptions = computed(() => props.options)
  const selectedValue = computed(
    () =>
      props.modelValue ??
      String(enabledOptions.value[0]?.[props.valueKey ?? 'value'] ?? ''),
  )

  const tabId = (index: number) => `tab-${instanceId}-${index}`

  const setActiveByIndex = (index: number) => {
    const item = enabledOptions.value[index]
    if (!item) return
    emit('update:modelValue', String(item[props.valueKey ?? 'value']))
    emit('change', String(item[props.valueKey ?? 'value']))
    return
  }

  const focusTab = async (index: number) => {
    await nextTick()
    const button =
      listRef.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')?.[
        index
      ]
    button?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (props.disabled) return
    if (!enabledOptions.value.length) return

    const tabs = Array.from(
      listRef.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]') || [],
    )
    if (!tabs.length) return
    const currentIndex = tabs.indexOf(e.target as HTMLButtonElement)
    if (currentIndex < 0) return

    let nextIndex = currentIndex

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
        break
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % tabs.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = tabs.length - 1
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        setActiveByIndex(currentIndex)
        return
      default:
        return
    }

    e.preventDefault()
    focusTab(nextIndex)
  }

  const handleClick = (index: number) => {
    if (props.disabled) return
    setActiveByIndex(index)
  }

  watch(
    () => props.modelValue,
    (value) => {
      if (value === undefined) return
      const index = enabledOptions.value.findIndex(
        (item) => String(item[props.valueKey ?? 'value']) === String(value),
      )
      if (index >= 0) {
      }
    },
  )

  const listClassVariants = cvaFn('flex gap-4', {
    variants: {
      variant: {
        depth1: 'border-b border-krds-gray-30',
        depth2: 'flex-wrap gap-x-3 gap-y-2 px-5 lg:px-0 lg:gap-x-4 lg:gap-y-2.5!',
      },
      size: {
        page: 'lg:gap-8',
        popup: 'lg:gap-6',
      },
    },
    compoundVariants: [
      {
        variant: 'depth2',
        size: 'page',
        className:
          'text-krds-title-xs font-bold lg:text-krds-title-lg lg:gap-4',
      },
    ],
    defaultVariants: {
      variant: 'depth1',
      size: 'page',
    },
  })

  const listClasses = computed(() =>
    cn(
      listClassVariants({ variant: props.variant, size: props.size }),
      props.class,
    ),
  )

  const tabClassVariants = cvaFn(
    'inline-flex items-center justify-center transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-func-info focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
      variants: {
        variant: {
          depth1:
            'relative pb-2 data-[state=active]:text-krds-gray-90 data-[state=inactive]:text-krds-gray-60 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:bg-krds-gray-90 after:opacity-0 data-[state=active]:after:opacity-100',
          depth2:
            'h-11 px-4 py-3 rounded-full bg-krds-gray-10 text-krds-gray-60 text-krds-body-md font-semibold data-[state=active]:bg-krds-gray-90 data-[state=active]:text-krds-white',
        },
        size: {
          page: 'text-krds-title-xs font-bold lg:text-krds-title-lg',
          popup: 'text-krds-title-xs font-bold lg:text-krds-title-md',
        },
      },
      compoundVariants: [
        {
          variant: 'depth2',
          size: 'page',
          className:
            'lg:h-12 lg:px-6 lg:py-3 font-medium! lg:text-krds-title-xs data-[state=active]:font-semibold!',
        },
      ],
      defaultVariants: {
        variant: 'depth1',
        size: 'page',
      },
    },
  )

  const tabClasses = computed(() =>
    tabClassVariants({ variant: props.variant, size: props.size }),
  )
</script>

<template>
  <div
    ref="listRef"
    role="tablist"
    :class="listClasses"
    :aria-disabled="disabled ? 'true' : 'false'"
    @keydown="handleKeyDown"
  >
    <button
      v-for="(item, index) in enabledOptions"
      :key="String(item[props.valueKey ?? 'value'])"
      :id="tabId(index)"
      role="tab"
      type="button"
      :aria-selected="
        String(item[props.valueKey ?? 'value']) === selectedValue
          ? 'true'
          : 'false'
      "
      :aria-disabled="disabled ? 'true' : 'false'"
      :tabindex="0"
      :data-state="
        String(item[props.valueKey ?? 'value']) === selectedValue
          ? 'active'
          : 'inactive'
      "
      :disabled="disabled"
      :class="tabClasses"
      @click="handleClick(index)"
    >
      {{ String(item[props.labelKey ?? 'label'] ?? '') }}
    </button>
  </div>
</template>
