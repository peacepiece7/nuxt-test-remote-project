<script setup lang="ts">
  import { ref } from 'vue'
  import { useForm } from 'vee-validate'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Input from '@/components/hanui/Input.vue'
  import PhoneInput from '@/components/hanui/PhoneInput.vue'
  import TelNumberInput from '@/components/hanui/TelNumberInput.vue'
  import FormField from '@/components/hanui/FormField.vue'
  import FormLabel from '@/components/hanui/FormLabel.vue'
  import FormError from '@/components/hanui/FormError.vue'
  import FormHelperText from '@/components/hanui/FormHelperText.vue'
  import { Search, Mail } from 'lucide-vue-next'

  useHead({
    title: 'Input - 가이드',
  })

  // Tel Type 전용 폼 (PhoneInput / TelNumberInput은 useFormContext 사용)
  const telFormInitial = {
    'fir-phone': '',
    'sec-phone': '',
    'thr-phone': '',
    'tel-fir': '',
    'tel-sec': '',
    'tel-thr': '',
  }
  const { values: telFormValues } = useForm({
    initialValues: telFormInitial,
  })
  const formatPhoneFromParts = (v: typeof telFormInitial) =>
    [v['fir-phone'], v['sec-phone'], v['thr-phone']].filter(Boolean).join('-') ||
    '(비어 있음)'
  const formatTelFromParts = (v: typeof telFormInitial) =>
    [v['tel-fir'], v['tel-sec'], v['tel-thr']].filter(Boolean).join('-') ||
    '(비어 있음)'

  // 기본 예시
  const basicValue = ref('')
  const placeholderValue = ref('')

  // Size 예시
  const mdSize = ref('')
  const lgSize = ref('')

  // Type 예시
  const textType = ref('')
  const emailType = ref('')
  const passwordType = ref('')
  const passwordConfirm = ref('')
  const numberType = ref('')
  const numberWithMinMax = ref('')
  const urlType = ref('')
  const dateType = ref('')
  const dateWithMin = ref('')
  const dateWithMax = ref('')
  const dateWithMinMax = ref('')

  // FormField 사용 예시
  const username = ref('')
  const password = ref('')
  const age = ref('')
  const email = ref('')
  const emailError = ref('올바른 이메일 형식이 아닙니다.')

  // Status 예시
  const errorStatus = ref('잘못된 입력')
  const successStatus = ref('올바른 입력')
  const infoStatus = ref('정보 입력')

  // Disabled/Readonly 예시
  const disabledValue = ref('비활성화된 입력')
  const readonlyValue = ref('읽기 전용 입력')

  // Clearable 예시
  const clearableValue = ref('지울 수 있는 입력')

  // Addon 예시
  const leftAddonValue = ref('')
  const rightAddonValue = ref('')

  // Unit 예시
  const unitValue = ref('')
  const dateValue = ref('2025-12-01')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Input</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        텍스트 입력을 위한 Input 컴포넌트입니다. 다양한 타입, 크기, 상태를
        지원합니다.
      </p>

      <!-- Size -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>Medium (md) - 기본값</FormLabel>
                <Input
                  v-model="mdSize"
                  size="md"
                  placeholder="중간 크기"
                  clearable
                />
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Large (lg)</FormLabel>
                <Input v-model="lgSize" size="lg" placeholder="큰 크기" />
              </FormField>
            </div>
          </div>
        </Card>
      </div>
      <!-- Input Type -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Input Type </Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-8">
          다양한 입력 타입을 지원합니다. 각 타입은 모바일에서 적절한 키보드를
          표시하고, 브라우저의 기본 검증 기능을 활용합니다.
        </p>

        <!-- Text Type -->
        <div class="mb-12">
          <Heading level="h3" class="mb-4">Text - 텍스트 입력</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <FormField>
                  <FormLabel>기본 텍스트 입력</FormLabel>
                  <Input
                    v-model="textType"
                    type="text"
                    placeholder="이름을 입력하세요"
                  />
                  <FormHelperText
                    >일반적인 텍스트 입력에 사용됩니다.</FormHelperText
                  >
                </FormField>
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul
              class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm"
            >
              <li>
                <code class="bg-krds-gray-5 rounded px-1">type="text"</code>
                속성을 사용합니다.
              </li>
              <li>기본값이므로 type 속성을 생략해도 됩니다.</li>
              <li>모든 종류의 텍스트 입력에 사용할 수 있습니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Password Type -->
        <div class="mb-12">
          <Heading level="h3" class="mb-4">Password - 비밀번호 입력</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <FormField>
                  <FormLabel>비밀번호</FormLabel>
                  <Input
                    v-model="passwordType"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                  />
                  <FormHelperText
                    >비밀번호 타입은 자동으로 보기/숨기기 버튼이
                    표시됩니다.</FormHelperText
                  >
                </FormField>
              </div>
              <div>
                <FormField>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <Input
                    v-model="passwordConfirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                  <FormHelperText
                    >비밀번호 확인 시에도 동일하게 사용할 수
                    있습니다.</FormHelperText
                  >
                </FormField>
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul
              class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm"
            >
              <li>
                <code class="bg-krds-gray-5 rounded px-1">type="password"</code>
                속성을 사용합니다.
              </li>
              <li>입력된 텍스트가 자동으로 마스킹(●) 처리됩니다.</li>
              <li>오른쪽에 보기/숨기기 아이콘이 자동으로 표시됩니다.</li>
              <li>보기 버튼을 클릭하면 평문으로 확인할 수 있습니다.</li>
              <li>보안이 중요한 정보 입력에 사용합니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Number Type -->
        <div class="mb-12">
          <Heading level="h3" class="mb-4">Number - 숫자 입력</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <FormField>
                  <FormLabel>기본 숫자 입력</FormLabel>
                  <Input
                    v-model="numberType"
                    type="number"
                    placeholder="숫자를 입력하세요"
                    :min="0"
                    :max="100"
                  />
                  <FormHelperText
                    >모바일에서 숫자 키보드가 자동으로
                    표시됩니다.</FormHelperText
                  >
                </FormField>
              </div>
              <div>
                <FormField>
                  <FormLabel>최소/최대값 지정</FormLabel>
                  <Input
                    v-model="numberWithMinMax"
                    type="number"
                    placeholder="나이 (0-120)"
                    :min="4"
                    :max="120"
                  />
                  <FormHelperText
                    >min과 max 속성으로 입력 범위를 제한할 수
                    있습니다.</FormHelperText
                  >
                </FormField>
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul
              class="text-krds-gray-70 mb-4 list-inside list-disc space-y-2 text-sm"
            >
              <li>
                <code class="bg-krds-gray-5 rounded px-1">type="number"</code>
                속성을 사용합니다.
              </li>
              <li>모바일 기기에서 숫자 키보드가 자동으로 표시됩니다.</li>
              <li>숫자만 입력할 수 있으며, 브라우저가 자동으로 검증합니다.</li>
            </ul>
            <Heading level="h4" class="mb-3 text-base"
              >최소/최대값 지정</Heading
            >
            <ul
              class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm"
            >
              <li>
                <code class="bg-krds-gray-5 rounded px-1">:min="0"</code> -
                최소값 설정
              </li>
              <li>
                <code class="bg-krds-gray-5 rounded px-1">:max="120"</code> -
                최대값 설정
              </li>
              <li>두 속성을 함께 사용하여 입력 범위를 제한할 수 있습니다.</li>
              <li>예: 나이 입력 (0-120), 점수 입력 (0-100) 등</li>
            </ul>
          </Card>
        </div>

        <!-- Email Type -->
        <div class="mb-12">
          <Heading level="h3" class="mb-4">Email - 이메일 입력</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <FormField>
                  <FormLabel>이메일 주소</FormLabel>
                  <Input
                    v-model="emailType"
                    type="email"
                    placeholder="example@email.com"
                  />
                  <FormHelperText
                    >이메일 형식 검증이 자동으로 적용됩니다.</FormHelperText
                  >
                </FormField>
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul
              class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm"
            >
              <li>
                <code class="bg-krds-gray-5 rounded px-1">type="email"</code>
                속성을 사용합니다.
              </li>
              <li>모바일에서 이메일 키보드(@, . 포함)가 표시됩니다.</li>
              <li>브라우저가 자동으로 이메일 형식을 검증합니다.</li>
              <li>@ 기호가 포함되어야 합니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Tel Type -->
        <div class="mb-12">
          <Heading level="h3" class="mb-4">Tel - 전화번호 입력</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <FormLabel>휴대전화 번호 (3-4-4)</FormLabel>
                <div class="text-krds-gray-60 mb-1 text-xs">
                  필드 값: {{ formatPhoneFromParts(telFormValues) }}
                </div>
                <PhoneInput
                  fir-name="fir-phone"
                  sec-name="sec-phone"
                  thr-name="thr-phone"
                />
                <FormHelperText>
                  휴대전화 번호에 최적화된 3-4-4 입력입니다. 각 칸이 채워지면
                  자동으로 다음 칸으로 포커스가 이동합니다.
                </FormHelperText>
              </div>

              <div>
                <FormField>
                  <FormLabel>일반 전화번호 (4-4-4, 자동 이동 없음)</FormLabel>
                  <div class="text-krds-gray-60 mb-1 text-xs">
                    필드 값: {{ formatTelFromParts(telFormValues) }}
                  </div>
                  <TelNumberInput
                    fir-name="tel-fir"
                    sec-name="tel-sec"
                    thr-name="tel-thr"
                  />
                  <FormHelperText>
                    인터넷 전화, 지역 전화, 휴대전화 번호 등 다양한 패턴을
                    입력할 수 있는 4-4-4 입력입니다. 각 칸은 숫자 최대
                    4자리까지만 입력되며, 자동 포커스 이동은 없습니다.
                  </FormHelperText>
                </FormField>
              </div>
            </div>
          </Card>

          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul
              class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm"
            >
              <li>
                <code class="bg-krds-gray-5 rounded px-1"
                  >&lt;PhoneInput /&gt;</code
                >
                컴포넌트를 사용합니다.
              </li>
              <li>
                입력값은
                <code class="bg-krds-gray-5 rounded px-1">010-1234-5678</code>
                형식으로 바인딩됩니다.
              </li>
              <li>각 칸은 숫자만 입력되며, 길이가 자동으로 제한됩니다.</li>
              <li>
                지역/인터넷/휴대전화 번호를 모두 수용하려면
                <code class="bg-krds-gray-5 rounded px-1"
                  >&lt;TelNumberInput /&gt;</code
                >
                을 사용할 수 있습니다.
              </li>
            </ul>
          </Card>
        </div>

        <!-- URL Type -->
        <div class="mb-12">
          <Heading level="h3" class="mb-4">URL - URL 입력</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <FormField>
                  <FormLabel>웹사이트 주소</FormLabel>
                  <Input
                    v-model="urlType"
                    type="url"
                    placeholder="https://example.com"
                  />
                  <FormHelperText
                    >URL 형식 검증이 자동으로 적용됩니다.</FormHelperText
                  >
                </FormField>
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul
              class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm"
            >
              <li>
                <code class="bg-krds-gray-5 rounded px-1">type="url"</code>
                속성을 사용합니다.
              </li>
              <li>모바일에서 URL 키보드(/, . 포함)가 표시됩니다.</li>
              <li>브라우저가 자동으로 URL 형식을 검증합니다.</li>
              <li>http:// 또는 https://로 시작해야 합니다.</li>
            </ul>
          </Card>
        </div>
      </div>

      <!-- Status -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Status</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField status="error">
                <FormLabel>Error Status</FormLabel>
                <Input v-model="errorStatus" status="error" />
                <FormError>올바른 형식으로 입력해주세요.</FormError>
              </FormField>
            </div>
            <div>
              <FormField status="success">
                <FormLabel>Success Status</FormLabel>
                <Input v-model="successStatus" status="success" />
                <FormHelperText>올바르게 입력되었습니다.</FormHelperText>
              </FormField>
            </div>
            <div>
              <FormField status="info">
                <FormLabel>Info Status</FormLabel>
                <Input v-model="infoStatus" status="info" />
                <FormHelperText>추가 정보를 입력해주세요.</FormHelperText>
              </FormField>
            </div>
          </div>
        </Card>
      </div>

      <!-- Disabled & Readonly -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Disabled & Readonly</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField disabled>
                <FormLabel>Disabled</FormLabel>
                <Input v-model="disabledValue" disabled />
                <FormHelperText>비활성화된 입력 필드입니다.</FormHelperText>
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Readonly</FormLabel>
                <Input v-model="readonlyValue" readonly />
                <FormHelperText>읽기 전용 입력 필드입니다.</FormHelperText>
              </FormField>
            </div>
          </div>
        </Card>
      </div>

      <!-- Clearable -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Clearable</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>Clearable Input</FormLabel>
                <Input
                  v-model="clearableValue"
                  clearable
                  placeholder="입력 후 X 버튼으로 지울 수 있습니다"
                />
                <FormHelperText
                  >입력 값이 있을 때 X 버튼이 표시됩니다.</FormHelperText
                >
              </FormField>
            </div>
          </div>
        </Card>
      </div>

      <!-- Unit -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Unit (숫자 포맷)</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>단위 표시 + 콤마</FormLabel>
                <Input
                  v-model="unitValue"
                  unit="원"
                  placeholder="금액 입력"
                  money
                  clearable
                />
                <Input
                  v-model="unitValue"
                  unit="명"
                  placeholder="금액 입력"
                  clearable
                />
                <Input
                  v-model="unitValue"
                  unit="명"
                  placeholder="금액 입력"
                  clearable
                  disabled
                />
                <FormHelperText
                  >숫자 입력 시 콤마가 자동으로 표시되고 우측
                  정렬됩니다.</FormHelperText
                >
              </FormField>
            </div>
          </div>
        </Card>
      </div>

      <!-- Date -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Date</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>날짜 입력</FormLabel>
                <Input
                  v-model="dateValue"
                  date
                  placeholder="YYYY-MM-DD"
                  clearable
                />
                <Input v-model="dateValue" date placeholder="YYYY-MM-DD" />
                <FormHelperText
                  >캘린더 아이콘이 표시되는 날짜 입력입니다.</FormHelperText
                >
              </FormField>
            </div>
          </div>
        </Card>
      </div>

      <!-- Addon -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Addon (슬롯)</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>Left Addon</FormLabel>
                <Input v-model="leftAddonValue" placeholder="왼쪽 아이콘">
                  <template #leftAddon>
                    <Search class="h-4 w-4" />
                  </template>
                </Input>
                <FormHelperText
                  >왼쪽에 아이콘을 추가할 수 있습니다.</FormHelperText
                >
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Right Addon</FormLabel>
                <Input v-model="rightAddonValue" placeholder="오른쪽 아이콘">
                  <template #rightAddon>
                    <Mail class="h-4 w-4" />
                  </template>
                </Input>
                <FormHelperText
                  >오른쪽에 아이콘을 추가할 수 있습니다.</FormHelperText
                >
              </FormField>
            </div>
          </div>
        </Card>
      </div>

      <!-- Props 정리 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Prop</th>
                  <th class="px-4 py-3 font-bold">Type</th>
                  <th class="px-4 py-3 font-bold">Default</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    modelValue
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">v-model로 바인딩되는 입력 값</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">type</td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">'text'</td>
                  <td class="px-4 py-3">
                    입력 타입 (text, email, password, number 등)
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">size</td>
                  <td class="px-4 py-3">'md' | 'lg'</td>
                  <td class="px-4 py-3">'md'</td>
                  <td class="px-4 py-3">입력 필드 크기</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">date</td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">캘린더 아이콘 표시 및 날짜 입력 UI</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">unit</td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">
                    단위 표시 및 숫자 포맷(콤마/우측정렬)
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    status
                  </td>
                  <td class="px-4 py-3">'error' | 'success' | 'info'</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">입력 필드 상태</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    disabled
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">비활성화 여부</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    readonly
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">읽기 전용 여부</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    clearable
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">지우기 버튼 표시 여부</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    placeholder
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">플레이스홀더 텍스트</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    class
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">추가 CSS 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- Slots 정리 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Slots</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Slot</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    leftAddon
                  </td>
                  <td class="px-4 py-3">
                    입력 필드 왼쪽에 표시될 콘텐츠 (아이콘 등)
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    rightAddon
                  </td>
                  <td class="px-4 py-3">
                    입력 필드 오른쪽에 표시될 콘텐츠 (비밀번호 보기/숨기기,
                    지우기 버튼과 함께 사용 가능)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- Events 정리 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Events</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Event</th>
                  <th class="px-4 py-3 font-bold">Payload</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    update:modelValue
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">
                    입력 값이 변경될 때 발생 (v-model과 함께 사용)
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    clear
                  </td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">지우기 버튼을 클릭했을 때 발생</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- FormField와 함께 사용하기 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">FormField와 함께 사용하기</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          Input 컴포넌트는 FormField, FormLabel, FormHelperText, FormError와
          함께 사용하여 완전한 폼 필드를 구성할 수 있습니다.
        </p>

        <!-- 코드 예시 -->
        <Card variant="outlined" padding="lg" class="mb-6">
          <Heading level="h3" class="mb-4 text-lg">코드 예시</Heading>
          <pre
            class="bg-krds-gray-5 overflow-x-auto rounded-md p-4 text-sm"
          ><code>&lt;script setup lang="ts"&gt;
