<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Navigation - 가이드',
  })

  const components = getCategoryComponents('navigation')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Navigation</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사용자가 웹사이트를 탐색할 수 있도록 도와주는 네비게이션 컴포넌트들입니다.
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
              Navigation 컴포넌트는 다양한 네비게이션 방식을 지원합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>위치 표시 (Breadcrumb)</li>
              <li>메뉴 네비게이션 (Main Menu, Side Navigation)</li>
              <li>탭 네비게이션 (Tab, Tab Bars)</li>
              <li>페이지 네비게이션 (Pagination)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>활성 상태 표시</li>
              <li>키보드 네비게이션 지원</li>
              <li>접근성 지원 (ARIA 속성)</li>
              <li>반응형 디자인</li>
              <li>애니메이션 효과</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
