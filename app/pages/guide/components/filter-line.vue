<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import FilterLine from '@/components/hanui/FilterLine.vue'
  import Select from '@/components/hanui/Select.vue'

  useHead({
    title: 'FilterLine - 가이드',
  })

  const totalCount = ref(100)
  const perPageValue = ref('10')
  const perPageOptions = [
    { value: '10', label: '10건' },
    { value: '20', label: '20건' },
    { value: '30', label: '30건' },
    { value: '50', label: '50건' },
  ]
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">FilterLine</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        목록 상단에서 전체 건수와 페이지당 노출 개수를 함께 제공하는 컴포넌트입니다.
      </p>

      <!-- 건수만 표시 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">건수만 표시</Heading>
        <Card class="mb-4">
          <FilterLine :total-count="totalCount" />
        </Card>
      </div>

      <!-- 우측 컨텐츠 포함 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">우측 컨텐츠 포함</Heading>
        <Card class="mb-4">
          <FilterLine :total-count="totalCount">
            <template #right>
              <div class="flex items-center gap-4">
                <span
                  class="text-[16px] font-medium leading-[1.5] tracking-[-0.32px] text-krds-gray-70"
                >
                  목록 개수
                </span>
                <div class="w-[120px]">
                  <Select
                    v-model="perPageValue"
                    :options="perPageOptions"
                    placeholder="10건"
                  />
                </div>
              </div>
            </template>
          </FilterLine>
        </Card>
      </div>

      <!-- 예시 코드 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">예시 코드</Heading>
        <Card>
          <pre class="whitespace-pre-wrap text-krds-body-sm text-krds-gray-80">
<code v-pre>&lt;FilterLine :total-count="100" /&gt;

&lt;FilterLine :total-count="100"&gt;
  &lt;template #right&gt;
    &lt;div class="flex items-center gap-4"&gt;
      &lt;span
        class="text-[16px] font-medium leading-[1.5] tracking-[-0.32px] text-krds-gray-70"
      &gt;
        목록 개수
      &lt;/span&gt;
      &lt;div class="w-[120px]"&gt;
        &lt;Select
          v-model="perPageValue"
          :options="perPageOptions"
          placeholder="10건"
        /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/FilterLine&gt;</code>
          </pre>
        </Card>
      </div>

      <!-- Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card>
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">
                    totalCount
                  </td>
                  <td class="py-3 px-4">number | string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">전체 건수</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">
                    countLabel
                  </td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">'총'</td>
                  <td class="py-3 px-4">건수 앞 텍스트</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">
                    countUnit
                  </td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">'건'</td>
                  <td class="py-3 px-4">건수 뒤 단위</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">class</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">루트 컨테이너 클래스</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">
                    right (slot)
                  </td>
                  <td class="py-3 px-4">slot</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">우측 컨텐츠 슬롯</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
