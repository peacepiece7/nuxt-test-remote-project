<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Layout - 가이드',
  })

  const components = getCategoryComponents('layout')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Layout</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        페이지와 컴포넌트의 레이아웃을 구성하는 기본 레이아웃 컴포넌트들입니다.
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
              Layout 컴포넌트는 다양한 레이아웃 방식을 지원합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>Grid 레이아웃 (Grid, Simple Grid)</li>
              <li>Flexbox 레이아웃 (Flex, Stack)</li>
              <li>중앙 정렬 (Center)</li>
              <li>자동 줄바꿈 (Wrap)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>반응형 레이아웃 지원</li>
              <li>다양한 간격 옵션</li>
              <li>정렬 옵션 지원</li>
              <li>컨테이너 최대 너비 제한</li>
              <li>접근성 고려</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
