<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import TextButton from '@/components/hanui/TextButton.vue'

  useHead({
    title: 'TextButton - 가이드',
  })
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">TextButton</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        텍스트 형태의 버튼 컴포넌트입니다. 기본으로 밑줄이 표시됩니다.
      </p>
      <p class="text-krds-body-md text-krds-gray-70 mb-12">
        호버 시 배경이 강조되고, 활성 상태에서는 텍스트 색상이 변경됩니다.
        비활성 상태에서는 텍스트 색상이 연해집니다.
      </p>
      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex items-center gap-4">
            <TextButton>텍스트 버튼</TextButton>
            <TextButton icon="chevron-right" >아이콘 포함</TextButton>
            <TextButton disabled icon="upload">비활성</TextButton>
          </div>
        </Card>
      </div>
      <!-- Size -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex items-center gap-4">
            <TextButton size="sm">Small</TextButton>
            <TextButton size="md">Medium</TextButton>
            <TextButton size="lg">Large</TextButton>
          </div>
        </Card>
      </div>

      <!-- Props -->
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">size</td>
                  <td class="py-3 px-4">'sm' | 'md' | 'lg'</td>
                  <td class="py-3 px-4">'md'</td>
                  <td class="py-3 px-4">텍스트 크기</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">icon</td>
                  <td class="py-3 px-4">IconName</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">아이콘 이름</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">disabled</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">비활성화 여부</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">class</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">추가 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- Events -->
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">click</td>
                  <td class="py-3 px-4">MouseEvent</td>
                  <td class="py-3 px-4">클릭 이벤트</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
