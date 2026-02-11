<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Skeleton from '@/components/hanui/Skeleton.vue'

  useHead({
    title: 'Skeleton - 가이드',
  })
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Skeleton</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        콘텐츠 로딩 중 플레이스홀더를 표시하는 컴포넌트입니다. 버튼, 텍스트, 카드, 테이블 등
        실제 UI 형태에 맞춰 스켈레톤을 구성할 수 있습니다.
      </p>

      <!-- Variant -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          <code class="bg-krds-gray-5 rounded px-1">variant</code>로 모양을 지정합니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap items-end gap-8">
            <div class="flex flex-col items-center gap-2">
              <Skeleton variant="rectangular" width="80px" height="40px" />
              <span class="text-krds-body-sm text-krds-gray-70">rectangular</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Skeleton variant="rounded" width="80px" height="40px" />
              <span class="text-krds-body-sm text-krds-gray-70">rounded</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Skeleton variant="circular" width="48px" height="48px" />
              <span class="text-krds-body-sm text-krds-gray-70">circular</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Skeleton variant="text" width="120px" />
              <span class="text-krds-body-sm text-krds-gray-70">text</span>
            </div>
          </div>
        </Card>
      </div>

      <!-- Button -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">버튼 스켈레톤</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          버튼 로딩 시 버튼 크기에 맞춘 rectangular 스켈레톤을 사용합니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-4">
            <Skeleton variant="rectangular" width="80px" height="40px" class="rounded-md" />
            <Skeleton variant="rectangular" width="100px" height="48px" class="rounded-md" />
            <Skeleton variant="rectangular" width="120px" height="56px" class="rounded-md" />
          </div>
          <p class="mt-4 text-krds-body-sm text-krds-gray-70">
            sm(40px), md(48px), lg(56px) 등 버튼 size에 맞게 height를 맞추세요.
          </p>
        </Card>
      </div>

      <!-- Text -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">텍스트 스켈레톤</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          본문·제목 로딩 시 텍스트 라인 형태의 스켈레톤을 여러 개 배치합니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-col gap-3">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="40%" />
          </div>
          <p class="mt-4 text-krds-body-sm text-krds-gray-70">
            variant="text"는 기본 h-4(w-16)입니다. width로 길이를 조절하세요.
          </p>
        </Card>
      </div>

      <!-- Input -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">입력 필드 스켈레톤</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div>
              <Skeleton variant="text" width="80px" height="16px" class="mb-2" />
              <Skeleton variant="rectangular" width="100%" height="48px" class="rounded-md" />
            </div>
            <div>
              <Skeleton variant="text" width="60px" height="16px" class="mb-2" />
              <Skeleton variant="rectangular" width="100%" height="48px" class="rounded-md" />
            </div>
          </div>
        </Card>
      </div>

      <!-- Card -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">카드 스켈레톤</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          이미지 + 제목 + 본문이 있는 카드 형태의 로딩 플레이스홀더입니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex gap-4">
            <Skeleton variant="rectangular" width="120px" height="120px" class="shrink-0 rounded-md" />
            <div class="flex flex-1 flex-col gap-2">
              <Skeleton variant="text" width="70%" height="20px" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="text" width="50%" />
            </div>
          </div>
        </Card>
      </div>

      <!-- Table -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">테이블 스켈레톤</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          테이블 로딩 시 헤더와 행 셀 형태로 스켈레톤을 배치합니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="overflow-hidden rounded-lg border border-krds-gray-10">
            <!-- Header -->
            <div class="flex border-b border-krds-gray-10 bg-krds-gray-5 p-3">
              <Skeleton variant="rectangular" width="80px" height="20px" class="mr-4 shrink-0" />
              <Skeleton variant="rectangular" width="120px" height="20px" class="mr-4 shrink-0" />
              <Skeleton variant="rectangular" width="100px" height="20px" class="shrink-0" />
            </div>
            <!-- Rows -->
            <div v-for="i in 4" :key="i" class="flex border-b border-krds-gray-5 p-3 last:border-b-0">
              <Skeleton variant="rectangular" width="60px" height="16px" class="mr-4 shrink-0" />
              <Skeleton variant="rectangular" width="100px" height="16px" class="mr-4 shrink-0" />
              <Skeleton variant="rectangular" width="80px" height="16px" class="shrink-0" />
            </div>
          </div>
        </Card>
      </div>

      <!-- Profile / List -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">프로필·리스트 스켈레톤</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          아바타(원형) + 텍스트 라인 조합으로 프로필·리스트 아이템을 표현합니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <div v-for="i in 3" :key="i" class="flex items-center gap-4">
              <Skeleton variant="circular" width="40px" height="40px" />
              <div class="flex flex-1 flex-col gap-2">
                <Skeleton variant="text" width="120px" height="16px" />
                <Skeleton variant="text" width="200px" height="12px" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- disableAnimation -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">애니메이션 비활성화</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          <code class="bg-krds-gray-5 rounded px-1">disableAnimation</code>으로 pulse 애니메이션을 끌 수 있습니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex items-center gap-8">
            <div class="flex flex-col gap-2">
              <Skeleton variant="rectangular" width="80px" height="32px" />
              <span class="text-krds-body-xs text-krds-gray-70">기본 (pulse)</span>
            </div>
            <div class="flex flex-col gap-2">
              <Skeleton variant="rectangular" width="80px" height="32px" :disable-animation="true" />
              <span class="text-krds-body-xs text-krds-gray-70">disableAnimation</span>
            </div>
          </div>
        </Card>
      </div>

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
                  <td class="px-4 py-3 font-mono text-krds-primary-60">variant</td>
                  <td class="px-4 py-3">'rectangular' | 'rounded' | 'circular' | 'text'</td>
                  <td class="px-4 py-3">'rectangular'</td>
                  <td class="px-4 py-3">모양 (직사각형, 둥근모서리, 원형, 텍스트라인)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="px-4 py-3 font-mono text-krds-primary-60">width</td>
                  <td class="px-4 py-3">string | number</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">너비 (px 또는 '100%' 등)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="px-4 py-3 font-mono text-krds-primary-60">height</td>
                  <td class="px-4 py-3">string | number</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">높이</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="px-4 py-3 font-mono text-krds-primary-60">disableAnimation</td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">pulse 애니메이션 비활성화</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="px-4 py-3 font-mono text-krds-primary-60">class</td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">추가 CSS 클래스</td>
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
