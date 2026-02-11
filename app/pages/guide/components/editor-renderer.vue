<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import FormField from '@/components/hanui/FormField.vue'
  import FormLabel from '@/components/hanui/FormLabel.vue'
  import FormHelperText from '@/components/hanui/FormHelperText.vue'

  useHead({
    title: 'Editor Renderer - 가이드',
  })

  // EditorRenderder 예제용
  const editorContent = ref(
    '<p>CKEditor로 작성된 <strong>리치 텍스트</strong> 내용입니다.</p><p>볼드, 이탤릭, 목록, 링크 등을 지원합니다.</p><ul><li>목록 항목 1</li><li>목록 항목 2</li></ul>',
  )
  const htmlOnlyContent = ref(
    '<h2>HTML 렌더링 예시</h2><p>renderer="html"일 때 <code>v-html</code>로 출력됩니다.</p><p>읽기 전용 표시에 적합합니다.</p>',
  )
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen py-12">
      <Container>
        <Heading level="h1" class="mb-4">Editor Renderer</Heading>
        <p class="text-krds-body-lg text-krds-gray-70 mb-12">
          CKEditor 기반 리치 텍스트 에디터와 HTML 렌더링을 제공합니다.
          <strong class="text-krds-gray-95">EditorRenderder</strong>는 편집
          모드와 HTML 표시 모드를 전환할 수 있고,
          <strong class="text-krds-gray-95">MyEditorSkeleton</strong>은 에디터
          로딩 중 스켈레톤 UI를 표시합니다.
        </p>

        <!-- EditorRenderder -->
        <section class="mb-20">
          <Heading level="h2" class="mb-2">EditorRenderder</Heading>
          <p class="text-krds-body-md text-krds-gray-70 mb-8">
            <code class="bg-krds-gray-5 rounded px-1">renderer</code>에 따라
            <code class="bg-krds-gray-5 rounded px-1">editor</code>(CKEditor
            편집) 또는
            <code class="bg-krds-gray-5 rounded px-1">html</code>(HTML 읽기 전용
            출력)로 동작합니다.
          </p>

          <!-- Editor 모드 -->
          <div class="mb-16">
            <Heading level="h3" class="mb-4"
              >편집 모드 (renderer="editor")</Heading
            >
            <Card variant="outlined" padding="lg" class="mb-6">
              <FormField>
                <FormLabel>내용 작성</FormLabel>
                <EditorRenderder
                  v-model="editorContent"
                  name="editor_sample"
                  renderer="editor"
                />
                <FormHelperText
                  >CKEditor로 리치 텍스트를 편집할 수 있습니다.</FormHelperText
                >
              </FormField>
            </Card>
          </div>

          <!-- HTML 모드 -->
          <div class="mb-16">
            <Heading level="h3" class="mb-4"
              >HTML 모드 (renderer="html")</Heading
            >
            <Card variant="outlined" padding="lg" class="mb-6">
              <FormField>
                <FormLabel>HTML 읽기 전용 출력</FormLabel>
                <EditorRenderder v-model="htmlOnlyContent" renderer="html" />
                <FormHelperText
                  >편집 없이 HTML을 그대로 렌더링합니다.</FormHelperText
                >
              </FormField>
            </Card>
          </div>

          <!-- EditorRenderder Props -->
          <div class="mb-8">
            <Heading level="h3" class="mb-4">EditorRenderder Props</Heading>
            <Card variant="outlined" padding="lg">
              <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead>
                    <tr class="border-krds-gray-10 border-b">
                      <th class="px-4 py-3 font-bold">Prop</th>
                      <th class="px-4 py-3 font-bold">Type</th>
                      <th class="px-4 py-3 font-bold">Default</th>
                      <th class="px-4 py-3 font-bold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-krds-gray-5 border-b">
                      <td class="text-krds-primary-60 px-4 py-3 font-mono">
                        modelValue
                      </td>
                      <td class="px-4 py-3">string</td>
                      <td class="px-4 py-3">''</td>
                      <td class="px-4 py-3">v-model 바인딩 (HTML 문자열)</td>
                    </tr>
                    <tr class="border-krds-gray-5 border-b">
                      <td class="text-krds-primary-60 px-4 py-3 font-mono">
                        name
                      </td>
                      <td class="px-4 py-3">string</td>
                      <td class="px-4 py-3">-</td>
                      <td class="px-4 py-3">에디터 필드명 (MyCkeditor 전달)</td>
                    </tr>
                    <tr class="border-krds-gray-5 border-b">
                      <td class="text-krds-primary-60 px-4 py-3 font-mono">
                        renderer
                      </td>
                      <td class="px-4 py-3">'html' | 'editor'</td>
                      <td class="px-4 py-3">'editor'</td>
                      <td class="px-4 py-3">
                        html: 읽기 전용 표시, editor: CKEditor 편집
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        <!-- MyEditorSkeleton -->
        <section class="mb-20">
          <Heading level="h2" class="mb-2">MyEditorSkeleton</Heading>
          <p class="text-krds-body-md text-krds-gray-70 mb-8">
            CKEditor 로딩 중에 표시되는 스켈레톤 UI입니다. MyCkeditor 내부에서
            에디터가 준비되기 전까지 사용됩니다. 툴바와 본문 영역 형태의
            플레이스홀더를 보여줍니다.
          </p>

          <div class="mb-16">
            <Heading level="h3" class="mb-4">스켈레톤 미리보기</Heading>
            <Card variant="outlined" padding="lg" class="mb-6">
              <FormField>
                <FormLabel>MyEditorSkeleton</FormLabel>
                <MyEditorSkeleton />
                <FormHelperText
                  >에디터 로딩 시 이 형태의 스켈레톤이
                  표시됩니다.</FormHelperText
                >
              </FormField>
            </Card>
          </div>

          <Card variant="filled" padding="lg">
            <Heading level="h4" class="mb-3 text-base">사용처</Heading>
            <p class="text-krds-body-sm text-krds-gray-70">
              MyCkeditor 컴포넌트에서
              <code class="bg-krds-gray-5 rounded px-1">isLayoutReady</code>
              또는 <code class="bg-krds-gray-5 rounded px-1">editor</code>가
              준비되기 전
              <code class="bg-krds-gray-5 rounded px-1">MyEditorSkeleton</code
              >을 렌더링합니다. 별도 props 없이 사용됩니다.
            </p>
          </Card>
        </section>
      </Container>
    </div>
  </ClientOnly>
</template>

<style scoped></style>
