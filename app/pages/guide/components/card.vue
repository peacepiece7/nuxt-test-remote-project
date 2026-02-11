<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'

  useHead({
    title: 'Card - 가이드',
  })
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Card</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        콘텐츠를 묶어 보여주는 카드 컴포넌트입니다.
      </p>

      <!-- Data List -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Data List</Heading>
        <Card>
          <dl class="space-y-3">
            <div class="flex items-center gap-2">
              <dt class="text-krds-body-sm font-bold text-krds-gray-90 tracking-[-0.32px]">
                회원명
              </dt>
              <dd class="flex-1 text-right text-krds-body-sm text-krds-gray-80 tracking-[-0.32px]">
                김대한
              </dd>
            </div>
            <div class="flex items-center gap-2">
              <dt class="text-krds-body-sm font-bold text-krds-gray-90 tracking-[-0.32px]">
                회원ID
              </dt>
              <dd class="flex-1 text-right text-krds-body-sm text-krds-gray-80 tracking-[-0.32px]">
                abcd12345
              </dd>
            </div>
            <div class="flex items-center gap-2">
              <dt class="text-krds-body-sm font-bold text-krds-gray-90 tracking-[-0.32px]">
                이메일 주소
              </dt>
              <dd class="flex-1 text-right text-krds-body-sm text-krds-gray-80 tracking-[-0.32px]">
                abcd@naver.com
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      <!-- Example Code -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">예시 코드</Heading>
        <Card>
          <pre class="whitespace-pre-wrap text-krds-body-sm text-krds-gray-80">
<code v-pre>&lt;Card&gt;
  &lt;dl class="space-y-3"&gt;
    &lt;div class="flex items-center gap-2"&gt;
      &lt;dt class="text-krds-body-sm font-bold text-krds-gray-90 tracking-[-0.32px]"&gt;
        회원명
      &lt;/dt&gt;
      &lt;dd class="flex-1 text-right text-krds-body-sm text-krds-gray-80 tracking-[-0.32px]"&gt;
        김대한
      &lt;/dd&gt;
    &lt;/div&gt;
    &lt;div class="flex items-center gap-2"&gt;
      &lt;dt class="text-krds-body-sm font-bold text-krds-gray-90 tracking-[-0.32px]"&gt;
        회원ID
      &lt;/dt&gt;
      &lt;dd class="flex-1 text-right text-krds-body-sm text-krds-gray-80 tracking-[-0.32px]"&gt;
        abcd12345
      &lt;/dd&gt;
    &lt;/div&gt;
    &lt;div class="flex items-center gap-2"&gt;
      &lt;dt class="text-krds-body-sm font-bold text-krds-gray-90 tracking-[-0.32px]"&gt;
        이메일 주소
      &lt;/dt&gt;
      &lt;dd class="flex-1 text-right text-krds-body-sm text-krds-gray-80 tracking-[-0.32px]"&gt;
        abcd@naver.com
      &lt;/dd&gt;
    &lt;/div&gt;
  &lt;/dl&gt;
&lt;/Card&gt;</code>
          </pre>
        </Card>
      </div>
    </Container>
  </div>
</template>
