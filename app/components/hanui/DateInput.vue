<script setup lang="ts">
  import { computed, nextTick, ref, watch } from 'vue'
  import { cn } from '@/lib/utils'
  import Icon from '@/components/hanui/Icon.vue'
  import Input from '@/components/hanui/Input.vue'

  const props = withDefaults(
    defineProps<{
      modelValue?: string
      label?: string
      helperText?: string
      errorMessage?: string
      required?: boolean
      hasError?: boolean
      placeholder?: string
      disabled?: boolean
      readonly?: boolean
      minDate?: string
      maxDate?: string
      class?: string
      clearable?: boolean
    }>(),
    {
      placeholder: 'YYYY-MM-DD',
      required: false,
      hasError: false,
      disabled: false,
      readonly: false,
      clearable: false,
    },
  )

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const instanceId = Math.random().toString(36).substring(2, 9)
  const inputId = `date-input-${instanceId}`
  const labelId = `date-input-label-${instanceId}`
  const triggerId = `date-input-trigger-${instanceId}`
  const calendarId = `date-calendar-${instanceId}`
  const emptyStateId = `date-input-empty-${instanceId}`

  const isOpen = ref(false)
  const triggerRef = ref<HTMLButtonElement | null>(null)
  const calendarRef = ref<HTMLDivElement | null>(null)

  const parseDate = (value?: string) => {
    if (!value) return null
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!match) return null
    const year = Number(match[1])
    const month = Number(match[2]) - 1
    const day = Number(match[3])
    const date = new Date(year, month, day)
    if (Number.isNaN(date.getTime())) return null
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    )
      return null
    return date
  }

  const formatDate = (date: Date) => {
    const y = date.getFullYear()
    const m = `${date.getMonth() + 1}`.padStart(2, '0')
    const d = `${date.getDate()}`.padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const selectedDate = computed(() => parseDate(props.modelValue))
  const viewDate = ref(selectedDate.value ?? new Date())
  const activeDate = ref<Date | null>(selectedDate.value ?? null)

  const minDateValue = computed(() => parseDate(props.minDate))
  const maxDateValue = computed(() => parseDate(props.maxDate))

  const getDateId = (date: Date) => `date-${instanceId}-${formatDate(date)}`
  const activeDateId = computed(() =>
    activeDate.value ? getDateId(activeDate.value) : undefined,
  )

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const isOutOfRange = (date: Date) => {
    if (minDateValue.value && date < minDateValue.value) return true
    if (maxDateValue.value && date > maxDateValue.value) return true
    return false
  }

  const calendarDays = computed(() => {
    const startOfMonth = new Date(
      viewDate.value.getFullYear(),
      viewDate.value.getMonth(),
      1,
    )
    const startDay = startOfMonth.getDay()
    const days: { date: Date; inMonth: boolean; disabled: boolean }[] = []
    const totalCells = 42
    for (let i = 0; i < totalCells; i += 1) {
      const day = new Date(startOfMonth)
      day.setDate(startOfMonth.getDate() - startDay + i)
      const inMonth = day.getMonth() === viewDate.value.getMonth()
      const disabled = !inMonth || isOutOfRange(day)
      days.push({ date: day, inMonth, disabled })
    }
    return days
  })

  const monthLabel = computed(() => {
    const year = viewDate.value.getFullYear()
    const month = viewDate.value.getMonth() + 1
    return `${year}년 ${month}월`
  })

  const openCalendar = () => {
    if (props.disabled || props.readonly) return
    isOpen.value = true
    const baseDate = selectedDate.value ?? new Date()
    viewDate.value = baseDate
    activeDate.value = baseDate
    nextTick(() => calendarRef.value?.focus())
  }

  const closeCalendar = () => {
    isOpen.value = false
    nextTick(() => triggerRef.value?.focus())
  }

  const selectDate = (date: Date) => {
    if (isOutOfRange(date)) return
    emit('update:modelValue', formatDate(date))
    closeCalendar()
  }

  const moveMonth = (delta: number) => {
    const next = new Date(viewDate.value)
    next.setMonth(next.getMonth() + delta)
    viewDate.value = next
  }

  const moveYear = (delta: number) => {
    const next = new Date(viewDate.value)
    next.setFullYear(next.getFullYear() + delta)
    viewDate.value = next
  }

  const moveActiveDate = (delta: number) => {
    if (!activeDate.value) return
    const next = new Date(activeDate.value)
    next.setDate(next.getDate() + delta)
    if (!isOutOfRange(next)) {
      activeDate.value = next
      if (
        next.getMonth() !== viewDate.value.getMonth() ||
        next.getFullYear() !== viewDate.value.getFullYear()
      ) {
        viewDate.value = new Date(next.getFullYear(), next.getMonth(), 1)
      }
    }
  }

  const handleCalendarKeydown = (e: KeyboardEvent) => {
    if (!isOpen.value) return
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        closeCalendar()
        break
      case 'ArrowLeft':
        e.preventDefault()
        moveActiveDate(-1)
        break
      case 'ArrowRight':
        e.preventDefault()
        moveActiveDate(1)
        break
      case 'ArrowUp':
        e.preventDefault()
        moveActiveDate(-7)
        break
      case 'ArrowDown':
        e.preventDefault()
        moveActiveDate(7)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (activeDate.value) selectDate(activeDate.value)
        break
      default:
        break
    }
  }

  const handleToday = () => {
    const today = new Date()
    if (isOutOfRange(today)) return
    emit('update:modelValue', formatDate(today))
    closeCalendar()
  }

  const triggerAriaLabel = computed(() => {
    if (props.label) return undefined
    if (!selectedDate.value) return `${props.placeholder} (날짜 선택되지 않음)`
    return formatDate(selectedDate.value)
  })

  watch(
    () => props.modelValue,
    (value) => {
      if (typeof window === 'undefined') return
      const parsed = parseDate(value ?? '')
      if (parsed) {
        activeDate.value = parsed
        viewDate.value = new Date(parsed.getFullYear(), parsed.getMonth(), 1)
      }
    },
    { immediate: true },
  )
