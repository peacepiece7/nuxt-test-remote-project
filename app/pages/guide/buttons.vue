<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getCategoryComponents } from '@/composables/useGuideMenu'

  useHead({
    title: 'Buttons - 가이드',
  })

  const components = getCategoryComponents('buttons')
  const variants = [
    { name: 'Primary', description: '주요 액션에 사용되는 기본 버튼입니다.' },
    { name: 'Secondary', description: '보조 액션에 사용되는 버튼입니다.' },
    { name: 'Tertiary', description: '덜 중요한 액션에 사용되는 버튼입니다.' },
    { name: 'Success', description: '성공 액션에 사용되는 버튼입니다.' },
    { name: 'Danger', description: '위험한 액션에 사용되는 버튼입니다.' },
  ]
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Buttons</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사용자 액션을 트리거하는 버튼 컴포넌트입니다. 다양한 스타일과 크기를 지원합니다.
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card
          v-for="variant in variants"
          :key="variant.name"
          variant="outlined"
          padding="lg"
        >
          <Heading level="h3" class="mb-3">{{ variant.name }}</Heading>
          <p class="text-krds-body-md text-krds-gray-70">
            {{ variant.description }}
          </p>
        </Card>
      </div>

      <div class="mt-16 space-y-8">
        <div>
          <Heading level="h2" class="mb-4">사용 예시</Heading>
          <Card variant="outlined" padding="lg">
            <p class="text-krds-body-md text-krds-gray-70 mb-4">
              Button 컴포넌트는 다양한 크기와 스타일을 지원합니다:
            </p>
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>XS, SM, MD, LG, XL 크기</li>
              <li>Primary, Secondary, Tertiary 등 다양한 변형</li>
              <li>로딩 상태 표시</li>
              <li>비활성화 상태</li>
              <li>아이콘 포함 버튼</li>
            </ul>
          </Card>
        </div>

        <div>
          <Heading level="h2" class="mb-4">주요 기능</Heading>
          <Card variant="outlined" padding="lg">
            <ul class="list-disc list-inside space-y-2 text-krds-body-md text-krds-gray-70">
              <li>다양한 스타일 변형</li>
              <li>다양한 크기 옵션</li>
              <li>로딩 상태 지원</li>
              <li>접근성 지원 (키보드, 스크린 리더)</li>
              <li>반응형 디자인</li>
            </ul>
          </Card>
        </div>
      </div>
    </Container>
  </div>
</template>
