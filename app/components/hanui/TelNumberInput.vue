<script setup lang="ts">
  import { computed } from 'vue'
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
   local models (4-4-4, 각 파트 최대 4자리)
  ----------------------- */

  const fir = computed({
    get: () => (values[props.firName] ?? '') as string,
    set: (v: string) => {
      const next = onlyNumber(v).slice(0, 4)
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
   에러 메시지 계산 로직 (PhoneInput / AddressInput과 동일 패턴)
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

  const telGroupErrors = computed(() => [
    ...firErrorMessage.value,
    ...secErrorMessage.value,
    ...thrErrorMessage.value,
  ])
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-nowrap items-center gap-2">
      <div class="min-w-12 shrink-0">
        <VFormField :name="firName">
          <Input
            v-model="fir"
            type="tel"
            inputmode="numeric"
            placeholder="02"
            class="w-full text-center"
            :size="size"
            :disabled="disabled"
            :max-length="4"
            :readonly="readonly"
            @update:model-value="() => {}"
          />
        </VFormField>
      </div>
      <span class="text-krds-gray-60 shrink-0">-</span>
      <div class="min-w-12 shrink-0">
        <VFormField :name="secName">
          <Input
            v-model="sec"
            type="tel"
            inputmode="numeric"
            placeholder="1234"
            class="w-full text-center"
            :size="size"
            :disabled="disabled"
            :max-length="4"
            :readonly="readonly"
            @update:model-value="() => {}"
          />
        </VFormField>
      </div>
      <span class="text-krds-gray-60 shrink-0">-</span>
      <div class="min-w-12 shrink-0">
        <VFormField :name="thrName">
          <Input
            v-model="thr"
            type="tel"
            inputmode="numeric"
            placeholder="5678"
            class="w-full text-center"
            :size="size"
            :disabled="disabled"
            :max-length="4"
            :readonly="readonly"
            @update:model-value="() => {}"
          />
        </VFormField>
      </div>
    </div>
    <VFormError :error-message="telGroupErrors?.[0]" />
  </div>
</template>
