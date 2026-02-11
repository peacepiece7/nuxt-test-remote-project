<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Layout Components - 가이드',
  })

  const components = getCategoryComponents('layout-components')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Layout Components</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        페이지의 전체 구조를 구성하는 레이아웃 컴포넌트들입니다. 헤더, 푸터 등 주요 구조 요소를 포함합니다.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card
          v-for="component in components"
          :key="component.name"
          variant="shadow"
          hoverable
          padding="lg"
          class="flex flex-col"
        >
          <div class="flex-1">
            <Heading level="h3" class="mb-3">{{ component.name }}</Heading>
            <p class="text-krds-body-md text-krds-gray-70 mb-4">
              {{ component.description }}
            </p>
          </div>
          <NuxtLink :to="component.href">
            <Button variant="secondary" size="sm" class="w-full">
              자세히 보기
            </Button>
          </NuxtLink>
        </Card>
      </div>

      <div class="mt-16 space-y-8">
        <div>
          <Heading level="h2" class="mb-4">사용 예시</Heading>
          <Card variant="outlined" padding="lg">
            <p class="text-krds-body-md text-krds-gray-70 mb-4">
              Layout Components는 페이지의 주요 구조를 구성합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>상단 헤더 (Header)</li>
              <li>하단 푸터 (Footer)</li>
              <li>마스터헤드 (Masthead)</li>
              <li>사이트 식별자 (Identifier)</li>
              <li>접근성 링크 (Skip Link)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>일관된 페이지 구조</li>
              <li>반응형 디자인</li>
              <li>접근성 지원</li>
              <li>네비게이션 통합</li>
              <li>브랜딩 요소 포함</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
