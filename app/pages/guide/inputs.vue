<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Inputs - 가이드',
  })

  const components = getCategoryComponents('inputs')
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Inputs</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사용자로부터 데이터를 입력받기 위한 입력 필드 컴포넌트들입니다. 다양한
        입력 타입과 상태를 지원합니다.
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
              Input 컴포넌트는 다양한 입력 타입을 지원합니다:
            </p>
            <ul
              class="text-krds-body-md text-krds-gray-70 list-inside list-disc space-y-2"
            >
              <li>텍스트 입력</li>
              <li>이메일 입력</li>
              <li>비밀번호 입력</li>
              <li>숫자 입력</li>
              <li>검색 입력</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul
              class="text-krds-body-md text-krds-gray-70 list-inside list-disc space-y-2"
            >
              <li>다양한 입력 타입 지원</li>
              <li>유효성 검사 및 에러 표시</li>
              <li>플레이스홀더 및 힌트 텍스트</li>
              <li>접근성 지원 (ARIA 속성)</li>
              <li>반응형 디자인</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
