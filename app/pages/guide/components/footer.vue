<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Footer from '@/components/hanui/Footer.vue'

  useHead({
    title: 'Footer - 가이드',
  }) 

</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Footer</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사이트 하단에서 정책 링크, 연락처, 소셜, 스토어 링크 등을 제공하는 푸터입니다.
        현재는 고정된 콘텐츠로 구성되어 있습니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card>
          <Footer />
        </Card>
      </div>
    </Container>
  </div>
</template>
