<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Tag from '@/components/hanui/Tag.vue'
  import type { TagData } from '@/components/hanui/Tag.vue'

  useHead({
    title: 'Tag - 가이드',
  })

  const tagItems: TagData[] = [
    { label: '#기본', value: 'basic' },
    { label: '#기본태그', value: 'basic-tag' },
  ]

  const searchTag: TagData = { label: '#검색', value: 'search' }

  const handleSearchIconClick = (tag?: TagData) => {
    console.log('search icon click', tag)
  }
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Tag</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        태그 컴포넌트입니다. 기본/카드/검색 형태를 제공합니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-3">
            <Tag>#기본</Tag>
            <Tag>#기본태그</Tag>
            <Tag v-for="item in tagItems" :key="item.value" :data="item" />
          </div>
        </Card>
      </div>

      <!-- Variants -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variants</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-3">
            <Tag variant="default">#default</Tag>
            <Tag variant="card">#card</Tag>
            <Tag
              variant="search"
              :data="searchTag"
              @searchIconClick="handleSearchIconClick"
            />
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">variant</code>:
            <code class="bg-krds-gray-5 rounded px-1">'default' | 'card' | 'search'</code>
          </p>
          <p class="text-krds-gray-70 text-sm">
            검색 태그는 아이콘 클릭 시 <code class="bg-krds-gray-5 rounded px-1">searchIconClick</code> 이벤트가 발생합니다.
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">variant</td>
                  <td class="py-3 px-4">'default' | 'card' | 'search'</td>
                  <td class="py-3 px-4">'default'</td>
                  <td class="py-3 px-4">태그 스타일</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">data</td>
                  <td class="py-3 px-4">{`{ label: string; value: string }`}</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">데이터 바인딩</td>
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">searchIconClick</td>
                  <td class="py-3 px-4">{`{ label: string; value: string } | undefined`}</td>
                  <td class="py-3 px-4">검색 태그 아이콘 클릭</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
