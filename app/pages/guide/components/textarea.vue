<script setup lang="ts">
import { ref } from 'vue';

useHead({
  title: 'Textarea - 가이드'
});

// 기본 예시
const basicTextarea = ref('');
const placeholderTextarea = ref('');


// Status 예시
const errorTextarea = ref('잘못된 입력 내용');
const successTextarea = ref('올바른 입력 내용');
const infoTextarea = ref('정보 입력 내용');

// Disabled/Readonly 예시
const disabledTextarea = ref('비활성화된 텍스트 영역');
const readonlyTextarea = ref('읽기 전용 텍스트 영역');

// AutoResize 예시
const autoResizeTextarea = ref('');
const autoResizeWithMaxRows = ref('');

// FormField 사용 예시
const description = ref('');
const feedback = ref('');
const feedbackError = ref('최소 10자 이상 입력해주세요.');
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Textarea</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        여러 줄 텍스트 입력을 위한 Textarea 컴포넌트입니다. 긴 텍스트 입력, 댓글, 설명 등에 사용합니다.
      </p>

      <!-- FormField와 함께 사용하기 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">FormField와 함께 사용하기</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          Textarea 컴포넌트는 FormField, FormLabel, FormHelperText, FormError와 함께 사용하여 완전한 폼 필드를 구성할 수 있습니다.
        </p>
        
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <!-- 기본 사용 -->
            <div>
              <Heading level="h3" class="mb-4 text-lg">기본 사용</Heading>
              <FormField id="description" required>
                <FormLabel>설명</FormLabel>
                <Textarea v-model="description" placeholder="내용을 입력하세요" />
                <FormHelperText>상세한 설명을 입력해주세요.</FormHelperText>
              </FormField>
            </div>

            <!-- 에러 상태 -->
            <div>
              <Heading level="h3" class="mb-4 text-lg">에러 상태</Heading>
              <FormField id="feedback" status="error" required>
                <FormLabel>피드백</FormLabel>
                <Textarea v-model="feedback" placeholder="피드백을 입력하세요" status="error" />
                <FormError>{{ feedbackError }}</FormError>
              </FormField>
            </div>
          </div>
        </Card>
      </div>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>기본 Textarea</FormLabel>
                <Textarea v-model="basicTextarea" />
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Placeholder</FormLabel>
                <Textarea v-model="placeholderTextarea" placeholder="내용을 입력하세요" />
              </FormField>
            </div>
          </div>
        </Card>
      </div>


      <!-- AutoResize -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">AutoResize - 자동 높이 조절</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>기본 AutoResize</FormLabel>
                <Textarea v-model="autoResizeTextarea" auto-resize placeholder="입력하면 자동으로 높이가 조절됩니다" />
                <FormHelperText>입력 내용에 따라 높이가 자동으로 조절됩니다.</FormHelperText>
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>최대 행 수 제한 (maxRows)</FormLabel>
                <Textarea v-model="autoResizeWithMaxRows" auto-resize :max-rows="5" placeholder="최대 5줄까지만 자동으로 확장됩니다" />
                <FormHelperText>최대 5줄까지만 자동으로 확장되고, 그 이후에는 스크롤이 생깁니다.</FormHelperText>
              </FormField>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">auto-resize</code> 속성을 사용하면 입력 내용에 따라 높이가 자동으로 조절됩니다.</li>
            <li>기본적으로는 내용이 많아질수록 계속 높이가 늘어납니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">:max-rows="5"</code> 속성을 함께 사용하면 최대 행 수를 제한할 수 있습니다.</li>
            <li>최대 행 수에 도달하면 스크롤이 생깁니다.</li>
            <li>예: 댓글 입력, 메모 작성 등에 유용합니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Status -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Status</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <FormField status="error">
                <FormLabel>Error Status</FormLabel>
                <Textarea v-model="errorTextarea" status="error" />
                <FormError>올바른 형식으로 입력해주세요.</FormError>
              </FormField>
            </div>
            <div>
              <FormField status="success">
                <FormLabel>Success Status</FormLabel>
                <Textarea v-model="successTextarea" status="success" />
                <FormHelperText>올바르게 입력되었습니다.</FormHelperText>
              </FormField>
            </div>
            <div>
              <FormField status="info">
                <FormLabel>Info Status</FormLabel>
                <Textarea v-model="infoTextarea" status="info" />
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
                <Textarea v-model="disabledTextarea" disabled />
                <FormHelperText>비활성화된 텍스트 영역입니다.</FormHelperText>
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Readonly</FormLabel>
                <Textarea v-model="readonlyTextarea" readonly />
                <FormHelperText>읽기 전용 텍스트 영역입니다.</FormHelperText>
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
                <tr class="border-b border-krds-gray-10">
                  <th class="py-3 px-4 font-bold">Prop</th>
                  <th class="py-3 px-4 font-bold">Type</th>
                  <th class="py-3 px-4 font-bold">Default</th>
                  <th class="py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">modelValue</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">v-model로 바인딩되는 입력 값</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">maxLength</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">1000</td>
                  <td class="py-3 px-4">최대 입력 글자 수 (카운터 기준)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">status</td>
                  <td class="py-3 px-4">'error' | 'success' | 'info'</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">텍스트 영역 상태</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">disabled</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">비활성화 여부</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">readonly</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">읽기 전용 여부</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">autoResize</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">입력 내용에 따라 높이 자동 조절 여부</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">maxRows</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">자동 높이 조절 시 최대 행 수 (autoResize와 함께 사용)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">placeholder</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">플레이스홀더 텍스트</td>
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

      <!-- Events 정리 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Events</Heading>
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">update:modelValue</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">입력 값이 변경될 때 발생 (v-model과 함께 사용)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- 사용 사례 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">사용 사례</Heading>
        <Card variant="outlined" padding="lg">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">댓글 입력</Heading>
              <p class="text-krds-body-md text-krds-gray-70 mb-2">
                autoResize와 maxRows를 사용하여 댓글 입력 필드를 만들 수 있습니다.
              </p>
              <div class="bg-krds-gray-5 p-4 rounded-md">
                <FormField>
                  <FormLabel>댓글 작성</FormLabel>
                  <Textarea v-model="autoResizeWithMaxRows" auto-resize :max-rows="5" placeholder="댓글을 입력하세요" />
                </FormField>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">긴 설명 입력</Heading>
              <p class="text-krds-body-md text-krds-gray-70 mb-2">
                autoResize를 사용하여 긴 설명을 입력할 때 자동으로 높이가 조절됩니다.
              </p>
              <div class="bg-krds-gray-5 p-4 rounded-md">
                <FormField>
                  <FormLabel>상세 설명</FormLabel>
                  <Textarea v-model="autoResizeTextarea" auto-resize placeholder="상세한 설명을 입력하세요" />
                </FormField>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
