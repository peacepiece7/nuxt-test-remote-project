<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Data Display - 가이드',
  })

  const components = getCategoryComponents('data-display')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Data Display</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        데이터와 콘텐츠를 다양한 형태로 표시하는 컴포넌트들입니다. 테이블,
        리스트, 카드 등 다양한 레이아웃을 지원합니다.
      </p>

      <div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              Data Display 컴포넌트는 다양한 데이터 표시 방식을 지원합니다:
            </p>
            <ul
              class="text-krds-body-md text-krds-gray-70 list-inside list-disc space-y-2"
            >
              <li>표 형태 (Table, Data Table)</li>
              <li>리스트 형태 (List)</li>
              <li>카드 형태 (Card)</li>
              <li>슬라이드 형태 (Carousel)</li>
              <li>이미지 표시 (Image, Aspect Ratio)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul
              class="text-krds-body-md text-krds-gray-70 list-inside list-disc space-y-2"
            >
              <li>다양한 레이아웃 옵션</li>
              <li>정렬 및 필터링 기능</li>
              <li>반응형 디자인</li>
              <li>가상 스크롤링 지원</li>
              <li>접근성 지원</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
