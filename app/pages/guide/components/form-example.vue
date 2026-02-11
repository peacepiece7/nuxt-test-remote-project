<script setup lang="ts">
  import * as yup from 'yup'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import FormLabel from '@/components/hanui/FormLabel.vue'
  import Input from '@/components/hanui/Input.vue'
  import Textarea from '@/components/hanui/Textarea.vue'
  import Button from '@/components/hanui/Button.vue'
  import Select from '@/components/hanui/Select.vue'
  import Switch from '@/components/hanui/Switch.vue'
  import Radio from '@/components/hanui/Radio.vue'
  import Checkbox from '@/components/hanui/Checkbox.vue'

  useHead({
    title: 'Form 예시 - 가이드',
  })

  const formSchema = yup.object({
    applicant: yup.string().required('신청자를 입력해주세요'),
    email: yup
      .string()
      .required('이메일을 입력해주세요')
      .email('올바른 이메일 형식이 아닙니다'),
    gender: yup.string().required('성별을 선택해주세요'),
    contactMethod: yup.string().required('연락 방법을 선택해주세요'),
    certifications: yup
      .array()
      .of(yup.string().required())
      .min(1, '자격증을 1개 이상 선택해주세요')
      .default([]),
    sportsClubOpen: yup.boolean().optional().default(false),
    sportsClubOpenYear: yup
      .string()
      .required('스포츠클럽 개설 연도를 선택해주세요'),
    sportsClubApplyMonth: yup
      .string()
      .required('스포츠클럽 신청 연월을 선택해주세요'),
    age: yup
      .string()
      .required('나이를 입력해주세요')
      .test('min', '0 이상 입력해주세요', (v) => !v || Number(v) >= 0)
      .test('max', '120 이하로 입력해주세요', (v) => !v || Number(v) <= 120),
    birthDate: yup.string().required('생년월일을 선택해주세요'),
    attachment: yup.array().min(1, '파일을 1개 이상 첨부해주세요').default([]),
    bio: yup.string().required('소개를 입력해주세요'),
    editorContent: yup.string().required('에디터 내용을 입력해주세요'),
  })

  type FormValues = yup.InferType<typeof formSchema>

  const initialValues = {
    applicant: '',
    email: '',
    gender: '' as string,
    contactMethod: '' as string,
    certifications: [] as FormValues['certifications'],
    sportsClubOpen: false as boolean,
    sportsClubOpenYear: '',
    sportsClubApplyMonth: '',
    age: '',
    birthDate: '',
    attachment: [] as FormValues['attachment'],
    bio: '',
    editorContent: '',
  }

  const genderOptions = [
    { value: 'M', label: '남성' },
    { value: 'F', label: '여성' },
    { value: 'X', label: '기타' },
  ]

  const contactMethodOptions = [
    { value: 'phone', label: '전화번호' },
    { value: 'message', label: '문자' },
    { value: 'sms', label: 'SMS' },
  ]

  const certificationOptions = [
    { value: 'license', label: '자격증' },
    { value: 'coach-1', label: '체육지도자 1급' },
    { value: 'coach-2', label: '체육지도자 2급' },
    { value: 'coach-3', label: '체육지도자 3급' },
  ]

  const { handleSubmit, values, errors, setValues, setFieldValue, resetForm } =
    useForm<FormValues>({
      validationSchema: toTypedSchema(formSchema),
      initialValues: { ...initialValues },
    })

  const attachDocOptions = {
    atchDocNm: '첨부파일',
    atchDocMthCtet: '<p>PDF, 이미지 등 필요한 서류를 첨부해주세요.</p>',
    formTpCd: '20',
    atchDocKindList: '*.pdf;*.jpg;*.jpeg;*.png',
  }

  const onSubmit = (payload: FormValues) => {
    // eslint-disable-next-line no-alert
    const fileNames =
      payload.attachment?.length > 0
        ? payload.attachment.map((f: { name: string }) => f.name).join(', ')
        : '(없음)'
    const sportsClubOpenLabel = sportsClubOpenValue.value
      ? '개설함'
      : '개설 안 함'
    const genderLabel =
      genderOptions.find((o) => o.value === genderValue.value)?.label ??
      '(비어 있음)'
    const contactMethodLabel =
      contactMethodOptions.find((o) => o.value === payload.contactMethod)
        ?.label ?? '(비어 있음)'
    const certificationLabels =
      (payload.certifications?.length ?? 0) > 0
        ? (payload.certifications ?? [])
            .map(
              (v) =>
                certificationOptions.find((o) => o.value === v)?.label ?? v,
            )
            .join(', ')
        : '(비어 있음)'
    alert(
      `제출 값:\n신청자: ${payload.applicant || '(비어 있음)'}\n이메일: ${payload.email}\n성별: ${genderLabel}\n연락 방법: ${contactMethodLabel}\n자격증: ${certificationLabels}\n스포츠클럽 개설 여부: ${sportsClubOpenLabel}\n스포츠클럽 개설 연도: ${sportsClubOpenYearValue.value || '(비어 있음)'}\n스포츠클럽 신청 연월: ${sportsClubApplyMonthValue.value || '(비어 있음)'}\n나이: ${payload.age}\n생년월일: ${payload.birthDate || '(비어 있음)'}\n첨부파일: ${fileNames}\n소개: ${payload.bio || '(비어 있음)'}\n에디터 내용: ${payload.editorContent ? '(HTML 입력됨)' : '(비어 있음)'}`,
    )
  }

  const applicantValue = ref<string>('')
  const birthDateValue = ref<string>('')
  const certificationValue = ref<string[]>([])
  const contactMethodValue = ref<string>('')
  const emailValue = ref<string>('')
  const genderValue = ref<string>('')
  const sportsClubOpenValue = ref<boolean>(false)
  const sportsClubOpenYearValue = ref<string>('')
  const sportsClubApplyMonthValue = ref<string>('')
  const ageValue = ref<string>('')
  const bioValue = ref<string>('')
  const editorContentValue = ref<string>('')
  const attachmentValue = ref(useFileSave(() => ''))

  const birthDateMin = '1950-01-01'
  const birthDateMax = computed(() => new Date().toISOString().slice(0, 10))

  const setValuesPayload: any = {
    applicant: '홍길동',
    email: 'setvalue@example.com',
    gender: 'F',
    contactMethod: 'phone',
    certifications: ['license', 'coach-1'],
    sportsClubOpen: true,
    sportsClubOpenYear: '2020',
    sportsClubApplyMonth: '2026-02',
    age: '25',
    birthDate: '1999-01-15',
    attachment: [
      {
        name: 'set-values.pdf',
        size: 1812144,
        sortSeqNo: -1,
        file: '',
        fileUuid: '1234567890',
      },
    ],
    bio: 'setValues로 채운 소개 텍스트입니다.',
    editorContent:
      '<p>setValues로 채운 <strong>에디터</strong> 내용입니다.</p><p>리치 텍스트를 입력할 수 있습니다.</p>',
  }

  const applySetValuesUpdate = () => {
    setValues(setValuesPayload)
  }

  const vModelPayload: any = {
    applicant: '김철수',
    email: 'vmodel@example.com',
    gender: 'X',
    contactMethod: 'sms',
    certifications: ['coach-2', 'coach-3'],
    sportsClubOpen: false,
    sportsClubOpenYear: '2018',
    sportsClubApplyMonth: '2025-11',
    age: '30',
    birthDate: '1994-06-20',
    bio: 'v-model(ref)로 채운 소개 텍스트입니다.',
    editorContent:
      '<p>v-model로 채운 <strong>에디터</strong> 내용입니다.</p><ul><li>목록 항목 1</li><li>목록 항목 2</li></ul>',
    attachment: [
      {
        name: 'update-model-value.pdf',
        size: 1812144,
        sortSeqNo: -1,
        file: '',
        fileUuid: '1234567890',
      },
    ],
  }

  const applyVModelUpdate = () => {
    applicantValue.value = vModelPayload.applicant
    emailValue.value = vModelPayload.email
    genderValue.value = vModelPayload.gender
    contactMethodValue.value = vModelPayload.contactMethod
    certificationValue.value = vModelPayload.certifications ?? []
    sportsClubOpenValue.value = vModelPayload.sportsClubOpen
    sportsClubOpenYearValue.value = vModelPayload.sportsClubOpenYear
    sportsClubApplyMonthValue.value = vModelPayload.sportsClubApplyMonth
    ageValue.value = vModelPayload.age
    birthDateValue.value = vModelPayload.birthDate
    bioValue.value = vModelPayload.bio
    editorContentValue.value = vModelPayload.editorContent ?? ''
    attachmentValue.value.fileValue = vModelPayload.attachment
  }

  const handleReset = () => {
    resetForm()
    applicantValue.value = initialValues.applicant
    emailValue.value = initialValues.email
    genderValue.value = initialValues.gender
    contactMethodValue.value = initialValues.contactMethod
    certificationValue.value = initialValues.certifications ?? []
    sportsClubOpenValue.value = initialValues.sportsClubOpen
    sportsClubOpenYearValue.value = initialValues.sportsClubOpenYear
    sportsClubApplyMonthValue.value = initialValues.sportsClubApplyMonth
    ageValue.value = initialValues.age
    birthDateValue.value = initialValues.birthDate
    bioValue.value = initialValues.bio
    editorContentValue.value = initialValues.editorContent
  }

  onMounted(() => {})
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Form 예시</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        <code class="bg-krds-gray-5 rounded px-1">useForm</code>과 yup
        <code class="bg-krds-gray-5 rounded px-1">validationSchema</code>로 폼을
        정의하고, <code class="bg-krds-gray-5 rounded px-1">FormField</code>에
        <code class="bg-krds-gray-5 rounded px-1">id</code>,
        <code class="bg-krds-gray-5 rounded px-1">status</code>를 주어 검증
        에러와 연동합니다. Input/Textarea는 FormField 안에서
        <code class="bg-krds-gray-5 rounded px-1">id</code>,
        <code class="bg-krds-gray-5 rounded px-1">status</code>,
        <code class="bg-krds-gray-5 rounded px-1">aria-describedby</code>가 자동
        연결됩니다.
      </p>

      <div class="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start">
        <Card class="min-w-0 flex-1">
          <Heading level="h2" class="mb-6">Text / Number / Textarea</Heading>

          <div class="flex shrink-0 justify-end gap-2 lg:sticky lg:top-6">
            <Button
              variant="secondary"
              size="md"
              type="button"
              @click="applySetValuesUpdate"
            >
              setValue 로 업데이트
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
            <!-- 신청자 -->
            <VFormField name="applicant" required>
              <FormLabel>신청자</FormLabel>
              v-model:value: {{ applicantValue }}
              <Input
                v-model="applicantValue"
                type="text"
                placeholder="신청자 이름을 입력하세요"
              />
              <VFormError />
            </VFormField>

            <!-- 이메일 (에러 상태는 status로 전달, FormError에 메시지 표시) -->
            <VFormField name="email" required>
              <FormLabel>이메일</FormLabel>
              v-model:value: {{ emailValue }}
              <Input
                v-model="emailValue"
                type="email"
                placeholder="example@email.com"
              />
              <VFormError />
            </VFormField>

            <!-- 성별 -->
            <VFormField name="gender" required>
              <FormLabel>성별</FormLabel>
              v-model:value: {{ genderValue }}
              <Select
                v-model="genderValue"
                :options="genderOptions"
                placeholder="성별을 선택하세요"
              />
              <VFormError />
            </VFormField>

            <!-- 연락 방법 (전화번호 | 문자 | SMS) -->
            <VFormField name="contactMethod" required>
              <FormLabel>연락 방법</FormLabel>
              v-model:value: {{ contactMethodValue }}
              <div class="flex flex-wrap gap-5">
                <Radio
                  v-model="contactMethodValue"
                  name="contactMethod"
                  value="phone"
                  label="전화번호"
                />
                <Radio
                  v-model="contactMethodValue"
                  name="contactMethod"
                  value="message"
                  label="문자"
                />
                <Radio
                  v-model="contactMethodValue"
                  name="contactMethod"
                  value="sms"
                  label="SMS"
                />
              </div>
              <VFormError />
            </VFormField>

            <!-- 자격증, 체육지도자 1급, 체육지도자 2급, 체육지도자 3급 -->
            <VFormField name="certifications" required>
              <FormLabel>자격증</FormLabel>
              v-model:value: {{ certificationValue }}
              <div class="flex flex-wrap gap-5">
                <Checkbox
                  v-for="opt in certificationOptions"
                  :key="opt.value"
                  v-model="certificationValue"
                  name="certifications"
                  :value="opt.value"
                  :label="opt.label"
                />
              </div>
              <VFormError />
            </VFormField>

            <!-- 스포츠클럽 개설 여부 (ON=개설함, OFF=개설 안 함) -->
            <VFormField name="sportsClubOpen">
              <FormLabel>스포츠클럽 개설 여부</FormLabel>
              v-model:value: {{ sportsClubOpenValue }}
              <Switch
                v-model="sportsClubOpenValue"
                label="스포츠클럽 개설 여부"
                aria-label="스포츠클럽 개설 여부 (끔=개설 안 함, 켬=개설함)"
              />
              <VFormError />
            </VFormField>

            <!-- 스포츠클럽 개설 연도 -->
            <VFormField name="sportsClubOpenYear" required>
              <FormLabel>스포츠클럽 개설 연도</FormLabel>
              v-model:value: {{ sportsClubOpenYearValue }}
              <VDatePicker
                v-model="sportsClubOpenYearValue"
                year-picker
                placeholder="연도를 선택하세요"
              />
              <VFormError />
            </VFormField>

            <!-- 스포츠클럽 신청 연월 -->
            <VFormField name="sportsClubApplyMonth" required>
              <FormLabel>스포츠클럽 신청 연월</FormLabel>
              v-model:value: {{ sportsClubApplyMonthValue }}
              <VDatePicker
                v-model="sportsClubApplyMonthValue"
                month-picker
                placeholder="연월을 선택하세요"
              />
              <VFormError />
            </VFormField>

            <!-- 나이 -->
            <VFormField name="age" required>
              <FormLabel>나이</FormLabel>
              v-model:value: {{ ageValue }}
              <Input
                v-model="ageValue"
                type="number"
                placeholder="0"
                :min="0"
                :max="120"
              />
              <!-- <FormHelperText>나이는 최대 120살까지 입력 가능합니다.</FormHelperText> -->
              <VFormError />
            </VFormField>

            <!-- 생년월일 -->
            <VFormField name="birthDate" required>
              <FormLabel>생년월일</FormLabel>
              v-model:value: {{ birthDateValue }}
              <VDatePicker
                v-model="birthDateValue"
                placeholder="연도-월-일"
                :min-date="birthDateMin"
                :max-date="birthDateMax"
              />
              <VFormError />
            </VFormField>

            <!-- 첨부파일 -->
            <VFormField name="attachment" required>
              <FormLabel>첨부파일</FormLabel>
              v-model:value: {{ attachmentValue.fileValue }}
              <VFileUpload
                v-model="attachmentValue.fileValue"
                :total-size="10"
                :file-format="['pdf', 'jpg', 'jpeg', 'png']"
                :readonly-and-download="false"
                :accept="attachDocOptions.atchDocKindList"
                :disabled="false"
                :title="attachDocOptions.atchDocNm"
                :placeholder="attachDocOptions.atchDocMthCtet"
              />
              <VFormError />
            </VFormField>

            <!-- 소개 -->
            <VFormField name="bio" required>
              <FormLabel>소개</FormLabel>
              v-model:value: {{ bioValue }}
              <Textarea
                v-model="bioValue"
                placeholder="간단히 소개를 입력하세요"
              />
              <VFormError class="absolute bottom-[-0.5rem] left-0" />
            </VFormField>

            <!-- 에디터 (EditorRenderder) -->
            <VFormField name="editorContent" required>
              <FormLabel>에디터 내용</FormLabel>
              v-model:value:
              {{ editorContentValue }}
              <EditorRenderder
                v-model="editorContentValue"
                name="editorContent"
                renderer="editor"
              />
              <VFormError />
            </VFormField>

            <Button variant="primary" size="md" type="submit"> 제출 </Button>
          </form>
        </Card>
      </div>
    </Container>
  </div>
</template>
