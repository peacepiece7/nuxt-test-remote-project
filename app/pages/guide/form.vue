<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Form - 가이드',
  })

  const components = getCategoryComponents('form')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Form</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        폼 필드를 구성하고 관리하는 컴포넌트입니다. 입력 필드, 라벨, 에러 메시지 등을 통합적으로 관리합니다.
      </p>

      <div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
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
              Form Field 컴포넌트는 다음과 같은 요소들을 포함합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>라벨 (Label)</li>
              <li>입력 필드 (Input, Textarea, Select 등)</li>
              <li>에러 메시지 (Error Message)</li>
              <li>도움말 텍스트 (Helper Text)</li>
              <li>필수 표시 (Required Indicator)</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>통합된 폼 필드 관리</li>
              <li>자동 에러 표시</li>
              <li>유효성 검사 통합</li>
              <li>접근성 지원 (ARIA 속성)</li>
              <li>일관된 스타일링</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">관련 컴포넌트</Heading>
          <Card variant="outlined" padding="lg">
            <p class="text-krds-body-md text-krds-gray-70 mb-4">
              Form Field는 다른 입력 컴포넌트들과 함께 사용됩니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>Inputs 카테고리의 컴포넌트들</li>
              <li>Selection 카테고리의 컴포넌트들</li>
              <li>Display 카테고리의 Label 컴포넌트</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
