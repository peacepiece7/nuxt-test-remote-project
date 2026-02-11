<script setup lang="ts">
import { ref } from 'vue';
import Container from '@/components/hanui/Container.vue';
import Heading from '@/components/hanui/Heading.vue';
import Card from '@/components/hanui/Card.vue';
import Select from '@/components/hanui/Select.vue';
import FormField from '@/components/hanui/FormField.vue';
import FormLabel from '@/components/hanui/FormLabel.vue';
import FormError from '@/components/hanui/FormError.vue';
import FormHelperText from '@/components/hanui/FormHelperText.vue';

useHead({
  title: 'Select - 가이드'
});

// 기본 예시
const basicValue = ref('');
const placeholderValue = ref('');

// 옵션 데이터
const fruitOptions = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
  { value: 'grape', label: '포도' },
  { value: 'watermelon', label: '수박' },
];

const cityOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
];

const countryOptions = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'uk', label: '영국' },
];

// FormField 사용 예시
const fruitValue = ref('');
const cityValue = ref('');
const cityError = ref('');

// Size 예시
const lgSize = ref('');
const mdSize = ref('');
const smSize = ref('');

// Status 예시
const errorStatus = ref('');
const successStatus = ref('');
const infoStatus = ref('');

// Disabled/Readonly 예시
const disabledValue = ref('');
const readonlyValue = ref('kr');

// Disabled 옵션 예시 (disabledValues prop 사용)
const disabledOptionValue = ref('option4');

// Multiple Select 예시
const multipleValue = ref<string[]>([]);
const multipleWithLimitValue = ref<string[]>(['apple', 'banana', 'orange']);

