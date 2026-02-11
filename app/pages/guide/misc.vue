<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Misc - 가이드',
  })

  const components = getCategoryComponents('misc')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Misc</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        기타 유용한 컴포넌트들입니다. 특정 용도에 맞는 다양한 기능을 제공합니다.
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
              Misc 컴포넌트는 다양한 특수 기능을 제공합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>값 선택 (Slider)</li>
              <li>진행 단계 표시 (Step Indicator)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>다양한 입력 방식 지원</li>
              <li>시각적 피드백 제공</li>
              <li>접근성 지원</li>
              <li>반응형 디자인</li>
              <li>커스터마이징 가능</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">활용 사례</Heading>
          <Card variant="outlined" padding="lg">
            <p class="text-krds-body-md text-krds-gray-70 mb-4">
              각 컴포넌트의 활용 사례:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>Slider: 가격 범위 선택, 볼륨 조절 등</li>
              <li>Step Indicator: 다단계 폼, 주문 프로세스 등</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
