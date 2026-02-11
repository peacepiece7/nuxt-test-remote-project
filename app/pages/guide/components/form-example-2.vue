<script setup lang="ts">
  import * as yup from 'yup'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import FormLabel from '@/components/hanui/FormLabel.vue'
  import Button from '@/components/hanui/Button.vue'
  import PhoneInput from '@/components/hanui/PhoneInput.vue'
  import TelNumberInput from '@/components/hanui/TelNumberInput.vue'
  import AddressInput from '@/components/molecules/AddressInput.vue'

  useHead({
    title: '전화번호/주소 Form 예시 - 가이드',
  })

  const formSchema = yup.object({
    // PhoneInput: firName, secName, thrName 세 필드로 휴대전화 번호를 관리한다.
    'fir-phone': yup
      .string()
      .required('휴대전화 앞자리를 입력해주세요')
      .matches(/^\d{2,3}$/, '2~3자리 숫자를 입력해주세요'),
    'sec-phone': yup
      .string()
      .required('휴대전화 중간자리를 입력해주세요')
      .matches(/^\d{3,4}$/, '3~4자리 숫자를 입력해주세요'),
    'thr-phone': yup
      .string()
      .required('휴대전화 끝자리를 입력해주세요')
      .matches(/^\d{4}$/, '4자리 숫자를 입력해주세요'),
    'tel-fir': yup
      .string()
      .required('유선전화 앞자리를 입력해주세요')
      .matches(/^\d{2,4}$/, '2~4자리 숫자를 입력해주세요'),
    'tel-sec': yup
      .string()
      .required('유선전화 중간자리를 입력해주세요')
      .matches(/^\d{4}$/, '4자리 숫자를 입력해주세요'),
    'tel-thr': yup
      .string()
      .required('유선전화 끝자리를 입력해주세요')
      .matches(/^\d{4}$/, '4자리 숫자를 입력해주세요'),

    // AddressInput 이 사용하는 필드들 (실제 유효성 검사는 이쪽 위주로 걸어 둔다)
    zipCode: yup.string().required('우편번호를 입력해주세요'),
    address: yup.string().required('주소를 입력해주세요'),
    detailAddress: yup.string().required('상세주소를 입력해주세요'),
    lat: yup.string().optional(),
    lng: yup.string().optional(),
  })

  type FormValues = yup.InferType<typeof formSchema>

  const initialValues: FormValues = {
    'fir-phone': '',
    'sec-phone': '',
    'thr-phone': '',
    'tel-fir': '',
    'tel-sec': '',
    'tel-thr': '',
    zipCode: '',
    address: '',
    detailAddress: '',
    lat: '',
    lng: '',
  }

  const { handleSubmit, values, setValues, resetForm } = useForm<FormValues>({
    validationSchema: toTypedSchema(formSchema),
    initialValues: { ...initialValues },
  })

  const formatPhoneFromParts = (p: FormValues) =>
    [p['fir-phone'], p['sec-phone'], p['thr-phone']]
      .filter(Boolean)
      .join('-') || '(비어 있음)'

  const formatTelFromParts = (p: FormValues) =>
    [p['tel-fir'], p['tel-sec'], p['tel-thr']].filter(Boolean).join('-') ||
    '(비어 있음)'

  const onSubmit = (payload: FormValues) => {
    // eslint-disable-next-line no-alert
    alert(
      [
        '제출 값:',
        `휴대전화(PhoneInput): ${formatPhoneFromParts(payload)}`,
        `유선전화(TelNumberInput): ${formatTelFromParts(payload)}`,
        `우편번호: ${payload.zipCode || '(비어 있음)'}`,
        `주소: ${payload.address || '(비어 있음)'}`,
        `상세주소: ${payload.detailAddress || '(비어 있음)'}`,
        `위도(lat): ${payload.lat || '(비어 있음)'}`,
        `경도(lng): ${payload.lng || '(비어 있음)'}`,
      ].join('\n'),
    )
  }

  // -----------------------------
  // setValues 예제용 payload
  // -----------------------------
  const setValuesPayload: FormValues = {
    'fir-phone': '010',
    'sec-phone': '1234',
    'thr-phone': '5678',
    'tel-fir': '02',
    'tel-sec': '9876',
    'tel-thr': '5432',
    zipCode: '04524',
    address: '서울특별시 중구 세종대로 110',
    detailAddress: '정부서울청사 1동',
    lat: '37.5665',
    lng: '126.978',
  }

  const applySetValuesUpdate = () => {
    setValues(setValuesPayload)
  }

  // -----------------------------
  // 두 번째 예제용 payload (폰/유선/주소 값을 다른 값으로 교체)
  // -----------------------------
  const vModelPayload = {
    'fir-phone': '010',
    'sec-phone': '9999',
    'thr-phone': '0000',
    'tel-fir': '031',
    'tel-sec': '1234',
    'tel-thr': '5678',
    zipCode: '12345',
    address: '경기도 성남시 분당구 불정로 6',
    detailAddress: 'N빌딩 12층',
  }

  const applyVModelUpdate = () => {
    setValues({
      ...values,
      'fir-phone': vModelPayload['fir-phone'],
      'sec-phone': vModelPayload['sec-phone'],
      'thr-phone': vModelPayload['thr-phone'],
      'tel-fir': vModelPayload['tel-fir'],
      'tel-sec': vModelPayload['tel-sec'],
      'tel-thr': vModelPayload['tel-thr'],
      zipCode: vModelPayload.zipCode,
      address: vModelPayload.address,
      detailAddress: vModelPayload.detailAddress,
    } as FormValues)
  }

  const handleReset = () => {
    resetForm()
  }
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">전화번호 / 주소 Form 예시</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-8">
        아래 폼은
        <code class="bg-krds-gray-5 rounded px-1">PhoneInput</code>,
        <code class="bg-krds-gray-5 rounded px-1">TelNumberInput</code>,
        <code class="bg-krds-gray-5 rounded px-1">AddressInput</code>
        세 컴포넌트를 함께 사용하는 예시입니다.
        <br />
        주소 필드는
        <code class="bg-krds-gray-5 rounded px-1">yup</code> /
        <code class="bg-krds-gray-5 rounded px-1">vee-validate</code>로 필수값
        검증이 걸려 있고, 전화번호 필드는 추후 컴포넌트 개선 시 검증 로직을
        강화할 수 있도록 여지를 남겨두었습니다.
      </p>

      <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
        <Card class="min-w-0 flex-1">
          <Heading level="h2" class="mb-6">
            전화번호 / 주소 입력 필수 예시
          </Heading>

          <div class="mb-6 flex shrink-0 justify-end gap-2 lg:sticky lg:top-6">
            <Button
              variant="secondary"
              size="md"
              type="button"
              @click="applySetValuesUpdate"
            >
              setValues 로 업데이트
            </Button>
            <Button
              variant="secondary"
              size="md"
              type="button"
              @click="applyVModelUpdate"
            >
              v-model 업데이트
            </Button>
            <Button
              variant="outline"
              size="md"
              type="button"
              @click="handleReset"
            >
              초기화
            </Button>
          </div>

          <form
            class="flex flex-col gap-6"
            @submit.prevent="
              (e) => {
                handleSubmit(onSubmit)(e)
              }
            "
          >
            <!-- 휴대전화 번호 (PhoneInput 사용) -->
            <FormLabel>휴대전화 번호 (필수 예시)</FormLabel>
            <div class="text-krds-gray-60 mb-1 text-sm">
              <span class="text-krds-error">* </span>
              PhoneInput 컴포넌트는
              <code class="bg-krds-gray-5 rounded px-1">firName</code>,
              <code class="bg-krds-gray-5 rounded px-1">secName</code>,
              <code class="bg-krds-gray-5 rounded px-1">thrName</code>
              세 필드와 연동되며, 각 구간을 따로 검증합니다.
            </div>
            <div class="text-krds-gray-60 mb-1 text-xs">
              필드 값: {{ formatPhoneFromParts(values) }}
            </div>
            <PhoneInput
              fir-name="fir-phone"
              sec-name="sec-phone"
              thr-name="thr-phone"
            />

            <!-- 유선전화 번호 (TelNumberInput 사용, 4-4-4 / 인터넷·지역·휴대 공통) -->
            <FormLabel>유선전화 번호 (필수 예시)</FormLabel>
            <div class="text-krds-gray-60 mb-1 text-sm">
              <span class="text-krds-error">* </span>
              TelNumberInput 컴포넌트는
              <code class="bg-krds-gray-5 rounded px-1">firName</code>,
              <code class="bg-krds-gray-5 rounded px-1">secName</code>,
              <code class="bg-krds-gray-5 rounded px-1">thrName</code>
              세 필드와 연동되며, 4-4-4 형식(인터넷/지역/휴대 공통)입니다.
            </div>
            <div class="text-krds-gray-60 mb-1 text-xs">
              필드 값: {{ formatTelFromParts(values) }}
            </div>
            <TelNumberInput
              fir-name="tel-fir"
              sec-name="tel-sec"
              thr-name="tel-thr"
            />

            <!-- 주소 (AddressInput 사용 / 실제 필수 검증 적용) -->
            <div class="space-y-2">
              <FormLabel>주소 (필수)</FormLabel>
              <div class="text-krds-gray-60 mb-1 text-sm">
                <span class="text-krds-error">* </span>
                우편번호, 주소, 상세주소 모두
                <code class="bg-krds-gray-5 rounded px-1">yup</code> 스키마로
                필수값 검증이 적용됩니다.
              </div>
              <div class="text-krds-gray-60 mb-1 text-xs">
                필드 값:
                {{ values.zipCode || '(우편번호 없음)' }} /
                {{ values.address || '(주소 없음)' }} /
                {{ values.detailAddress || '(상세주소 없음)' }}
              </div>
              <AddressInput
                zpcd-name="zipCode"
                addr-name="address"
                dtl-addr-name="detailAddress"
                lat-name="lat"
                lng-name="lng"
              />
              <!-- AddressInput 내부에서 VFormError 를 사용해 그룹 에러를 표시 -->
            </div>

            <Button variant="primary" size="md" type="submit"> 제출 </Button>
          </form>
        </Card>
      </div>
    </Container>
  </div>
</template>