// Custom Key 예시
const customKeyOptions = [
  { id: 'a', name: '옵션 A' },
  { id: 'b', name: '옵션 B' },
  { id: 'c', name: '옵션 C' },
];
const customKeyValue = ref('');
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Select</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        여러 옵션 중 하나를 선택할 수 있는 드롭다운 컴포넌트입니다. 다양한 크기와 상태를 지원합니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <Select
                v-model="basicValue"
                :options="fruitOptions"
                placeholder="과일을 선택하세요"
              />
            </div>
            <div class="text-sm text-krds-gray-70">
              선택된 값: <code class="bg-krds-gray-5 px-1 rounded">{{ basicValue || '없음' }}</code>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">options</code> prop으로 선택 가능한 옵션 배열을 전달합니다.</li>
            <li>각 옵션은 <code class="bg-krds-gray-5 px-1 rounded">value</code>와 <code class="bg-krds-gray-5 px-1 rounded">label</code> 속성을 가집니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">v-model</code>로 선택된 값을 바인딩합니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">placeholder</code>로 선택 전 표시될 텍스트를 설정합니다.</li>
          </ul>
        </Card>
      </div>

      <!-- FormField와 함께 사용하기 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">FormField와 함께 사용하기</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-6">
            <div>
              <FormField id="fruit-select" required>
                <FormLabel>좋아하는 과일</FormLabel>
                <Select
                  v-model="fruitValue"
                  :options="fruitOptions"
                  placeholder="과일을 선택하세요"
                />
                <FormHelperText>가장 좋아하는 과일을 하나 선택해주세요.</FormHelperText>
              </FormField>
            </div>
            <div>
              <FormField id="city-select" required :status="cityError ? 'error' : undefined">
                <FormLabel>도시</FormLabel>
                <Select
                  v-model="cityValue"
                  :options="cityOptions"
                  placeholder="도시를 선택하세요"
                  status="error"
                />
                <FormError v-if="cityError">{{ cityError }}</FormError>
              </FormField>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">FormField</code>로 감싸면 label, error, helper text를 일관되게 관리할 수 있습니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">FormLabel</code>로 라벨을 표시합니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">FormHelperText</code>로 도움말을 표시합니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">FormError</code>로 에러 메시지를 표시합니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">status="error"</code> prop으로 에러 상태를 표시할 수 있습니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Size -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size - 크기</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>Large (56px)</FormLabel>
                <Select
                  v-model="lgSize"
                  :options="fruitOptions"
                  placeholder="lg 사이즈"
                  size="lg"
                />
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Medium (48px) - 기본</FormLabel>
                <Select
                  v-model="mdSize"
                  :options="fruitOptions"
                  placeholder="md 사이즈"
                  size="md"
                />
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Small (40px)</FormLabel>
                <Select
                  v-model="smSize"
                  :options="fruitOptions"
                  placeholder="sm 사이즈"
                  size="sm"
                />
              </FormField>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">size="lg"</code>: 높이 56px</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">size="md"</code>: 높이 48px (기본값)</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">size="sm"</code>: 높이 40px</li>
          </ul>
        </Card>
      </div>

      <!-- Status -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Status - 상태</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>Error 상태</FormLabel>
                <Select
                  v-model="errorStatus"
                  :options="cityOptions"
                  placeholder="도시를 선택하세요"
                  status="error"
                />
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Success 상태</FormLabel>
                <Select
                  v-model="successStatus"
                  :options="cityOptions"
                  placeholder="도시를 선택하세요"
                  status="success"
                />
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>Info 상태</FormLabel>
                <Select
                  v-model="infoStatus"
                  :options="cityOptions"
                  placeholder="도시를 선택하세요"
                  status="info"
                />
              </FormField>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">status="error"</code>: 에러 상태 (빨간색 테두리)</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">status="success"</code>: 성공 상태 (초록색 테두리)</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">status="info"</code>: 정보 상태 (파란색 테두리)</li>
          </ul>
        </Card>
      </div>

      <!-- Disabled & Readonly -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Disabled & Readonly</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>비활성화된 Select</FormLabel>
                <Select
                  v-model="disabledValue"
                  :options="fruitOptions"
                  placeholder="비활성화된 선택"
                  disabled
                />
              </FormField>
            </div>
            <div>
              <FormField>
                <FormLabel>읽기 전용 Select</FormLabel>
                <Select
                  v-model="readonlyValue"
                  :options="countryOptions"
                  placeholder="선택 완료"
                  readonly
                />
                <FormHelperText>선택된 값 표시만 하고 변경은 불가합니다.</FormHelperText>
              </FormField>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">disabled</code> prop으로 Select를 비활성화할 수 있습니다.</li>
            <li>비활성화된 Select는 클릭할 수 없고 회색으로 표시됩니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">readonly</code> prop은 선택된 값 표시만 하고 변경을 막습니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Disabled 옵션 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Disabled 옵션</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>일부 옵션 비활성화</FormLabel>
                <Select
                  v-model="disabledOptionValue"
                  :options="fruitOptions"
                  :disabled-values="['apple', 'banana']"
                  placeholder="옵션을 선택하세요"
                />
                <FormHelperText>사과, 바나나는 비활성화되어 선택할 수 없습니다.</FormHelperText>
              </FormField>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">disabled-values</code> prop에 비활성화할 값들의 배열을 전달합니다.</li>
            <li>비활성화된 옵션은 회색으로 표시되고 선택할 수 없습니다.</li>
            <li>키보드 네비게이션 시에도 비활성화된 옵션은 건너뜁니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Label -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Label - 라벨</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <Select
                v-model="placeholderValue"
                :options="countryOptions"
                label="국가"
                placeholder="국가를 선택하세요"
              />
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">label</code> prop으로 Select 위에 라벨을 표시할 수 있습니다.</li>
            <li>FormField를 사용하는 경우 FormLabel을 사용하는 것이 권장됩니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Multiple Select -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Multiple - 다중 선택</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-6">
            <div>
              <FormField>
                <FormLabel>다중 선택</FormLabel>
                <Select
                  v-model="multipleValue"
                  :options="fruitOptions"
                  placeholder="과일을 선택하세요"
                  multiple
                />
                <FormHelperText>여러 개를 선택할 수 있습니다.</FormHelperText>
              </FormField>
              <div class="mt-2 text-sm text-krds-gray-70">
                선택된 값: <code class="bg-krds-gray-5 px-1 rounded">{{ multipleValue.length > 0 ? multipleValue.join(', ') : '없음' }}</code>
              </div>
            </div>
            <div>
              <FormField>
                <FormLabel>표시 개수 제한 (multipleDisplayLimit)</FormLabel>
                <Select
                  v-model="multipleWithLimitValue"
                  :options="fruitOptions"
                  placeholder="과일을 선택하세요"
                  multiple
                  :multiple-display-limit="2"
                />
                <FormHelperText>2개 초과 선택 시 "N개 선택됨"으로 표시됩니다.</FormHelperText>
              </FormField>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">multiple</code> prop을 추가하면 다중 선택이 가능합니다.</li>
            <li>다중 선택 시 <code class="bg-krds-gray-5 px-1 rounded">v-model</code>은 문자열 배열 타입입니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">multiple-display-limit</code>으로 표시할 최대 개수를 설정합니다 (기본값: 2).</li>
            <li>제한 개수 초과 시 "N개 선택됨" 형태로 표시됩니다.</li>
            <li>다중 선택 모드에서는 옵션 선택 후에도 드롭다운이 닫히지 않습니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Custom Key -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Custom Key - 커스텀 키</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <FormField>
                <FormLabel>커스텀 labelKey / valueKey</FormLabel>
                <Select
                  v-model="customKeyValue"
                  :options="customKeyOptions"
                  label-key="name"
                  value-key="id"
                  placeholder="옵션을 선택하세요"
                />
                <FormHelperText>옵션 객체의 키가 value/label이 아닌 경우 사용합니다.</FormHelperText>
              </FormField>
              <div class="mt-2 text-sm text-krds-gray-70">
                선택된 값: <code class="bg-krds-gray-5 px-1 rounded">{{ customKeyValue || '없음' }}</code>
              </div>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">label-key</code>: 옵션에서 라벨로 사용할 키 (기본값: 'label')</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">value-key</code>: 옵션에서 값으로 사용할 키 (기본값: 'value')</li>
            <li>API 응답 등 다른 형태의 데이터를 그대로 사용할 때 유용합니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Props 테이블 -->
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">options</td>
                  <td class="py-3 px-4">Record&lt;string, any&gt;[]</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">선택 가능한 옵션 배열 (필수)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">modelValue</td>
                  <td class="py-3 px-4">string | string[]</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">선택된 값 (v-model로 바인딩)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">placeholder</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">'선택하세요'</td>
                  <td class="py-3 px-4">선택 전 표시될 플레이스홀더 텍스트</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">disabled</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">비활성화 여부</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">disabledValues</td>
                  <td class="py-3 px-4">string[]</td>
                  <td class="py-3 px-4">[]</td>
                  <td class="py-3 px-4">비활성화할 옵션 값 배열</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">readonly</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">읽기 전용 여부 (선택값 표시만)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">status</td>
                  <td class="py-3 px-4">'error' | 'success' | 'info'</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">상태 (에러, 성공, 정보)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">size</td>
                  <td class="py-3 px-4">'lg' | 'md' | 'sm'</td>
                  <td class="py-3 px-4">'md'</td>
                  <td class="py-3 px-4">크기 (lg: 56px, md: 48px, sm: 40px)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">label</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">라벨 텍스트</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">labelKey</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">'label'</td>
                  <td class="py-3 px-4">옵션에서 라벨로 사용할 키</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">valueKey</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">'value'</td>
                  <td class="py-3 px-4">옵션에서 값으로 사용할 키</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">multiple</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">다중 선택 활성화</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">multipleDisplayLimit</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">2</td>
                  <td class="py-3 px-4">다중 선택 시 표시할 최대 개수</td>
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

      <!-- 옵션 데이터 구조 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">옵션 데이터 구조</Heading>
        <Card variant="outlined" padding="lg">
          <div class="space-y-4">
            <p class="text-sm text-krds-gray-70">
              옵션은 <code class="bg-krds-gray-5 px-1 rounded">Record&lt;string, any&gt;[]</code> 타입으로,
              어떤 형태의 객체 배열이든 사용할 수 있습니다.
            </p>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-krds-gray-10">
                    <th class="py-3 px-4 font-bold">기본 키</th>
                    <th class="py-3 px-4 font-bold">설정 prop</th>
                    <th class="py-3 px-4 font-bold">Description</th>
                  </tr>
                </thead>
                <tbody class="text-sm">
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">value</td>
                    <td class="py-3 px-4">valueKey</td>
                    <td class="py-3 px-4">옵션의 값으로 사용할 키 (기본값: 'value')</td>
                  </tr>
                  <tr class="border-b border-krds-gray-5">
                    <td class="py-3 px-4 font-mono text-krds-primary-60">label</td>
                    <td class="py-3 px-4">labelKey</td>
                    <td class="py-3 px-4">옵션에 표시될 텍스트로 사용할 키 (기본값: 'label')</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="bg-krds-gray-5 p-4 rounded-lg">
              <p class="text-sm text-krds-gray-70 mb-2">기본 형태:</p>
              <pre class="text-sm"><code>const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
];</code></pre>
            </div>
            <div class="bg-krds-gray-5 p-4 rounded-lg">
              <p class="text-sm text-krds-gray-70 mb-2">커스텀 키 사용:</p>
              <pre class="text-sm"><code>const options = [
  { id: 'apple', name: '사과' },
  { id: 'banana', name: '바나나' },
];

