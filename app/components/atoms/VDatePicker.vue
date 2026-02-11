<script setup lang="ts">
  import {
    VueDatePicker,
    type DatePickerMonthYearSlotProps,
  } from '@vuepic/vue-datepicker'
  import { cva } from 'class-variance-authority'
  import { ko } from 'date-fns/locale'
  import type { Locale } from 'date-fns/locale'
  import dayjs from 'dayjs'
  import { cn } from '@/lib/utils'

  /**
   * width는 디자인 시스템 기준으로 항상 w-full 고정.
   * size는 입력 높이만 제어 (md=48px, lg=56px)
   */

  defineOptions({
    inheritAttrs: false,
  })

  export type DatePickerSize = 'md' | 'lg'

  export type DatePickerProps = {
    /**
     * v-model 값 (string only: 'YYYY-MM-DD' | '')
     */
    modelValue: string
    class?: string
    // ===== 선택 모드 =====
    /** 월 선택 모드 */
    monthPicker?: boolean
    /** 년 선택 모드 */
    yearPicker?: boolean
    /** 분기 선택 모드 */
    quarterPicker?: boolean

    // ===== 에러 상태 =====
    /** 에러 상태 */
    error?: ComputedRef<boolean> | boolean
    /** 에러 메시지 ID (aria-describedby용) */
    errorMessageId?: ComputedRef<string> | string

    // ===== UI 설정 =====
    /** 입력 사이즈 */
    size?: DatePickerSize

    /** 플레이스홀더 */
    placeholder?: string
    /** 텔레포트 위치 */
    teleport?: string

    // ===== 동작 설정 =====
    /** 비활성화 */
    disabled?: boolean
    /** 읽기 전용 */
    readonly?: boolean
    /** 자동 적용 (확인 버튼 없이 즉시 적용) */
    autoApply?: boolean

    // ===== 날짜 제한 =====
    /** 최소 날짜 (string: 'YYYY-MM-DD') */
    minDate?: string | undefined
    /** 최대 날짜 (string: 'YYYY-MM-DD') */
    maxDate?: string | undefined
    /** 시작 날짜 (string: 'YYYY-MM-DD') */
    startDate?: string | undefined
    // ===== 포맷 및 로케일 =====
    /** 로케일 (기본값: ko) */
    locale?: Locale
  }

  const props = withDefaults(defineProps<DatePickerProps>(), {
    modelValue: '',
    class: undefined,
    monthPicker: false,
    yearPicker: false,
    quarterPicker: false,
    size: 'md',
    placeholder: '연도-월-일',
    disabled: false,
    readonly: false,
    autoApply: true,
    minDate: undefined,
    maxDate: undefined,
    startDate: dayjs().format('YYYY-MM-DD'),
    locale: () => ko,
    teleport: undefined,
    error: undefined,
    errorMessageId: undefined,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const formField = inject(FormFieldContextKey, null)

  const error = computed(() => unref(props.error))
  const errorMessageId = computed(() => unref(props.errorMessageId))

  const datePickerRootVariants = cva('!w-full', {
    variants: {
      size: {
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  })

  const datePickerInputWrapVariants = cva('relative !w-full', {
    variants: {
      size: {
        md: 'h-12', // 48px
        lg: 'h-14', // 56px
      },
    },
    defaultVariants: {
      size: 'md',
    },
  })

  const rootClass = computed(() =>
    cn(datePickerRootVariants({ size: props.size }), props.class),
  )

  // VueDatePicker에 전달되는 값 (string only)
  const pickerValue = ref<string>('')

  // 사용자가 입력한 텍스트 값 (TextField에 표시, pickerValue 업데이트와 독립적)
  const userInputValue = ref<string>('')

  // ref는 null 허용
  const datePickerRef = ref<InstanceType<typeof VueDatePicker> | null>(null)

  // 날짜를 표시 형식으로 포맷팅
  const formatForDisplay = (value: string): string => {
    if (!value) return ''

    const d = dayjs(value)
    if (!d.isValid()) return value

    if (props.monthPicker) return d.format('YYYY년 MM월')
    if (props.quarterPicker) {
      const q = Math.ceil((d.month() + 1) / 3)
      return `${d.format('YYYY')}년 ${q}분기`
    }
    if (props.yearPicker) {
      const date = dayjs(`${value.toString().slice(0, 4)}-01-01`)
      return date.format('YYYY년')
    }

    return d.format('YYYY-MM-DD')
  }

  // modelValue → 내부 동기화 (렌더 안정)
  watch(
    () => props.modelValue,
    (value) => {
      if (typeof window === 'undefined') return
      pickerValue.value = value || ''
      userInputValue.value = formatForDisplay(value)
    },
    { immediate: true },
  )

  // VueDatePicker에서 캘린더로 날짜 선택 시 userInputValue 동기화
  watch(pickerValue, (value) => {
    if (typeof window === 'undefined') return

    // pickerValue가 변경되면 (캘린더 선택 등) userInputValue도 업데이트
    if (value) {
      userInputValue.value = formatForDisplay(value)
    } else {
      userInputValue.value = ''
    }
  })

  // emit은 여기서만
  const commit = () => {
    // 사용자가 입력을 하지 않거나 모두 지웠고, 캘린더도 선택된 값이 없을 경우 modelValue를 업데이트 하지 않음
    // 유효성 검사 컨벤션을 다른 input과 동일하게 맞추기 위함
    if (!userInputValue.value && !pickerValue.value) return

    emit('update:modelValue', pickerValue.value || '')
  }

  // TextField 입력 처리 - 사용자 입력값만 업데이트, pickerValue는 업데이트하지 않음
  const handleInput = (value: string) => {
    // 사용자가 입력하는 값은 그대로 유지
    userInputValue.value = value
  }

  // userInputValue를 정규화하여 pickerValue와 동기화 (blur 시 호출)
  const syncUserInputToPickerValue = () => {
    if (!userInputValue.value) {
      pickerValue.value = ''
      userInputValue.value = ''
      return
    }

    // 입력값을 파싱하여 정규화
    let parsed: dayjs.Dayjs | null = null

    if (props.monthPicker) {
      // "2024년 01월" 형식 파싱
      const match = userInputValue.value.match(/(\d{4})년\s*(\d{1,2})월/)
      if (match) {
        const year = parseInt(match[1] || '')
        const month = parseInt(match[2] || '')
        parsed = dayjs(`${year}-${month.toString().padStart(2, '0')}-01`)
      } else {
        parsed = dayjs(userInputValue.value)
      }
    } else if (props.quarterPicker) {
      // "2024년 1분기" 형식 파싱
      const match = userInputValue.value.match(/(\d{4})년\s*(\d)분기/)
      if (match) {
        const year = parseInt(match[1] || '')
        const quarter = parseInt(match[2] || '')
        const quarterStartMonth = (quarter - 1) * 3 + 1
        parsed = dayjs(
          `${year}-${quarterStartMonth.toString().padStart(2, '0')}-01`,
        )
      } else {
        parsed = dayjs(userInputValue.value)
      }
    } else if (props.yearPicker) {
      // "2024년" 형식 파싱
      const match = userInputValue.value.match(/(\d{4})년/)
      if (match) {
        const year = parseInt(match[1] || '')
        parsed = dayjs(`${year}-01-01`)
      } else {
        parsed = dayjs(userInputValue.value || '')
      }
    } else {
      // 기본 날짜 형식 (YYYY-MM-DD)
      parsed = dayjs(userInputValue.value)
    }

    if (parsed && parsed.isValid()) {
      // minDate보다 작으면 parsed를 minDate로, maxDate보다 크면 parsed를 maxDate로
      if (props.minDate && parsed.isBefore(dayjs(props.minDate))) {
        parsed = dayjs(props.minDate)
      }
      if (props.maxDate && parsed.isAfter(dayjs(props.maxDate))) {
        parsed = dayjs(props.maxDate)
      }

      // 정규화된 형식으로 변환
      if (props.monthPicker) {
        pickerValue.value = parsed.format('YYYY-MM')
      } else if (props.quarterPicker) {
        const month = parsed.month() + 1
        const quarter = Math.ceil(month / 3)
        const quarterStartMonth = (quarter - 1) * 3 + 1
        pickerValue.value = parsed.format(
          `YYYY-${quarterStartMonth.toString().padStart(2, '0')}`,
        )
      } else if (props.yearPicker) {
        pickerValue.value = parsed.format('YYYY')
      } else {
        pickerValue.value = parsed.format('YYYY-MM-DD')
      }
      // 정규화된 값으로 userInputValue도 업데이트
      userInputValue.value = formatForDisplay(pickerValue.value)
    } else {
      // 유효하지 않은 값이면 pickerValue와 userInputValue 모두 초기화
      pickerValue.value = ''
      // 이전 유효한 값으로 복원 (modelValue가 있으면)
      if (props.modelValue) {
        userInputValue.value = formatForDisplay(props.modelValue)
      } else {
        userInputValue.value = ''
      }
    }
  }

  const datePickerClass = computed(() =>
    cn(
      'vuepick-datepicker !w-full',
      error.value && 'has-error',
      error.value && 'error',
    ),
  )

  // const datePickerWidthClass = computed(
  //   () => DATE_PICKER_WIDTH_CLASS[props.size],
  // )

  const normalizeMonthYear = (month: number, year: number) => {
    let nextMonth = month
    let nextYear = year

    while (nextMonth < 0) {
      nextMonth += 12
      nextYear -= 1
    }
    while (nextMonth > 11) {
      nextMonth -= 12
      nextYear += 1
    }

    return { month: nextMonth, year: nextYear }
  }

  const openYearPicker = (slotProps: DatePickerMonthYearSlotProps) => {
    const slot = slotProps as unknown as {
      openYearPicker?: () => void
      toggleYearPicker?: (value?: boolean) => void
      setYearPicker?: (value: boolean) => void
    }

    if (slot.openYearPicker) {
      slot.openYearPicker()
      return
    }
    if (slot.toggleYearPicker) {
      slot.toggleYearPicker(true)
      return
    }
    if (slot.setYearPicker) {
      slot.setYearPicker(true)
    }
  }

  const openMonthPicker = (slotProps: DatePickerMonthYearSlotProps) => {
    const slot = slotProps as unknown as {
      openMonthPicker?: () => void
      toggleMonthPicker?: (value?: boolean) => void
      setMonthPicker?: (value: boolean) => void
    }

    if (slot.openMonthPicker) {
      slot.openMonthPicker()
      return
    }
    if (slot.toggleMonthPicker) {
      slot.toggleMonthPicker(true)
      return
    }
    if (slot.setMonthPicker) {
      slot.setMonthPicker(true)
    }
  }

  // textInput 모드인지 확인
  const isTextInputMode = computed(() => {
    return !props.readonly
  })

  // 캘린더 열기/닫기 제어
  const openCalendar = () => {
    if (!datePickerRef.value) return

    // 이미 캘린더가 열려있는지 확인
    const calendarMenu = document.querySelector(
      '.dp__menu[role="dialog"]',
    ) as HTMLElement
    if (calendarMenu) {
      // 이미 열려있으면 아무것도 하지 않음
      return
    }

    const picker = datePickerRef.value as InstanceType<typeof VueDatePicker> & {
      openMenu?: () => void
      togglePicker?: () => void
    }

    if (picker.openMenu) {
      picker.openMenu()
    } else if (picker.togglePicker) {
      picker.togglePicker()
    }

    // 캘린더가 열린 후 포커스를 캘린더로 이동
    nextTick(() => {
      const calendarMenu = document.querySelector(
        '.dp__menu[role="dialog"]',
      ) as HTMLElement
      if (!calendarMenu) return

      const firstFocusableElement = calendarMenu.querySelector(
        '[tabindex="0"]',
      ) as HTMLElement
      ;(firstFocusableElement || calendarMenu).focus()
    })
  }

  // 캘린더 닫기
  const closeCalendar = () => {
    if (!datePickerRef.value) return

    const picker = datePickerRef.value as InstanceType<typeof VueDatePicker> & {
      closeMenu?: () => void
      togglePicker?: () => void
    }
    if (picker.closeMenu) {
      picker.closeMenu()
    } else if (picker.togglePicker) {
      // 캘린더가 열려있는지 확인
      const calendarMenu = document.querySelector(
        '.dp__menu[role="dialog"]',
      ) as HTMLElement
      if (calendarMenu) {
        picker.togglePicker()
      }
    }
  }

  // TextField focus 이벤트 핸들러
  const handleTextFieldFocus = (event: FocusEvent) => {
    // dayPicker + readonly가 아닌 경우 (textInput 모드): 캘린더 열지 않음
    if (isTextInputMode.value) {
      event.stopPropagation()
      return
    }
    // 그 외 경우: 캘린더 열기
    event.stopPropagation()
    openCalendar()
  }

  // TextField click 이벤트 핸들러
  const handleTextFieldClick = (event: MouseEvent) => {
    // dayPicker + readonly가 아닌 경우 (textInput 모드): 캘린더 열지 않음
    if (isTextInputMode.value) {
      event.stopPropagation()
      return
    }
    // 그 외 경우: 캘린더 열기
    event.stopPropagation()
    event.preventDefault()
    openCalendar()
  }

  // TextField Enter 키 핸들러
  const handleTextFieldEnter = (event: KeyboardEvent) => {
    // textInput 모드일 때만 처리
    if (isTextInputMode.value) {
      event.preventDefault()
      event.stopPropagation()
      // 입력값 동기화 및 캘린더 닫기
      syncUserInputToPickerValue()
      commit()
      closeCalendar()
    }
  }

  // 캘린더 닫힘 처리
  const handleCalendarClosed = () => {
    commit()
  }

  const handleTodayAction = (closePicker?: () => void) => {
    const today = dayjs()
    const nextValue = today.format('YYYY-MM-DD')
    pickerValue.value = nextValue
    userInputValue.value = formatForDisplay(nextValue)
    commit()
    closePicker?.()
  }

  const handleCloseAction = (closePicker?: () => void) => {
    closePicker?.()
  }

  // TextField blur 시 emit 및 캘린더 닫기
  const handleTextFieldBlur = () => {
    syncUserInputToPickerValue()
    commit()
    // textInput 모드일 때 캘린더 닫기
    if (isTextInputMode.value) {
      // closeCalendar()
    }
  }

  const handleCalendarOpened = () => {
    nextTick(() => {
      const el = document.querySelector('.dp--menu-wrapper') as HTMLElement
      if (!el) return

      el.style.transform = 'translate(0) !important'
      el.style.right = '0'
      el.style.left = 'unset'
      el.style.width = 'min-content'
    })
  }

  watch(
    () => props.modelValue,
    (newVal) => {
      if (newVal === formField?.value) return
      formField?.setValue?.(newVal)
    },
  )

  watch(
    () => formField?.value,
    (newVal) => {
      if (newVal === props.modelValue) return
      emit('update:modelValue', newVal)
    },
  )
</script>

<template>
  <div :class="rootClass">
    <ClientOnly>
      <VueDatePicker
        ref="datePickerRef"
        v-model="pickerValue"
        :week-start="0"
        :teleport="props.teleport"
        :month-picker="props.monthPicker"
        :year-picker="props.yearPicker"
        :quarter-picker="props.quarterPicker"
        :start-date="props.startDate"
        :auto-apply="props.autoApply"
        :min-date="props.minDate"
        :max-date="props.maxDate"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :locale="props.locale"
        :time-config="{ enableTimePicker: false }"
        model-type="yyyy-MM-dd"
        :class="datePickerClass"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="errorMessageId ?? undefined"
        @closed="handleCalendarClosed"
        @open="handleCalendarOpened"
      >
        <template #year="{ value }"> {{ value }}년 </template>
        <template
          v-if="!props.monthPicker && !props.yearPicker && !props.quarterPicker"
          #action-extra="{ selectCurrentDate }"
        >
          <div class="border-krds-gray-20 flex border-t px-[25px] py-2.5">
            <button
              title="Select current date"
              class="text-krds-primary-60 grow text-left font-medium"
              @click="selectCurrentDate()"
            >
              오늘
            </button>
            <button
              title="Close calendar"
              class="grow text-right"
              @click="closeCalendar()"
            >
              닫기
            </button>
          </div>
        </template>
        <template #dp-input>
          <div
            :class="
              cn(
                datePickerInputWrapVariants({ size: props.size }),
                !isTextInputMode && 'datepicker-readonly-field',
              )
            "
          >
            <Input
              :status="error ? 'error' : undefined"
              clearable
              :size="props.size"
              :input-id="$attrs.id"
              :model-value="userInputValue"
              :placeholder="props.placeholder"
              :readonly="props.readonly"
              :disabled="props.disabled"
              autocomplete="off"
              @update:model-value="handleInput"
              @blur="handleTextFieldBlur"
              @click="handleTextFieldClick"
            >
              <template #rightAddon>
                <IconButton
                  icon="calendar"
                  ariaLabel="캘린더"
                  color="var(--color-krds-gray-80)"
                  :class="
                    props.readonly ? 'cursor-default hover:bg-transparent' : ''
                  "
                  :size="24"
                  :disabled="props.disabled"
                  @click="openCalendar"
                />
              </template>
            </Input>
          </div>
        </template>
      </VueDatePicker>
      <template #fallback>
        <Input
          :size="props.size"
          :input-id="$attrs.id"
          :model-value="userInputValue"
          :placeholder="props.placeholder"
          :readonly="props.readonly"
          :disabled="props.disabled"
          autocomplete="off"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
  /* 아이콘 스타일 조정 */

  .vuepick-datepicker :deep(.dp__input_icon) {
    display: none;
  }

  /* Clear 버튼 숨기기 */
  .vuepick-datepicker :deep(.dp--clear-btn) {
    display: none;
  }

  .vuepick-datepicker :deep(.dp__input_wrap .relative) {
    pointer-events: auto;
  }

  /* 버튼 클릭 이벤트 보장 */
  .vuepick-datepicker :deep(.dp__input_wrap .pointer-events-auto) {
    pointer-events: auto !important;
  }

  /* readonly 모드일 때 TextField 전체가 cursor: pointer */
  .datepicker-readonly-field :deep(.pp-v-field) {
    cursor: pointer;
  }

  .datepicker-readonly-field :deep(.pp-v-field .v-field__input) {
    cursor: pointer;
  }

  .vuepick-datepicker :deep(.v-input__details) {
    display: none;
  }

  /* 에러 상태일 때 border를 빨간색으로 override */
  .vuepick-datepicker.has-error :deep(.v-field__outline),
  .vuepick-datepicker.error :deep(.v-field__outline) {
    color: rgb(var(--v-theme-error));
  }

  .vuepick-datepicker :deep(.v-field__append-inner) {
    background-color: var(--color-static-white) !important;
  }
  .vuepick-datepicker :deep(.v-field__append-inner svg) {
    opacity: 1 !important;
  }

  .vuepick-datepicker :deep(.dp__instance_calendar) {
    color: var(--color-neutral-text-body);
  }

  /* DatePicker panel */
  .vuepick-datepicker :deep(.dp__menu) {
    /* width: 280px; */
    background: var(--color-krds-white);
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    padding-top: 20px;
  }
  .vuepick-datepicker :deep(.dp__menu_inner) {
    padding: 0;
  }

  .vuepick-datepicker :deep(.dp__calendar[role='rowgroup']) {
    padding: 0 16px;
  }

  .vuepick-datepicker :deep(.dp__calendar_header) {
    padding: 0 16px;
    gap: 8px;
  }

  .vuepick-datepicker :deep(.dp__calendar_header_item) {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-krds-gray-80);
  }

  .vuepick-datepicker :deep(.dp__month_year_row) {
    padding: 0 8px 8px;
  }

  .vuepick-datepicker :deep(.dp__month_year_row button) {
    color: var(--color-krds-gray-80);
  }

  /* .vuepick-datepicker :deep(.dp--year-select){
    font-family: 'PretendardGOV';
    font-size: 20px;
    font-weight: 700;
    color: var(--color-krds-gray-90);
  } */

  .vuepick-datepicker :deep(.dp__overlay_cell) {
    font-size: 18px;
    font-weight: 600;
  }
  .vuepick-datepicker :deep(.dp__overlay_cell_active) {
    font-size: 18px;
    font-weight: 700;
  }
  .vuepick-datepicker :deep(.dp--year-mode-picker),
  .vuepick-datepicker :deep(.dp__month_year_wrap) {
    font-family: 'PretendardGOV';
    font-size: 20px;
    font-weight: 700;
    color: var(--color-krds-gray-90);
    display: flex;
    padding: 0 20px;
    align-items: center;
    justify-content: center;
    /* flex-direction: row-reverse; */
  }

  .vuepick-datepicker :deep(.dp__calendar_item) {
    padding: 4px;
  }

  .vuepick-datepicker :deep(.dp__cell_inner) {
    width: 32px;
    height: 32px;
    font-weight: 500;
    border-radius: 9999px;
    display: inline-flex;
    font-family: 'PretendardGOV';
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 1.5;
    color: var(--color-krds-gray-80);
  }
  .vuepick-datepicker :deep(.dp__arrow_top) {
    display: none;
  }
  .vuepick-datepicker :deep(.dp--header-wrap) {
    margin-bottom: 17px;
  }

  .vuepick-datepicker :deep(.dp__cell_offset) {
    color: var(--color-grey-500);
  }

  .vuepick-datepicker :deep(.dp__active_date) {
    background: var(--color-new-blue-600);
    color: var(--color-krds-white);
  }

  .vuepick-datepicker :deep(.dp__today) {
    background: var(--color-grey-800) !important;
    color: var(--color-krds-white);
    border: none;
  }

  .vuepick-datepicker :deep(.dp__cell_inner:hover) {
    background: rgba(24, 30, 37, 0.05);
  }

  /* Action row */
  .vuepick-datepicker :deep(.dp__action_row) {
    border-top: 1px solid var(--color-krds-gray-20);
    padding: 12px 16px 16px;
  }
  .vuepick-datepicker :deep(.dp-action-row) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
  }

  .vuepick-datepicker :deep(.dp__cell_disabled) {
    color: var(--color-grey-500);
  }
  .dp-action-button {
    font-weight: 600;
  }

  .dp-action-today {
    color: var(--color-krds-primary-70);
  }

  .dp-action-close {
    color: var(--color-krds-gray-80);
    font-weight: 500;
  }
</style>
