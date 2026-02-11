<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Accordion from '@/components/hanui/Accordion.vue'
  import AccordionItem from '@/components/hanui/AccordionItem.vue'
  import AccordionTrigger from '@/components/hanui/AccordionTrigger.vue'
  import AccordionContent from '@/components/hanui/AccordionContent.vue'

  useHead({
    title: 'Accordion - 가이드',
  })

  const items = [
    {
      value: 'item-1',
      title: '아코디언 제목 1',
      content: '첫 번째 아코디언의 내용입니다.',
    },
    {
      value: 'item-2',
      title: '아코디언 제목 2',
      content: '두 번째 아코디언의 내용입니다.',
    },
    {
      value: 'item-3',
      title: '아코디언 제목 3',
      content: '세 번째 아코디언의 내용입니다.',
    },
  ]

  const multipleValue = ref<string[]>(['item-1'])
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Accordion</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        콘텐츠를 접었다 펼칠 수 있는 아코디언 컴포넌트입니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card class="mb-4">
          <Accordion>
            <AccordionItem
              v-for="item in items"
              :key="item.value"
              :value="item.value"
            >
              <AccordionTrigger>{{ item.title }}</AccordionTrigger>
              <AccordionContent>{{ item.content }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>

      <!-- Line Variant -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Line Variant</Heading>
        <Card class="mb-4">
          <Accordion variant="line">
            <AccordionItem
              v-for="item in items"
              :key="item.value"
              :value="item.value"
            >
              <AccordionTrigger>{{ item.title }}</AccordionTrigger>
              <AccordionContent>{{ item.content }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>

      <!-- Multiple -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Multiple</Heading>
        <Card class="mb-4">
          <Accordion v-model="multipleValue" type="multiple">
            <AccordionItem
              v-for="item in items"
              :key="item.value"
              :value="item.value"
            >
              <AccordionTrigger>{{ item.title }}</AccordionTrigger>
              <AccordionContent>{{ item.content }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>

      <!-- Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card>
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
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">type</td>
                  <td class="px-4 py-3">'single' | 'multiple'</td>
                  <td class="px-4 py-3">'single'</td>
                  <td class="px-4 py-3">열림 방식</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    variant
                  </td>
                  <td class="px-4 py-3">'default' | 'line'</td>
                  <td class="px-4 py-3">'default'</td>
                  <td class="px-4 py-3">스타일 변형</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    collapsible
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">true</td>
                  <td class="px-4 py-3">단일 모드에서 닫기 허용</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    defaultValue
                  </td>
                  <td class="px-4 py-3">string | string[]</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">초기 열림 값</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    modelValue
                  </td>
                  <td class="px-4 py-3">string | string[]</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">제어 값 (v-model)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    class
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">루트 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- Item Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">AccordionItem Props</Heading>
        <Card>
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
                    value
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">아이템 식별 값</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    variant
                  </td>
                  <td class="px-4 py-3">'default' | 'line'</td>
                  <td class="px-4 py-3">상위 Accordion 값</td>
                  <td class="px-4 py-3">개별 스타일 변형</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    class
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">아이템 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
