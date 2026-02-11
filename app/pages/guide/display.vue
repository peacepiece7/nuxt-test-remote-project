<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Display - 가이드',
  })

  const components = getCategoryComponents('display')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Display</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        텍스트와 정보를 표시하는 디스플레이 컴포넌트들입니다. 다양한 텍스트
        스타일과 크기를 지원합니다.
      </p>

      <div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
              Display 컴포넌트는 다양한 텍스트 표시 방식을 지원합니다:
            </p>
            <ul
              class="text-krds-body-md text-krds-gray-70 list-inside list-disc space-y-2"
            >
              <li>제목 텍스트 (Heading, Display)</li>
              <li>본문 텍스트 (Body)</li>
              <li>코드 텍스트 (Code)</li>
              <li>상태 표시 (Badge, Tag)</li>
              <li>라벨 표시 (Label)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul
              class="text-krds-body-md text-krds-gray-70 list-inside list-disc space-y-2"
            >
              <li>다양한 텍스트 크기 및 스타일</li>
              <li>타이포그래피 시스템</li>
              <li>색상 변형 지원</li>
              <li>접근성 고려 (가독성)</li>
              <li>반응형 텍스트 크기</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
