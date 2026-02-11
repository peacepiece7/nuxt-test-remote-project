<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Tabs from '@/components/hanui/Tabs.vue'
  const pageOptions = [
    { id: 'page-1', text: '1Depth' },
    { id: 'page-2', text: '2Depth' },
    { id: 'page-3', text: '3Depth' },
  ]
  const popupOptions = [
    { id: 'popup-1', text: '1Depth' },
    { id: 'popup-2', text: '2Depth' },
    { id: 'popup-3', text: '3Depth' },
  ]
  const depth1Options = [
    { id: 'depth1-1', text: '1Depth' },
    { id: 'depth1-2', text: '2Depth' },
    { id: 'depth1-3', text: '3Depth' },
  ]
  const depth2Options = [
    { id: 'depth2-1', text: '2depth' },
    { id: 'depth2-2', text: '2depth' },
    { id: 'depth2-3', text: '2depth' },
    { id: 'depth2-4', text: '2depth' },
    { id: 'depth2-5', text: '2depth' },
    { id: 'depth2-6', text: '2depth' },
    { id: 'depth2-7', text: '2depth' },
    { id: 'depth2-8', text: '2depth' },
    { id: 'depth2-9', text: '2depth' },
    { id: 'depth2-10', text: '2depth' },
    { id: 'depth2-11', text: '2depth' },
    { id: 'depth2-12', text: '2depth' },
  ]

  const pageTab = ref('page-1')
  const popupTab = ref('popup-1')
  const depth1Tab = ref('depth1-1')
  const depth1ActiveTab = ref('depth1-1')
  const depth2Tab = ref('depth2-1')

  useHead({
    title: 'Tabs - 가이드',
  })
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Tabs</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        탭을 통해 관련 콘텐츠를 분리하고 전환할 수 있습니다.
      </p>

      <!-- Size -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size</Heading>
        <Card variant="outlined" padding="lg" class="mb-6 space-y-10">
          <div class="space-y-4">
            <Heading level="h3" class="text-base">Page</Heading>
            <Tabs
              v-model="pageTab"
              variant="depth1"
              size="page"
              :options="pageOptions"
              label-key="text"
              value-key="id"
            />
          </div>
          <div class="space-y-4">
            <Heading level="h3" class="text-base">Popup</Heading>
            <Tabs
              v-model="popupTab"
              variant="depth1"
              size="popup"
              :options="popupOptions"
              label-key="text"
              value-key="id"
            />
          </div>
        </Card>
      </div>

      <!-- Variant -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant</Heading>
        <Card variant="outlined" padding="lg" class="mb-6 space-y-10">
          <div class="space-y-4">
            <Heading level="h3" class="text-base">Depth1</Heading>
            <Tabs
              v-model="depth1Tab"
              variant="depth1"
              size="page"
              :options="depth1Options"
              label-key="text"
              value-key="id"
              @change="(a) => console.log(a)"
            />
          </div>
          <div class="space-y-4">
            <Heading level="h3" class="text-base">Depth2</Heading>
            <Tabs
              v-model="depth2Tab"
              variant="depth2"
              size="page"
              :options="depth2Options"
              label-key="text"
              value-key="id"
            />
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
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Event</th>
                  <th class="px-4 py-3 font-bold">Payload</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    update:modelValue
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">선택 탭이 변경될 때 발생 (v-model)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    change
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">선택 탭이 변경될 때 발생</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