import { FormField, FormLabel, FormError, FormHelperText } from '@/components/hanui/form-field';
import { Input } from '@/components/hanui/input';
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 기본 사용 --&gt;
  &lt;FormField id="username" required&gt;
    &lt;FormLabel&gt;사용자명&lt;/FormLabel&gt;
    &lt;Input type="text" placeholder="영문, 숫자 4-20자" /&gt;
    &lt;FormHelperText&gt;4-20자의 영문자와 숫자만 사용 가능합니다&lt;/FormHelperText&gt;
  &lt;/FormField&gt;

  &lt;!-- 비밀번호 (자동 visibility toggle) --&gt;
  &lt;FormField id="password" required&gt;
    &lt;FormLabel&gt;비밀번호&lt;/FormLabel&gt;
    &lt;Input type="password" placeholder="8자 이상 입력" /&gt;
    &lt;FormHelperText&gt;영문, 숫자, 특수문자 포함 8자 이상&lt;/FormHelperText&gt;
  &lt;/FormField&gt;

  &lt;!-- 숫자 입력 --&gt;
  &lt;FormField id="age"&gt;
    &lt;FormLabel&gt;나이&lt;/FormLabel&gt;
    &lt;Input type="number" :min="0" :max="120" /&gt;
  &lt;/FormField&gt;

  &lt;!-- 에러 상태 --&gt;
  &lt;FormField id="email" status="error" required&gt;
    &lt;FormLabel&gt;이메일&lt;/FormLabel&gt;
    &lt;Input type="email" placeholder="example@email.com" status="error" /&gt;
    &lt;FormError&gt;올바른 이메일 형식이 아닙니다.&lt;/FormError&gt;
  &lt;/FormField&gt;
