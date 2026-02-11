<script setup lang="ts">
import { ref } from 'vue'
import Container from '@/components/hanui/Container.vue'
import Heading from '@/components/hanui/Heading.vue'
import Card from '@/components/hanui/Card.vue'
import Switch from '@/components/hanui/Switch.vue'
import FormField from '@/components/hanui/FormField.vue'
import FormLabel from '@/components/hanui/FormLabel.vue'
import FormHelperText from '@/components/hanui/FormHelperText.vue'

useHead({
  title: 'Switch - 가이드',
})

const basicValue = ref(false)
const labelValue = ref(true)
const disabledValue = ref(false)
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Switch</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        켜짐/꺼짐 상태를 표현하는 Switch 컴포넌트입니다. 라벨을 지원합니다.
      </p>

      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <FormField>
            <FormLabel>기본 스위치</FormLabel>
            <Switch v-model="basicValue" aria-label="기본 스위치" />
            <FormHelperText>클릭 또는 Space/Enter로 토글됩니다.</FormHelperText>
          </FormField>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">v-model</code>로 상태를 제어합니다.</li>
            <li>라벨이 없으면 <code class="bg-krds-gray-5 px-1 rounded">aria-label</code>을 전달하세요.</li>
          </ul>
        </Card>
      </div>

      <div class="mb-16">
        <Heading level="h2" class="mb-6">라벨</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-4">
            <FormField>
              <FormLabel>라벨 (오른쪽)</FormLabel>
              <Switch v-model="labelValue" label="알림 받기" />
            </FormField>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">label</code>로 라벨을 표시합니다.</li>
          </ul>
        </Card>
      </div>

      <div class="mb-16">
        <Heading level="h2" class="mb-6">비활성</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <FormField>
            <FormLabel>비활성 스위치</FormLabel>
            <Switch v-model="disabledValue" disabled label="비활성" />
            <FormHelperText>disabled 상태에서는 토글되지 않습니다.</FormHelperText>
          </FormField>
        </Card>
      </div>

      <div>
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card variant="outlined" padding="lg">
          <ul class="list-disc pl-5 text-krds-body-sm text-krds-gray-80 space-y-1">
            <li><span class="font-medium">modelValue</span>: boolean (v-model)</li>
            <li><span class="font-medium">disabled</span>: boolean (비활성화)</li>
            <li><span class="font-medium">label</span>: string (라벨 텍스트)</li>
            <li><span class="font-medium">ariaLabel</span>: string (라벨이 없을 때)</li>
          </ul>
        </Card>
      </div>
    </Container>
  </div>
</template>
