<script setup lang="ts">
  import Modal from '~/components/hanui/Modal.vue'
  useHead({
    title: 'Modal - 가이드',
  })

  const showBasicModal = ref(false)
</script>

<template>
  <div class="p-6">
    <h1 class="mb-4 text-2xl font-bold">Modal</h1>

    <!-- 기본 사용법 -->
    <div class="mb-16">
      <Heading level="h2" class="mb-6">기본 사용법</Heading>
      <Card variant="outlined" padding="lg" class="mb-4">
        <div class="flex flex-wrap gap-4">
          <Button variant="primary" @click="showBasicModal = true">
            모달 열기
          </Button>
        </div>
        <Modal
          v-model="showBasicModal"
          title="기본 모달"
          @confirm="showBasicModal = false"
          @close="showBasicModal = false"
        >
        </Modal>
      </Card>
      <Card variant="filled" padding="lg">
        <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
        <pre
          class="bg-krds-gray-5 overflow-x-aul,to rounded-lg p-4 text-sm"
        ><code>&lt;Modal
          v-model="showBasicModal"
          title="기본 모달"
          @confirm="showBasicModal = false"
          @close="showBasicModal = false"
        &gt;
          &lt;p&gt;다이얼로그 내용&lt;/p&gt;
        &lt;/Modal&gt;</code></pre>
      </Card>
    </div>
  </div>
</template>
