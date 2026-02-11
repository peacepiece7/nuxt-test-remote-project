<script setup lang="ts">
  import { computed } from 'vue'
  import Input from '@/components/hanui/Input.vue'
  import Button from '@/components/hanui/Button.vue'
  import { useSearchAddress } from '@/composables/useSearchAddress'

  interface Props {
    zpcdName: string
    addrName: string
    dtlAddrName: string
    latName: string
    lngName: string
    readonly?: boolean
    class?: string
  }

  const props = defineProps<Props>()

  const { values, errorBag, setFieldValue } = useFormContext()

  /* -----------------------------
  에러 메시지 계산 로직
----------------------------- */
  const zipErrorMessage = computed(() => {
    const bags = errorBag.value[props.zpcdName]
    return Array.isArray(bags) ? bags : []
  })

  const addrErrorMessage = computed(() => {
    const bags = errorBag.value[props.addrName]
    return Array.isArray(bags) ? bags : []
  })

  const detailErrorMessage = computed(() => {
    const bags = errorBag.value[props.dtlAddrName]
    return Array.isArray(bags) ? bags : []
  })

  const addrGrouopErrorList = computed(() => {
    return [
      ...zipErrorMessage.value,
      ...addrErrorMessage.value,
      ...detailErrorMessage.value,
    ]
  })

  /* -----------------------------
 주소 검색
----------------------------- */
  const { openPopup } = useSearchAddress((type, data) => {
    if (type !== 'success' || !data) return

    setFieldValue(props.zpcdName, data.zonecode)
    setFieldValue(props.addrName, data.address)
    setFieldValue(props.dtlAddrName, data.addressDetail)
    setFieldValue(props.latName, String(data.lat))
    setFieldValue(props.lngName, String(data.lng))
    // // 대표 필드 터치 처리
    // addr.handleBlur()
  })

  // const addressGroupError = computed(() => {
  //   return zip.errorMessage || addr.errorMessage || detail.errorMessage
  // })
</script>

<template>
  <div class="flex flex-col gap-2" :class="props.class">
    <!-- 1줄 -->
    <div class="flex items-start gap-2">
      <VFormField :name="zpcdName" required>
        <Input
          :model-value="values[props.zpcdName]"
          placeholder="우편번호"
          readonly
          @update:model-value="(v) => setFieldValue(zpcdName, v)"
        />
      </VFormField>

      <VFormField :name="addrName" required>
        <Input
          class="flex-1"
          :model-value="values[props.addrName]"
          placeholder="주소"
          readonly
          @update:model-value="(v) => setFieldValue(addrName, v)"
        />
      </VFormField>

      <Button
        size="md"
        :variant="readonly ? 'secondary' : 'tertiary'"
        class="whitespace-nowrap"
        :disabled="readonly"
        @click="openPopup"
      >
        주소검색
      </Button>
    </div>

    <!-- 2줄 -->
    <VFormField :name="dtlAddrName" required>
      <Input
        :model-value="values[props.dtlAddrName]"
        placeholder="상세주소"
        :readonly="readonly"
        clearable
        @update:model-value="(v) => setFieldValue(dtlAddrName, v)"
      />
      <VFormError :error-message="addrGrouopErrorList?.[0]" />
    </VFormField>
  </div>
</template>
