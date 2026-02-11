<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import LoadMore from '@/components/hanui/LoadMore.vue'

  useHead({
    title: 'Load More - 가이드',
  })

  const currentPage = ref(1)
  const totalPages = ref(12)
  const hasMore = ref(true)
  const isLoading = ref(false)
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Load More</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        더 보기 버튼 컴포넌트입니다. 리스트/카드의 추가 로딩에 사용합니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <LoadMore
            :current-page="currentPage"
            :total-pages="totalPages"
            :has-more="hasMore"
            :is-loading="isLoading"
          />
        </Card>
        <Card variant="filled" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">currentPage</code>와
              <code class="bg-krds-gray-5 rounded px-1">totalPages</code>를 전달합니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">hasMore</code>가
              <code class="bg-krds-gray-5 rounded px-1">false</code>이면 버튼이 비활성화됩니다.
            </li>
          </ul>
        </Card>
      </div>

      <!-- 상태 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">상태</Heading>
        <Card variant="outlined" padding="lg" class="mb-4 space-y-6">
          <div class="space-y-3">
            <Heading level="h3" class="text-lg">로딩</Heading>
            <LoadMore
              :current-page="currentPage"
              :total-pages="totalPages"
              :has-more="hasMore"
              :is-loading="true"
            />
          </div>
          <div class="space-y-3">
            <Heading level="h3" class="text-lg">더 보기 없음</Heading>
            <LoadMore
              :current-page="currentPage"
              :total-pages="totalPages"
              :has-more="false"
              :is-loading="false"
            />
          </div>
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">currentPage</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">필수</td>
                  <td class="py-3 px-4">현재 페이지</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">totalPages</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">필수</td>
                  <td class="py-3 px-4">총 페이지 수</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">hasMore</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">true</td>
                  <td class="py-3 px-4">더 보기 가능 여부</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">isLoading</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">로딩 상태</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">labels</td>
                  <td class="py-3 px-4">object</td>
                  <td class="py-3 px-4">{}</td>
                  <td class="py-3 px-4">라벨 문구 재정의</td>
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

      <!-- Events -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Events</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-krds-gray-10">
                  <th class="py-3 px-4 font-bold">Event</th>
                  <th class="py-3 px-4 font-bold">Payload</th>
                  <th class="py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">loadMore</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">더 보기 클릭 시 호출</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
