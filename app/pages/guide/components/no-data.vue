<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import NoData from '@/components/hanui/NoData.vue'

  useHead({
    title: 'NoData - 가이드',
  })
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">NoData</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        검색 결과가 없을 때 사용자에게 안내하는 빈 상태 컴포넌트입니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card>
          <NoData />
        </Card>
      </div>

      <!-- 커스텀 문구 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">문구 변경</Heading>
        <Card>
          <NoData
            title="데이터가 없습니다."
            :descriptions="[
              '조건을 변경해 다시 검색해 보세요.',
              '필터를 초기화하면 결과가 나타날 수 있습니다.',
            ]"
          />
        </Card>
      </div>

      <!-- Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card>
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">title</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">'검색결과가 없습니다.'</td>
                  <td class="py-3 px-4">타이틀 문구</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">descriptions</td>
                  <td class="py-3 px-4">string[]</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">설명 문구 목록</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">class</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">루트 컨테이너 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
