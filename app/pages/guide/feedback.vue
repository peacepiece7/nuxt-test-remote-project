<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Feedback - 가이드',
  })

  const components = getCategoryComponents('feedback')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Feedback</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사용자에게 피드백을 제공하는 컴포넌트들입니다. 알림, 진행 상태, 로딩 상태 등을 표시합니다.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
              Feedback 컴포넌트는 다양한 피드백 방식을 지원합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>알림 메시지 (Alert, Toast)</li>
              <li>대화상자 (Alert Dialog)</li>
              <li>진행 상태 (Progress, Spinner)</li>
              <li>도움말 (Tooltip)</li>
              <li>로딩 상태 (Skeleton)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>다양한 피드백 타입 지원</li>
              <li>자동 사라짐 기능 (Toast)</li>
              <li>애니메이션 효과</li>
              <li>접근성 지원 (ARIA 속성)</li>
              <li>반응형 디자인</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