</script>

<template>
  <div :class="cn('relative w-full', props.class)">
    <label
      v-if="label"
      :id="labelId"
      :for="inputId"
      class="text-krds-gray-70 mb-2 block font-medium"
    >
      {{ label }}
      <span v-if="required" class="text-krds-danger-60 ml-0.5">*</span>
    </label>
    <p
      v-if="helperText"
      :id="`${inputId}-helper`"
      class="text-krds-body-sm text-krds-gray-60 mb-2"
    >
      {{ helperText }}
    </p>

    <span v-if="!selectedDate" :id="emptyStateId" class="sr-only"
      >날짜 선택되지 않음</span
    >
    <Input
      v-model="modelValue as string"
      date
      :date-icon="false"
      :input-id="inputId"
      :aria-label="!label ? placeholder : undefined"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="
        hasError
          ? 'border-krds-danger-60 focus-visible:border-krds-danger-60'
          : ''
      "
      @update:model-value="(value: string) => emit('update:modelValue', value)"
    >
      <template #rightAddon>
        <button
          :id="triggerId"
          ref="triggerRef"
          type="button"
          class="text-krds-gray-80 absolute right-1 flex items-center justify-center"
          :class="[
            (disabled || readonly) && 'cursor-not-allowed opacity-50',
            clearable && 'ml-2',
          ]"
          :disabled="disabled"
          :aria-expanded="isOpen"
          :aria-controls="calendarId"
          :aria-labelledby="label ? `${labelId} ${triggerId}` : undefined"
          :aria-label="triggerAriaLabel"
          :aria-describedby="!selectedDate ? emptyStateId : undefined"
          @click="isOpen ? closeCalendar() : openCalendar()"
        >
          <Icon
            name="calendar"
            :size="20"
            class="text-krds-gray-80"
            aria-hidden="true"
          />
        </button>
      </template>
    </Input>
    <div
      v-if="isOpen"
      :id="calendarId"
      class="bg-krds-white absolute z-50 mt-2 rounded-[16px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-modal="false"
    >
      <div class="flex w-[280px] items-center gap-2 px-2 py-2">
        <button
          type="button"
          class="h-6"
          aria-label="이전 해"
          @click="moveYear(-1)"
        >
          <Icon name="chevron-left-double" :size="24" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="h-6"
          aria-label="이전 달"
          @click="moveMonth(-1)"
        >
          <Icon name="chevron-left" :size="24" aria-hidden="true" />
        </button>
        <div class="text-krds-gray-90 flex-1 text-center text-[20px] font-bold">
          {{ monthLabel }}
        </div>
        <button
          type="button"
          class="h-6 w-6"
          aria-label="다음 달"
          @click="moveMonth(1)"
        >
          <Icon name="chevron-right" :size="24" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="h-6 w-6"
          aria-label="다음 해"
          @click="moveYear(1)"
        >
          <Icon name="chevron-right-double" :size="24" aria-hidden="true" />
        </button>
      </div>

      <div class="px-4 pb-3">
        <div
          class="text-krds-gray-80 grid grid-cols-7 text-center text-[14px] font-semibold"
        >
          <span>일</span><span>월</span><span>화</span><span>수</span
          ><span>목</span><span>금</span><span>토</span>
        </div>
        <div
          ref="calendarRef"
          class="mt-2 grid grid-cols-7 gap-y-1 outline-none"
          role="grid"
          tabindex="0"
          :aria-activedescendant="activeDateId"
          @keydown="handleCalendarKeydown"
        >
          <button
            v-for="day in calendarDays"
            :id="getDateId(day.date)"
            :key="formatDate(day.date)"
            type="button"
            role="gridcell"
            :aria-selected="
              selectedDate && isSameDay(day.date, selectedDate)
                ? 'true'
                : 'false'
            "
            :aria-disabled="day.disabled ? 'true' : 'false'"
            :disabled="day.disabled"
            tabindex="-1"
            class="flex h-10 w-10 items-center justify-center"
            :class="[
              'rounded-full text-[16px] tracking-[-0.32px] transition-colors',
              day.disabled && 'text-krds-gray-50 cursor-not-allowed',
              !day.disabled && !selectedDate && 'text-krds-gray-80',
              selectedDate &&
                isSameDay(day.date, selectedDate) &&
                'bg-krds-primary-60 text-krds-white font-semibold',
              isSameDay(day.date, new Date()) &&
                !day.disabled &&
                !selectedDate &&
                'bg-krds-gray-80 text-krds-white font-semibold',
              !day.disabled && 'hover:bg-krds-gray-5',
            ]"
            @click="selectDate(day.date)"
            @mouseenter="activeDate = day.date"
          >
            {{ day.date.getDate() }}
          </button>
        </div>
      </div>

      <div class="border-krds-gray-20 border-t">
        <div class="flex items-center justify-between px-4 py-3 text-[15px]">
          <button
            type="button"
            class="text-krds-primary-70 font-semibold"
            @click="handleToday"
          >
            오늘
          </button>
          <button
            type="button"
            class="text-krds-gray-80"
            @click="closeCalendar"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
