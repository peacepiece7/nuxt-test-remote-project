<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Breadcrumb from '@/components/hanui/Breadcrumb.vue'

  type BreadcrumbItem = {
    label: string
    value?: string
    href?: string
    isCurrent?: boolean
  }

  useHead({
    title: 'Breadcrumb - 가이드',
  })

  const basicItems: BreadcrumbItem[] = [
    { label: '홈', value: 'home', href: '/' },
    { label: '서비스', value: 'service', href: '/service' },
    { label: '공지사항', value: 'notice', href: '/service/notice' },
    { label: '상세', value: 'detail'},
  ]

  const longItems: BreadcrumbItem[] = [
    { label: '홈', value: 'home', href: '/' },
    { label: '서비스', value: 'service', href: '/service' },
    { label: '공지사항', value: 'notice', href: '/service/notice' },
    { label: '정책안내', value: 'policy', href: '/service/notice/policy' },
    { label: '상세', value: 'detail'},
  ]
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Breadcrumb</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        현재 위치를 계층 구조로 표시하는 컴포넌트입니다.
        링크는 NuxtLink로 렌더링됩니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Breadcrumb :items="basicItems" />
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">items</code>로 경로 목록을 전달합니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            홈 아이템은 <code class="bg-krds-gray-5 rounded px-1">value: 'home'</code>을 사용하면
            홈 아이콘이 표시됩니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            구분자는 기본적으로 <code class="bg-krds-gray-5 rounded px-1">chevron-right</code> 아이콘입니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            링크는 호버 시 배경이 강조되고 밑줄이 표시됩니다.
          </p>
        </Card>
      </div>

      <!-- 축약 표시 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">축약 표시</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Breadcrumb :items="longItems" :max-items="3" />
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">maxItems</code>를 설정하면 중간 경로가 축약됩니다.
          </p>
        </Card>
      </div>

      <!-- Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-krds-gray-10">
                  <th class="py-3 px-4 font-bold">Prop</th>
                  <th class="py-3 px-4 font-bold">Type</th>
                  <th class="py-3 px-4 font-bold">Default</th>
                  <th class="py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">items</td>
                  <td class="py-3 px-4">BreadcrumbItem[]</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">표시할 경로 목록</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">items.label</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">표시 텍스트</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">items.value</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">아이템 식별 값 (home 사용 가능)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">items.href</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">클릭 이동 URL</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">items.isCurrent</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">현재 위치 표시</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">separator</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">""</td>
                  <td class="py-3 px-4">구분자 텍스트 (빈 값이면 아이콘)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">maxItems</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">최대 표시 개수</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">itemsBeforeCollapse</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">1</td>
                  <td class="py-3 px-4">축약 전 표시 개수</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">itemsAfterCollapse</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">1</td>
                  <td class="py-3 px-4">축약 후 표시 개수</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">ariaLabel</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">"Breadcrumb"</td>
                  <td class="py-3 px-4">aria-label 텍스트</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">class</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">추가 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
