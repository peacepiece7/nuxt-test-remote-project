<script setup lang="ts">
  import { useHead } from 'nuxt/app'
  import { ref } from 'vue'

  useHead({
    title: 'Checkbox - 가이드',
  })

  const basicValue = ref<Array<string | number>>(['option-1'])
  const labelLessValue = ref<Array<string | number>>(['label-less'])
  const buttonValue = ref<Array<string | number>>(['button-1'])
  const buttonDisabledValue = ref<Array<string | number>>(['button-disabled-1'])
  const buttonReadonlyValue = ref<Array<string | number>>(['button-readonly-1'])
  const disabledValue = ref<Array<string | number>>(['disabled-1'])
  const readonlyValue = ref<Array<string | number>>(['readonly-1'])
  const errorValue = ref<Array<string | number>>([])
  const errorMessageId = 'checkbox-error-message'
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Checkbox</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        체크박스 컴포넌트입니다. 각 체크박스에
        <code class="bg-krds-gray-5 rounded px-1">name</code>을 지정하고
        <code class="bg-krds-gray-5 rounded px-1">v-model</code>을 연결합니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-5">
            <Checkbox v-model="basicValue" name="basic" value="option-1" label="옵션 1" />
            <Checkbox v-model="basicValue" name="basic" value="option-2" label="옵션 2" />
            <Checkbox v-model="basicValue" name="basic" value="option-3" label="옵션 3" />
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">v-model</code>은 배열이며,
              체크 시 값이 추가되고 해제 시 제거됩니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">value</code>에 객체를 전달하는 경우
              <code class="bg-krds-gray-5 rounded px-1">valueKey</code>,
              <code class="bg-krds-gray-5 rounded px-1">labelKey</code>로 매핑합니다.
            </li>
          </ul>
        </Card>
      </div>

      <!-- Label 없음 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Label 없는 단일 체크박스</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Checkbox v-model="labelLessValue" name="single" value="label-less" />
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">label</code>이 없을 경우
            <code class="bg-krds-gray-5 rounded px-1">value</code> 또는
            <code class="bg-krds-gray-5 rounded px-1">labelKey</code> 값이 접근성 라벨로 사용됩니다.
          </p>
        </Card>
      </div>

      <!-- Button variant -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Button Variant</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-6">
            <div class="flex flex-wrap gap-3">
              <Checkbox
                v-model="buttonValue"
                name="button"
                value="button-1"
                label="버튼 옵션 1"
                variant="button"
              />
              <Checkbox
                v-model="buttonValue"
                name="button"
                value="button-2"
                label="버튼 옵션 2"
                variant="button"
              />
              <Checkbox
                v-model="buttonValue"
                name="button"
                value="button-3"
                label="버튼 옵션 3"
                variant="button"
              />
            </div>
            <div class="flex flex-wrap gap-3">
              <Checkbox
                v-model="buttonDisabledValue"
                name="button-disabled"
                value="button-disabled-1"
                label="disabled + checked"
                variant="button"
                disabled
              />
              <Checkbox
                v-model="buttonDisabledValue"
                name="button-disabled"
                value="button-disabled-2"
                label="disabled"
                variant="button"
                disabled
              />
            </div>
           
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">variant</code>:
            <code class="bg-krds-gray-5 rounded px-1">'default' | 'button'</code>
            (기본: <code class="bg-krds-gray-5 rounded px-1">default</code>)
          </p>
        </Card>
      </div>

      <!-- 비활성화 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">비활성화</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
              <Checkbox
                v-model="disabledValue"
                name="disabled"
                value="disabled-1"
                label="disabled + checked"
                disabled
              />
              <Checkbox
                v-model="disabledValue"
                name="disabled"
                value="disabled-2"
                label="disabled"
                disabled
              />
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">disabled</code>:
            포커스 및 값 변경 불가
          </p>
        </Card>
      </div>

      <!-- 읽기 전용 -->
      <!-- 에러 메시지 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">오류 메시지</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-5">
            <Checkbox
              v-model="errorValue"
              name="error"
              value="error-1"
              label="필수 선택"
              status="error"
            />
            <Checkbox
              v-model="errorValue"
              name="error"
              value="error-2"
              label="필수 선택2"
              status="error"
            />
            
            <p :id="errorMessageId" class="text-krds-danger-60 text-sm">
              필수 항목을 선택해주세요.
            </p>
        </div>
        </Card> 
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">errorMessageId</code>:
            오류 메시지 요소의 id를 연결합니다.
          </p>
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
                  <th class="border-krds-gray-30 border-b p-3 text-left">Prop</th>
                  <th class="border-krds-gray-30 border-b p-3 text-left">타입</th>
                  <th class="border-krds-gray-30 border-b p-3 text-left">기본값</th>
                  <th class="border-krds-gray-30 border-b p-3 text-left">설명</th>
                </tr>
              </thead>
              <tbody class="text-krds-gray-70">
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">modelValue</td>
                  <td>Array&lt;string | number&gt;</td>
                  <td>undefined</td>
                  <td>선택된 값 (v-model)</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">value</td>
                  <td>string | number | object</td>
                  <td>필수</td>
                  <td>체크박스 값</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">name</td>
                  <td>string</td>
                  <td>필수</td>
                  <td>그룹 식별자</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">variant</td>
                  <td>default | button</td>
                  <td>default</td>
                  <td>표현 형태</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">label</td>
                  <td>string</td>
                  <td>undefined</td>
                  <td>라벨 텍스트</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">valueKey</td>
                  <td>string</td>
                  <td>value</td>
                  <td>객체 value 키</td>
                </tr>
                <tr>
                  <td class="border-krds-gray-20 border-b p-3">labelKey</td>
                  <td>string</td>
                  <td>label</td>
                  <td>객체 label 키</td>
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
                  <td class="p-3">errorMessageId</td>
                  <td>string</td>
                  <td>undefined</td>
                  <td>오류 메시지 id</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