&lt;Select :options="options" value-key="id" label-key="name" /&gt;</code></pre>
            </div>
          </div>
        </Card>
      </div>

      <!-- 사용 예시 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">사용 예시</Heading>
        <Card variant="outlined" padding="lg">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">기본 사용</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue';
import Select from '@/components/hanui/Select.vue';

const value = ref('');
const options = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
];
&lt;/script&gt;

&lt;template&gt;
  &lt;Select
    v-model="value"
    :options="options"
    placeholder="과일을 선택하세요"
  /&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">FormField와 함께 사용</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue';
import Select from '@/components/hanui/Select.vue';
import FormField from '@/components/hanui/FormField.vue';
import FormLabel from '@/components/hanui/FormLabel.vue';
import FormHelperText from '@/components/hanui/FormHelperText.vue';

const value = ref('');
const options = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
];
&lt;/script&gt;

&lt;template&gt;
  &lt;FormField id="city" required&gt;
    &lt;FormLabel&gt;도시&lt;/FormLabel&gt;
    &lt;Select
      v-model="value"
      :options="options"
      placeholder="도시를 선택하세요"
    /&gt;
    &lt;FormHelperText&gt;거주하는 도시를 선택해주세요.&lt;/FormHelperText&gt;
  &lt;/FormField&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">에러 상태</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;FormField id="city" required status="error"&gt;
  &lt;FormLabel&gt;도시&lt;/FormLabel&gt;
  &lt;Select
    v-model="value"
    :options="options"
    placeholder="도시를 선택하세요"
    status="error"
  /&gt;
  &lt;FormError&gt;필수 선택 항목입니다.&lt;/FormError&gt;
&lt;/FormField&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">크기 조절</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;Select :options="options" size="lg" /&gt;  &lt;!-- 56px - 기본값 --&gt;
&lt;Select :options="options" size="md" /&gt;  &lt;!-- 48px --&gt;
&lt;Select :options="options" size="sm" /&gt;  &lt;!-- 40px --&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">비활성화된 옵션</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>const options = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
];

&lt;Select
  :options="options"
  :disabled-values="['option1', 'option2']"
/&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">다중 선택</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
const multipleValue = ref&lt;string[]&gt;([]);
&lt;/script&gt;

&lt;template&gt;
  &lt;Select
    v-model="multipleValue"
    :options="options"
    multiple
    :multiple-display-limit="2"
  /&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">커스텀 키</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>const options = [
  { id: 'a', name: '옵션 A' },
  { id: 'b', name: '옵션 B' },
];

&lt;Select
  :options="options"
  value-key="id"
  label-key="name"
/&gt;</code></pre>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
