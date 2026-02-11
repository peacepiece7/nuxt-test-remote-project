<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Pagination from '@/components/hanui/Pagination.vue'

  useHead({
    title: 'Pagination - 가이드',
  })

  const defaultPage = ref(1)
  const totalPages = ref(12)
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Pagination</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        페이지 이동을 위한 Pagination 컴포넌트입니다. 더 보기형은 LoadMore 컴포넌트를 사용합니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Pagination
            v-model:currentPage="defaultPage"
            :total-pages="totalPages"
          />
        </Card>
        <Card variant="filled" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">currentPage</code>와
              <code class="bg-krds-gray-5 rounded px-1">totalPages</code>를 전달합니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">v-model:currentPage</code>로 페이지를 제어합니다.
            </li>
          </ul>
        </Card>
      </div>

      <!-- 기본 형태 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 형태</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Pagination
            v-model:currentPage="defaultPage"
            :total-pages="totalPages"
          />
        </Card>
      </div>

      <!-- 옵션 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">옵션</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Pagination
            v-model:currentPage="defaultPage"
            :total-pages="totalPages"
            :sibling-count="2"
            :show-first-last="false"
          />
        </Card>
        <Card variant="filled" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">siblingCount</code>로 주변 페이지 개수를 조정합니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">showFirstLast</code>,
              <code class="bg-krds-gray-5 rounded px-1">showPreviousNext</code>로 버튼 노출을 제어합니다.
            </li>
          </ul>
        </Card>
      </div>

      <!-- Props 요약 -->
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">variant</td>
                  <td class="py-3 px-4">'default'</td>
                  <td class="py-3 px-4">'default'</td>
                  <td class="py-3 px-4">표현 방식</td>
                </tr>
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">siblingCount</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">1</td>
                  <td class="py-3 px-4">현재 페이지 주변 표시 개수</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">showFirstLast</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">true</td>
                  <td class="py-3 px-4">처음/마지막 버튼</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">showPreviousNext</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">true</td>
                  <td class="py-3 px-4">이전/다음 버튼</td>
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">update:currentPage</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">현재 페이지 변경</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">pageChange</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">페이지 변경 시 호출</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </Container>
  </div>
</template>
