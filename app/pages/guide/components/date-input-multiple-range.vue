<script setup lang="ts">
/**
 * @deprecated VDatePicker 를 사용해주세요!
 */


import { ref } from 'vue';
import DateInput from '@/components/hanui/DateInput.vue';

useHead({
  title: 'Date Input - 가이드'
});

// DateInput 예시
const dateValue = ref('');
const dateWithLabel = ref('');
const dateWithHelper = ref('');
const dateRequired = ref('');
const dateError = ref('');
const dateDisabled = ref('2024-01-01');
const dateWithCalendar = ref('');

// DateInputMultiple 예시
const year = ref('');
const month = ref('');
const day = ref('');
const yearFull = ref('');
const monthFull = ref('');
const dayFull = ref('');
const monthMonthDay = ref('');
const dayMonthDay = ref('');
const yearYearMonth = ref('');
const monthYearMonth = ref('');
const yearError = ref('');
const monthError = ref('');
const dayError = ref('');
const yearDisabled = ref('1990');
const monthDisabled = ref('01');
const dayDisabled = ref('01');

// DateInputRange 예시
const startDateRange = ref('');
const endDateRange = ref('');
const startDateFull = ref('');
const endDateFull = ref('');
const startDateCalendar = ref('');
const endDateCalendar = ref('');
const startDateError = ref('');
const endDateError = ref('');
const startDateDisabled = ref('2024-01-01');
const endDateDisabled = ref('2024-12-31');
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
    <Heading level="h1" class="mb-4">Date Input</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        날짜 입력을 위한 컴포넌트입니다. 단일 날짜, 년/월/일 분리 입력, 날짜 범위 입력을 지원합니다.
      </p>


      <p class="text-red-600 text-3xl mb-10">(DateInput 컴포넌트 대신 VDatePicker 를 사용해주세요)</p>

      <!-- DateInputMultiple -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">DateInputMultiple - 년/월/일 분리 입력</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          년도, 월, 일을 각각 별도의 입력 필드로 입력하는 컴포넌트입니다. 한국어 사용자에게 친숙한 입력 방식입니다.
        </p>

        <!-- 기본 사용법 -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">기본 사용법 (년/월/일)</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputMultiple
                  v-model:year="yearFull"
                  v-model:month="monthFull"
                  v-model:day="dayFull"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">v-model:year</code>, <code class="bg-krds-gray-5 px-1 rounded">v-model:month</code>, <code class="bg-krds-gray-5 px-1 rounded">v-model:day</code>로 각각 바인딩합니다.</li>
              <li>년도는 4자리, 월과 일은 2자리로 자동 제한됩니다.</li>
              <li>월은 1-12, 일은 1-31 범위로 자동 검증됩니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Label & HelperText -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Label & HelperText</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputMultiple
                  v-model:year="year"
                  v-model:month="month"
                  v-model:day="day"
                  label="생년월일"
                  helper-text="생년월일을 입력해주세요"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">label="생년월일"</code>로 라벨을 표시합니다.</li>
              <li><code class="bg-krds-gray-5 px-1 rounded">helper-text="도움말"</code>로 도움말을 표시합니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Required & Error -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Required & Error</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputMultiple
                  v-model:year="yearError"
                  v-model:month="monthError"
                  v-model:day="dayError"
                  label="생년월일"
                  required
                  error-message="올바른 날짜를 입력해주세요"
                  :has-error="true"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 ">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">required</code>로 필수 입력 필드로 표시합니다.</li>
              <li><code class="bg-krds-gray-5 px-1 rounded">:has-error="true"</code>와 <code class="bg-krds-gray-5 px-1 rounded">error-message</code>로 에러를 표시합니다.</li>
            </ul>
          </Card>
        </div>

        <!-- HideYear - 년도 숨김 -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">HideYear - 년도 숨김 (월/일만)</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputMultiple
                  v-model:month="monthMonthDay"
                  v-model:day="dayMonthDay"
                  label="생일 (월/일)"
                  :hide-year="true"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">:hide-year="true"</code>로 년도 필드를 숨깁니다.</li>
              <li>월과 일만 입력하는 경우에 사용합니다.</li>
              <li>예: 생일 (년도 제외), 기념일 등</li>
            </ul>
          </Card>
        </div>

        <!-- HideDay - 일 숨김 -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">HideDay - 일 숨김 (년/월만)</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputMultiple
                  v-model:year="yearYearMonth"
                  v-model:month="monthYearMonth"
                  label="입사일 (년/월)"
                  :hide-day="true"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">:hide-day="true"</code>로 일 필드를 숨깁니다.</li>
              <li>년도와 월만 입력하는 경우에 사용합니다.</li>
              <li>예: 입사일 (일 제외), 계약 기간 등</li>
            </ul>
          </Card>
        </div>

        <!-- Disabled -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Disabled - 비활성화</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputMultiple
                  v-model:year="yearDisabled"
                  v-model:month="monthDisabled"
                  v-model:day="dayDisabled"
                  label="생년월일"
                  disabled
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">disabled</code> 속성으로 모든 입력 필드를 비활성화합니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Props 테이블 -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Props</Heading>
          <Card variant="outlined" padding="lg">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-krds-gray-10">
                    <th class="py-3 px-4 font-bold">Prop</th>
                    <th class="py-3 px-4 font-bold">Type</th>
                    <th class="py-3 px-4 font-bold">Default</th>
                    <th class="py-3 px-4 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">year</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">년도 값 (v-model:year로 바인딩)</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">month</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">월 값 (v-model:month로 바인딩)</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">day</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">일 값 (v-model:day로 바인딩)</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">label</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">라벨 텍스트</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">helperText</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">도움말 텍스트</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">errorMessage</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">에러 메시지</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">required</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">필수 입력 여부</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">hasError</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">에러 상태</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">disabled</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">비활성화 여부</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">hideYear</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">년도 필드 숨김 여부</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">hideDay</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">일 필드 숨김 여부</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">class</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">추가 CSS 클래스</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <!-- Events 테이블 -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Events</Heading>
          <Card variant="outlined" padding="lg">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-krds-gray-10">
                    <th class="py-3 px-4 font-bold">Event</th>
                    <th class="py-3 px-4 font-bold">Payload</th>
                    <th class="py-3 px-4 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">update:year</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">년도 값이 변경될 때 발생</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">update:month</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">월 값이 변경될 때 발생</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">update:day</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">일 값이 변경될 때 발생</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <!-- DateInputRange -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">DateInputRange - 날짜 범위 입력</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          시작일과 종료일을 입력하는 컴포넌트입니다. 기간 선택, 예약 기간 등에 사용합니다.
        </p>

        <!-- 기본 사용법 -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">기본 사용법</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputRange
                  v-model:start-date="startDateFull"
                  v-model:end-date="endDateFull"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">v-model:start-date</code>와 <code class="bg-krds-gray-5 px-1 rounded">v-model:end-date</code>로 각각 바인딩합니다.</li>
              <li>시작일과 종료일 사이에 ~ 구분자가 표시됩니다.</li>
              <li>두 입력 필드가 나란히 배치됩니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Label & HelperText -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Label & HelperText</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputRange
                  v-model:start-date="startDateRange"
                  v-model:end-date="endDateRange"
                  label="예약 기간"
                  helper-text="시작일과 종료일을 선택해주세요"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">label="예약 기간"</code>로 라벨을 표시합니다.</li>
              <li><code class="bg-krds-gray-5 px-1 rounded">helper-text="도움말"</code>로 도움말을 표시합니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Required & Error -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Required & Error</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputRange
                  v-model:start-date="startDateError"
                  v-model:end-date="endDateError"
                  label="기간"
                  required
                  error-message="시작일은 종료일보다 이전이어야 합니다"
                  :has-error="true"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">required</code>로 필수 입력 필드로 표시합니다.</li>
              <li><code class="bg-krds-gray-5 px-1 rounded">:has-error="true"</code>와 <code class="bg-krds-gray-5 px-1 rounded">error-message</code>로 에러를 표시합니다.</li>
              <li>시작일과 종료일 모두 에러 스타일이 적용됩니다.</li>
            </ul>
          </Card>
        </div>

        <!-- ShowCalendarButton -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">ShowCalendarButton - 달력 버튼</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputRange
                  v-model:start-date="startDateCalendar"
                  v-model:end-date="endDateCalendar"
                  label="기간 선택"
                  :show-calendar-button="true"
                  @start-calendar-click="() => console.log('시작일 달력 클릭')"
                  @end-calendar-click="() => console.log('종료일 달력 클릭')"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">:show-calendar-button="true"</code>로 각 입력 필드에 달력 버튼을 표시합니다.</li>
              <li><code class="bg-krds-gray-5 px-1 rounded">@start-calendar-click</code>로 시작일 달력 버튼 클릭을 처리합니다.</li>
              <li><code class="bg-krds-gray-5 px-1 rounded">@end-calendar-click</code>로 종료일 달력 버튼 클릭을 처리합니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Placeholder -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Placeholder - 플레이스홀더</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputRange
                  v-model:start-date="startDateRange"
                  v-model:end-date="endDateRange"
                  start-placeholder="시작일 선택"
                  end-placeholder="종료일 선택"
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">start-placeholder="시작일 선택"</code>로 시작일 플레이스홀더를 설정합니다.</li>
              <li><code class="bg-krds-gray-5 px-1 rounded">end-placeholder="종료일 선택"</code>로 종료일 플레이스홀더를 설정합니다.</li>
              <li>기본값은 둘 다 <code class="bg-krds-gray-5 px-1 rounded">YYYY-MM-DD</code>입니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Disabled -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Disabled - 비활성화</Heading>
          <Card variant="outlined" padding="lg" class="mb-4">
            <div class="space-y-4">
              <div>
                <DateInputRange
                  v-model:start-date="startDateDisabled"
                  v-model:end-date="endDateDisabled"
                  label="기간"
                  disabled
                />
              </div>
            </div>
          </Card>
          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
            <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
              <li><code class="bg-krds-gray-5 px-1 rounded">disabled</code> 속성으로 두 입력 필드를 모두 비활성화합니다.</li>
            </ul>
          </Card>
        </div>

        <!-- Props 테이블 -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Props</Heading>
          <Card variant="outlined" padding="lg">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-krds-gray-10">
                    <th class="py-3 px-4 font-bold">Prop</th>
                    <th class="py-3 px-4 font-bold">Type</th>
                    <th class="py-3 px-4 font-bold">Default</th>
                    <th class="py-3 px-4 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">startDate</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">시작일 값 (v-model:start-date로 바인딩)</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">endDate</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">종료일 값 (v-model:end-date로 바인딩)</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">label</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">라벨 텍스트</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">helperText</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">도움말 텍스트</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">errorMessage</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">에러 메시지</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">required</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">필수 입력 여부</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">hasError</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">에러 상태</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">disabled</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">비활성화 여부</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">startPlaceholder</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">'YYYY-MM-DD'</td>
                    <td class="py-3 px-4">시작일 플레이스홀더</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">endPlaceholder</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">'YYYY-MM-DD'</td>
                    <td class="py-3 px-4">종료일 플레이스홀더</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">showCalendarButton</td>
                    <td class="py-3 px-4">boolean</td>
                    <td class="py-3 px-4">false</td>
                    <td class="py-3 px-4">달력 버튼 표시 여부</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">class</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">추가 CSS 클래스</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <!-- Events 테이블 -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">Events</Heading>
          <Card variant="outlined" padding="lg">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-krds-gray-10">
                    <th class="py-3 px-4 font-bold">Event</th>
                    <th class="py-3 px-4 font-bold">Payload</th>
                    <th class="py-3 px-4 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">update:startDate</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">시작일 값이 변경될 때 발생</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">update:endDate</td>
                    <td class="py-3 px-4">string</td>
                    <td class="py-3 px-4">종료일 값이 변경될 때 발생</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">startCalendarClick</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">시작일 달력 버튼 클릭 시 발생</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">endCalendarClick</td>
                    <td class="py-3 px-4">-</td>
                    <td class="py-3 px-4">종료일 달력 버튼 클릭 시 발생</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
