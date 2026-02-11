<script setup lang="ts">
  import { useHead } from 'nuxt/app'
  import { ref } from 'vue'

  useHead({
    title: 'VDatePicker - 가이드',
  })

  // 기본
  const dateValue = ref('')
  const dateWithLabel = ref('')
  const datePlaceholder = ref('')

  // 사이즈
  const dateMd = ref('')
  const dateLg = ref('')

  // 선택 모드
  const monthValue = ref('2026-02')
  const yearValue = ref('')
  const quarterValue = ref('')

  // 상태
  const dateError = ref('2024-99-99') // 잘못된 값으로 에러 표시 예시
  const dateDisabled = ref('2024-01-15')
  const dateReadonly = ref('2024-06-20')

  // 날짜 제한
  const dateMinMax1 = ref('')
  const dateMinMax2 = ref('')

  // 시작일 변경
  const startDate1 = ref('')
  const startDate2 = ref('')

  const dateErrorVisible = ref(true) // 에러 상태 예시용
  const errorMessageId = 'vdatepicker-error-msg'
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">VDatePicker</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        @vuepic/vue-datepicker 기반 날짜 선택 컴포넌트입니다. 단일 날짜,
        월/년/분기 선택 모드를 지원하며, v-model은 문자열(YYYY-MM-DD 등)만
        사용합니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Label for="basic-usage11">기본 사용법</Label>
          <VDatePicker id="basic-usage11" v-model="dateValue" />
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">v-model</code>에
              문자열만 바인딩합니다. (날짜:
              <code class="bg-krds-gray-5 rounded px-1">YYYY-MM-DD</code>, 월:
              <code class="bg-krds-gray-5 rounded px-1">YYYY-MM</code>, 년:
              <code class="bg-krds-gray-5 rounded px-1">YYYY</code>, 분기:
              <code class="bg-krds-gray-5 rounded px-1">YYYY-MM</code> 해당 분기
              첫 달)
            </li>
            <li>
              기본 플레이스홀더는
              <code class="bg-krds-gray-5 rounded px-1">연도-월-일</code>입니다.
            </li>
          </ul>
        </Card>
      </div>

      <!-- Label / Placeholder -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Label · Placeholder</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <VDatePicker v-model="dateWithLabel" />
            <VDatePicker
              v-model="datePlaceholder"
              placeholder="날짜를 선택하세요"
            />
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">label</code>: 입력 필드
              위 라벨
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">placeholder</code>: 빈
              값일 때 표시 텍스트
            </li>
          </ul>
        </Card>
      </div>

      <!-- Size -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div>
            <FormField>
              <FormLabel for="dateMd">md</FormLabel>
              <VDatePicker id="dateMd" v-model="dateMd" size="md" />
            </FormField>
          </div>
          <div>
            <FormField>
              <FormLabel for="dateLg">lg</FormLabel>
              <VDatePicker id="dateLg" v-model="dateLg" size="lg" />
            </FormField>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">size</code>:
            <code class="bg-krds-gray-5 rounded px-1">'md' | 'lg'</code>
            (기본: <code class="bg-krds-gray-5 rounded px-1">md</code>)
          </p>
        </Card>
      </div>

      <!-- 선택 모드: 월 / 년 / 분기 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6"
          >선택 모드: 연도 / 월 / 일 / 분기</Heading
        >
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap items-end gap-6">
            <VFormField name="date-picker-1">
              <FormLabel>연도 / 월 / 일 선택</FormLabel>
              <VDatePicker
                v-model="dateValue"
                label="년월일 선택"
                placeholder="날짜를 선택하세요."
              />
            </VFormField>
            <VFormField name="date-picker-2">
              <FormLabel>연도 선택</FormLabel>
              <VDatePicker
                v-model="yearValue"
                year-picker
                label="연도 선택"
                placeholder="연도를 선택하세요."
              />
            </VFormField>
            <VFormField name="date-picker-3">
              <FormLabel>월 선택</FormLabel>
              <VDatePicker
                v-model="monthValue"
                month-picker
                label="월 선택"
                placeholder="월을 선택하세요."
              />
            </VFormField>
            <VFormField name="date-picker-4">
              <FormLabel>분기 선택</FormLabel>
              <VDatePicker
                v-model="quarterValue"
                quarter-picker
                label="분기 선택"
                placeholder="분기를 선택하세요."
              />
            </VFormField>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">month-picker</code>:
              월만 선택 (modelValue: YYYY-MM)
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">year-picker</code>: 년만
              선택 (modelValue: YYYY)
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">quarter-picker</code>:
              분기 선택 (modelValue: 해당 분기 첫 달 YYYY-MM)
            </li>
          </ul>
        </Card>
      </div>

      <!-- 에러 / 비활성화 / 읽기전용 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">에러 · 비활성화 · 읽기 전용</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <VDatePicker
                v-model="dateError"
                label="에러 상태"
                :error="dateErrorVisible"
                :error-message-id="errorMessageId"
              />
              <p :id="errorMessageId" class="text-krds-danger-60 mt-1 text-sm">
                {{ dateErrorVisible ? '유효한 날짜를 입력해주세요.' : '' }}
              </p>
            </div>
            <VDatePicker v-model="dateDisabled" label="비활성화" disabled />
            <VDatePicker v-model="dateReadonly" label="읽기 전용" readonly />
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">error</code>: 에러
              스타일 적용 (boolean 또는 ComputedRef)
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">error-message-id</code>:
              에러 메시지 요소 id (aria-describedby 접근성용)
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">disabled</code>:
              비활성화
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">readonly</code>: 읽기
              전용
            </li>
          </ul>
        </Card>
      </div>

      <!-- 날짜 제한 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">날짜 제한 (minDate / maxDate)</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <VFormField name="date-picker-5" class="mt-5">
            <FormLabel>2024-01-01 ~ 2024-12-31</FormLabel>
            <VDatePicker
              v-model="dateMinMax1"
              label="2024-01-01 ~ 2024-12-31"
              placeholder="2024-01-01 ~ 2024-12-31"
              min-date="2024-01-01"
              max-date="2024-12-31"
              start-date="2024-01-01"
            />
          </VFormField>
          <VFormField name="date-picker-6" class="mt-5">
            <FormLabel>2026-02 ~ 2026-03</FormLabel>
            <VDatePicker
              v-model="dateMinMax2"
              placeholder="2026-02 ~ 2026-03"
              label="2026-02 ~ 2026-03"
              month-picker
              min-date="2026-02"
              max-date="2026-03"
            />
          </VFormField>
          <Card variant="filled" padding="lg">
            <p class="text-krds-gray-70 text-sm">
              <code class="bg-krds-gray-5 rounded px-1">min-date</code>,
              <code class="bg-krds-gray-5 rounded px-1">max-date</code>:
              <code class="bg-krds-gray-5 rounded px-1">YYYY-MM-DD</code>
              문자열로 선택 가능 범위 제한
            </p>
          </Card>
        </Card>
      </div>

      <!-- start date 설정 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">날짜 제한 (minDate / maxDate)</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <VFormField name="date-picker-5" class="mt-5">
            <FormLabel
              >2024-01-01 ~ 2024-12-31 (startDate: 2024-01-01)</FormLabel
            >
            <VDatePicker
              v-model="dateMinMax1"
              label="2024-01-01 ~ 2024-12-31"
              placeholder="2024-01-01 ~ 2024-12-31"
              min-date="2024-01-01"
              max-date="2024-12-31"
              start-date="2024-01-01"
            />
          </VFormField>
        </Card>
      </div>

      <!-- Props 요약 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props 요약</Heading>
        <Card variant="filled" padding="lg">
          <div class="overflow-x-auto text-sm">
            <table class="border-krds-gray-30 w-full rounded-lg border">
              <thead>
                <tr class="bg-krds-gray-10">
                  <th class="border-krds-gray-30 border-b p-3 text-left">
                    Prop
                  </th>
                  <th class="border-krds-gray-30 border-b p-3 text-left">
                    타입
                  </th>
                  <th class="border-krds-gray-30 border-b p-3 text-left">
                    기본값
                  </th>
                  <th class="border-krds-gray-30 border-b p-3 text-left">
                    설명
                  </th>
                </tr>
              </thead>
              <tbody class="text-krds-gray-70">
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">modelValue</td>
                  <td>string</td>
                  <td>''</td>
                  <td>v-model 값 (YYYY-MM-DD 등)</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">size</td>
                  <td>md | lg</td>
                  <td>md</td>
                  <td>입력 크기</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">label</td>
                  <td>string</td>
                  <td>''</td>
                  <td>라벨 텍스트</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">placeholder</td>
                  <td>string</td>
                  <td>'연도-월-일'</td>
                  <td>플레이스홀더</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">monthPicker</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>월 선택 모드</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">yearPicker</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>년 선택 모드</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">
                    quarterPicker
                  </td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>분기 선택 모드</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">error</td>
                  <td>boolean \| ComputedRef</td>
                  <td>undefined</td>
                  <td>에러 상태</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">
                    errorMessageId
                  </td>
                  <td>string | ComputedRef</td>
                  <td>undefined</td>
                  <td>에러 메시지 id (aria-describedby)</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">disabled</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>비활성화</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">readonly</td>
                  <td>boolean</td>
                  <td>false</td>
                  <td>읽기 전용</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">autoApply</td>
                  <td>boolean</td>
                  <td>true</td>
                  <td>선택 시 즉시 적용 (확인 버튼 없음)</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">minDate</td>
                  <td>string</td>
                  <td>undefined</td>
                  <td>최소 날짜 (YYYY-MM-DD)</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">maxDate</td>
                  <td>string</td>
                  <td>undefined</td>
                  <td>최대 날짜 (YYYY-MM-DD)</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">teleport</td>
                  <td>string</td>
                  <td>undefined</td>
                  <td>캘린더 팝업을 렌더링할 대상 선택자</td>
                </tr>
                <tr>
                  <td class="p-3">locale</td>
                  <td>Locale (date-fns)</td>
                  <td>ko</td>
                  <td>로케일</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
