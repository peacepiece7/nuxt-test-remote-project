<script setup lang="ts">
  import { computed, nextTick, ref } from 'vue'
  import { useFormContext } from 'vee-validate'
  import Input from '@/components/hanui/Input.vue'

  interface Props {
    firName: string
    secName: string
    thrName: string
    size?: 'md' | 'lg'
    disabled?: boolean
    readonly?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    disabled: false,
    readonly: false,
  })

  const { values, errorBag, setFieldValue } = useFormContext()

  const onlyNumber = (v: string) => v.replace(/\D/g, '')

  /* -----------------------
   local models (3-4-4, set 시 각각 최대 3/4/4자리)
  ----------------------- */

  const fir = computed({
    get: () => (values[props.firName] ?? '') as string,
    set: (v: string) => {
      const next = onlyNumber(v).slice(0, 3)
      if ((values[props.firName] ?? '') === next) return
      setFieldValue(props.firName, next)
    },
  })

  const sec = computed({
    get: () => (values[props.secName] ?? '') as string,
    set: (v: string) => {
      const next = onlyNumber(v).slice(0, 4)
      if ((values[props.secName] ?? '') === next) return
      setFieldValue(props.secName, next)
    },
  })

  const thr = computed({
    get: () => (values[props.thrName] ?? '') as string,
    set: (v: string) => {
      const next = onlyNumber(v).slice(0, 4)
      if ((values[props.thrName] ?? '') === next) return
      setFieldValue(props.thrName, next)
    },
  })

  /* -----------------------
  에러 메시지 계산 로직 (AddressInput과 동일 패턴)
----------------------- */
  const firErrorMessage = computed(() => {
    const bags = errorBag.value[props.firName]
    return Array.isArray(bags) ? bags : typeof bags === 'string' ? [bags] : []
  })

  const secErrorMessage = computed(() => {
    const bags = errorBag.value[props.secName]
    return Array.isArray(bags) ? bags : typeof bags === 'string' ? [bags] : []
  })

  const thrErrorMessage = computed(() => {
    const bags = errorBag.value[props.thrName]
    return Array.isArray(bags) ? bags : typeof bags === 'string' ? [bags] : []
  })

  const phoneGroupErrors = computed(() => [
    ...firErrorMessage.value,
    ...secErrorMessage.value,
    ...thrErrorMessage.value,
  ])

  /* -----------------------
   refs & @input: 최대 길이 시 다음 칸으로 포커스 (3-4-4)
  ----------------------- */
  const firInputRef = ref<InstanceType<typeof Input> | null>(null)
  const secInputRef = ref<InstanceType<typeof Input> | null>(null)
  const thrInputRef = ref<InstanceType<typeof Input> | null>(null)

  const focusSec = () => {
    nextTick(() => {
      const el = secInputRef.value?.$el as HTMLElement | undefined
      el?.querySelector<HTMLInputElement>('input')?.focus()
    })
  }

  const focusThr = () => {
    nextTick(() => {
      const el = thrInputRef.value?.$el as HTMLElement | undefined
      el?.querySelector<HTMLInputElement>('input')?.focus()
    })
  }

  const onFirInput = (_value?: string) => {
    const raw = onlyNumber((_value ?? values[props.firName] ?? '') as string)
    const normalized = raw.slice(0, 3)
    if ((values[props.firName] ?? '') !== normalized)
      setFieldValue(props.firName, normalized)
    if (normalized.length >= 3) focusSec()
  }

  const onSecInput = (_value?: string) => {
    const raw = onlyNumber((_value ?? values[props.secName] ?? '') as string)
    const normalized = raw.slice(0, 4)
    if ((values[props.secName] ?? '') !== normalized)
      setFieldValue(props.secName, normalized)
    if (normalized.length >= 4) focusThr()
  }

  const onThrInput = (_value?: string) => {
    const raw = onlyNumber((_value ?? values[props.thrName] ?? '') as string)
    const normalized = raw.slice(0, 4)
    if ((values[props.thrName] ?? '') !== normalized)
      setFieldValue(props.thrName, normalized)
  }
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-nowrap items-center gap-2">
      <div class="min-w-12 shrink-0">
        <VFormField :name="firName">
          <Input
            ref="firInputRef"
            v-model="fir"
            type="tel"
            inputmode="numeric"
            placeholder="010"
            class="w-full text-center"
            :size="size"
            :disabled="disabled"
            :max-length="3"
            :readonly="readonly"
            @update:model-value="onFirInput"
          />
        </VFormField>
      </div>
      <span class="text-krds-gray-60 shrink-0">-</span>
      <div class="min-w-12 shrink-0">
        <VFormField :name="secName">
          <Input
            ref="secInputRef"
            v-model="sec"
            type="tel"
            inputmode="numeric"
            placeholder="1234"
            class="w-full text-center"
            :size="size"
            :disabled="disabled"
            :max-length="4"
            :readonly="readonly"
            @update:model-value="onSecInput"
          />
        </VFormField>
      </div>
      <span class="text-krds-gray-60 shrink-0">-</span>
      <div class="min-w-12 shrink-0">
        <VFormField :name="thrName">
          <Input
            ref="thrInputRef"
            v-model="thr"
            type="tel"
            inputmode="numeric"
            placeholder="5678"
            class="w-full text-center"
            :size="size"
            :disabled="disabled"
            :max-length="4"
            :readonly="readonly"
            @update:model-value="onThrInput"
          />
        </VFormField>
      </div>
    </div>
    <VFormError :error-message="phoneGroupErrors?.[0]" />
  </div>
</template>