&lt;/template&gt;</code></pre>
        </Card>

        <!-- 실제 예시 -->
        <Card variant="outlined" padding="lg" class="mb-6">
          <Heading level="h3" class="mb-4 text-lg">실제 예시</Heading>
          <div class="space-y-6">
            <!-- 기본 사용 -->
            <div>
              <FormField id="username-demo" required>
                <FormLabel>사용자명</FormLabel>
                <Input
                  v-model="username"
                  type="text"
                  placeholder="영문, 숫자 4-20자"
                />
                <FormHelperText
                  >4-20자의 영문자와 숫자만 사용 가능합니다</FormHelperText
                >
              </FormField>
            </div>

            <!-- 비밀번호 -->
            <div>
              <FormField id="password-demo" required>
                <FormLabel>비밀번호</FormLabel>
                <Input
                  v-model="password"
                  type="password"
                  placeholder="8자 이상 입력"
                />
                <FormHelperText
                  >영문, 숫자, 특수문자 포함 8자 이상</FormHelperText
                >
              </FormField>
            </div>

            <!-- 숫자 입력 -->
            <div>
              <FormField id="age-demo">
                <FormLabel>나이</FormLabel>
                <Input v-model="age" type="number" :min="0" :max="120" />
              </FormField>
            </div>

            <!-- 에러 상태 -->
            <div>
              <FormField id="email-demo" status="error" required>
                <FormLabel>이메일</FormLabel>
                <Input
                  v-model="email"
                  type="email"
                  placeholder="example@email.com"
                  status="error"
                />
                <FormError>{{ emailError }}</FormError>
              </FormField>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
