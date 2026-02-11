<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Selection - 가이드',
  })

  const components = getCategoryComponents('selection')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Selection</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사용자가 옵션을 선택할 수 있도록 하는 선택 컴포넌트들입니다. 단일 선택과 다중 선택을 모두 지원합니다.
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
              Selection 컴포넌트는 다양한 선택 방식을 지원합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>단일 선택 (Radio, Select)</li>
              <li>다중 선택 (Checkbox)</li>
              <li>토글 선택 (Switch)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>다양한 선택 방식 지원</li>
              <li>그룹화 및 그룹 선택</li>
              <li>비활성화 상태 지원</li>
              <li>접근성 지원 (키보드 네비게이션)</li>
              <li>반응형 디자인</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
