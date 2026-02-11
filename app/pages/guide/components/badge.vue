<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Badge from '@/components/hanui/Badge.vue'

  useHead({
    title: 'Badge - 가이드',
  })

  type BadgeVariant =
    | 'gray'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'

  const badgeVariantsForDemo: BadgeVariant[] = [
    'gray',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
  ]

  // figma-main.css 색상 그룹 (figma-main @theme에 정의된 색상)
  const figmaMainColorGroups = [
    {
      title: 'Base',
      colors: [
        { name: 'white', var: '--color-white' },
        { name: 'black', var: '--color-black' },
      ],
    },
    {
      title: 'Primary',
      colors: [
        { name: 'primary-50', var: '--color-primary-50' },
        { name: 'primary-100', var: '--color-primary-100' },
        { name: 'primary-200', var: '--color-primary-200' },
        { name: 'primary-300', var: '--color-primary-300' },
        { name: 'primary-400', var: '--color-primary-400' },
        { name: 'primary-500', var: '--color-primary-500' },
        { name: 'primary-600', var: '--color-primary-600' },
        { name: 'primary-700', var: '--color-primary-700' },
        { name: 'primary-800', var: '--color-primary-800' },
        { name: 'primary-900', var: '--color-primary-900' },
      ],
    },
    {
      title: 'Functional',
      colors: [
        { name: 'functional-positive', var: '--color-functional-positive' },
        { name: 'functional-negative', var: '--color-functional-negative' },
        { name: 'functional-success', var: '--color-functional-success' },
      ],
    },
    {
      title: 'Text',
      colors: [
        { name: 'text-title', var: '--color-text-title' },
        { name: 'text-body', var: '--color-text-body' },
        { name: 'text-caption', var: '--color-text-caption' },
        { name: 'text-placeholder', var: '--color-text-placeholder' },
        { name: 'text-disabled', var: '--color-text-disabled' },
      ],
    },
    {
      title: 'Fill',
      colors: [
        { name: 'fill-50', var: '--color-fill-50' },
        { name: 'fill-100', var: '--color-fill-100' },
        { name: 'fill-200', var: '--color-fill-200' },
      ],
    },
    {
      title: 'Stroke',
      colors: [
        { name: 'stroke-200', var: '--color-stroke-200' },
        { name: 'stroke-300', var: '--color-stroke-300' },
        { name: 'stroke-400', var: '--color-stroke-400' },
        { name: 'stroke-900', var: '--color-stroke-900' },
      ],
    },
  ]
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Badge</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        상태, 카테고리, 카운트 등을 표시하는 배지 컴포넌트입니다. variant, size,
        shape를 조합해 사용합니다.
      </p>

      <!-- Variant - Filled -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant (채움)</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-3">
            <Badge variant="gray">Gray</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </Card>
      </div>

      <!-- Variant - Outline -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant (아웃라인)</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-3">
            <Badge variant="outline-gray">Outline Gray</Badge>
            <Badge variant="outline-primary">Outline Primary</Badge>
            <Badge variant="outline-secondary">Outline Secondary</Badge>
            <Badge variant="outline-success">Outline Success</Badge>
            <Badge variant="outline-warning">Outline Warning</Badge>
            <Badge variant="outline-error">Outline Error</Badge>
            <Badge variant="outline-info">Outline Info</Badge>
          </div>
        </Card>
      </div>

      <!-- Variant - Solid -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant (Solid)</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-3">
            <Badge variant="solid-gray">Solid Gray</Badge>
            <Badge variant="solid-primary">Solid Primary</Badge>
            <Badge variant="solid-secondary">Solid Secondary</Badge>
            <Badge variant="solid-success">Solid Success</Badge>
            <Badge variant="solid-warning">Solid Warning</Badge>
            <Badge variant="solid-error">Solid Error</Badge>
            <Badge variant="solid-info">Solid Info</Badge>
          </div>
        </Card>
      </div>

      <!-- Size (색상별) -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size (색상별)</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">size</code>: md (14px, h-8),
          lg (16px, h-8)
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <div
              v-for="v in badgeVariantsForDemo"
              :key="v"
              class="flex flex-wrap items-center gap-4"
            >
              <span class="text-krds-gray-70 w-20 shrink-0 text-sm">{{
                v
              }}</span>
              <Badge :variant="v" size="md">{{ v }} md</Badge>
              <Badge :variant="v" size="lg">{{ v }} lg</Badge>
            </div>
          </div>
        </Card>
      </div>

      <!-- Shape (색상별) -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">
          Shape (색상별)
          <span class="text-krds-body-sm text-krds-gray-70 ml-2 font-normal">
            (디자인 가이드는 shape='fill' 만 있습니다)
          </span>
        </Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">shape</code>: rounded, pill,
          square
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <div
              v-for="v in badgeVariantsForDemo"
              :key="v"
              class="flex flex-wrap items-center gap-4"
            >
              <span class="text-krds-gray-70 w-20 shrink-0 text-sm">{{
                v
              }}</span>
              <Badge :variant="v" shape="rounded">rounded</Badge>
              <Badge :variant="v" shape="pill">pill</Badge>
              <Badge :variant="v" shape="square">square</Badge>
            </div>
          </div>
        </Card>
      </div>

      <!-- Icon -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">아이콘</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">iconLeft</code>,
          <code class="bg-krds-gray-5 rounded px-1">iconRight</code> 슬롯으로
          아이콘을 넣을 수 있습니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-3">
            <Badge variant="primary">
              <template #iconLeft>
                <Icon name="check" class="h-3.5 w-3.5" />
              </template>
              완료
            </Badge>
            <Badge variant="error">
              오류
              <template #iconRight>
                <Icon name="close-bold" class="h-3.5 w-3.5" />
              </template>
            </Badge>
          </div>
        </Card>
      </div>

      <!-- figma-main.css 색상 -->

      <!-- Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Prop</th>
                  <th class="px-4 py-3 font-bold">Type</th>
                  <th class="px-4 py-3 font-bold">Default</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    variant
                  </td>
                  <td class="px-4 py-3">BadgeVariant</td>
                  <td class="px-4 py-3">'primary'</td>
                  <td class="px-4 py-3">
                    gray, primary, secondary, success, warning, error, info,
                    outline-*, solid-*
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">size</td>
                  <td class="px-4 py-3">'md' | 'lg'</td>
                  <td class="px-4 py-3">'md'</td>
                  <td class="px-4 py-3">
                    text-[14px] h-8 (md), text-[16px] h-8 (lg)
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    shape
                  </td>
                  <td class="px-4 py-3">'rounded' | 'pill' | 'square'</td>
                  <td class="px-4 py-3">'pill'</td>
                  <td class="px-4 py-3">
                    rounded, pill, square (디자인 가이드는 shape='fill' 만
                    있습니다)
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    iconLeft / iconRight
                  </td>
                  <td class="px-4 py-3">slot</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">좌/우 아이콘 슬롯</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>

<style scoped></style>
