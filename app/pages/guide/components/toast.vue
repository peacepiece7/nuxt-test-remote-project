<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import Toast from '@/components/hanui/Toast.vue'

  useHead({
    title: 'Toast - 가이드',
  })

  const toastOpen = ref(false)

const showToast = () => {
  toastOpen.value = true
}
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Toast</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        토스트 컴포넌트입니다. 버튼 클릭으로 토스트를 표시합니다.
      </p>

      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap items-center gap-4">
            <Button variant="primary" @click="showToast">토스트 열기</Button>
          </div>
        </Card>
        <Toast
          :open="toastOpen"
          title="임시저장 되었습니다."
          @update:open="toastOpen = $event"
        />
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">open</code>과
            <code class="bg-krds-gray-5 rounded px-1">update:open</code>으로
            표시 상태를 제어합니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            토스트는 브라우저 상단 중앙에 고정되어 표시됩니다.
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
                  <td class="py-3 px-4 font-mono text-krds-primary-60">open</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">토스트 표시 여부</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">title</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">타이틀 텍스트</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">description</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">본문 텍스트</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">duration</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">1500</td>
                  <td class="py-3 px-4">자동 닫힘 시간(ms)</td>
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
