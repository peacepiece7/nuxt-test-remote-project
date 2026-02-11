<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Overlay - 가이드',
  })

  const components = getCategoryComponents('overlay')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Overlay</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        기존 콘텐츠 위에 표시되는 오버레이 컴포넌트들입니다. 모달, 드롭다운, 아코디언 등을 포함합니다.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
              Overlay 컴포넌트는 다양한 오버레이 방식을 지원합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>모달 다이얼로그 (Modal)</li>
              <li>드롭다운 메뉴 (Dropdown Menu)</li>
              <li>접기/펼치기 (Accordion, Disclosure)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>포커스 트랩 지원</li>
              <li>ESC 키로 닫기</li>
              <li>배경 클릭으로 닫기</li>
              <li>애니메이션 효과</li>
              <li>접근성 지원 (ARIA 속성)</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
