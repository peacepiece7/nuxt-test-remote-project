<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import FormField from '@/components/hanui/FormField.vue'
  import FormLabel from '@/components/hanui/FormLabel.vue'
  import FormHelperText from '@/components/hanui/FormHelperText.vue'

  useHead({
    title: 'File Upload - 가이드',
  })

  interface FileValue {
    name: string
    size: number
    sortSeqNo: number
    file?: File | null
    fileLnkTpCd?: string | null
    fileUuid?: string | null
  }

  // VFileUpload용 (직접 바인딩)
  const vFileUploadSingle = ref<FileValue[]>([])
  const vFileUploadMulti = ref<FileValue[]>([])
  const vFileUploadFormat = ref<FileValue[]>([])
  // prettier-ignore
  const vFileUploadReadonly = ref<FileValue[]>([
    { name: '샘플_문서.pdf', size: 525600, sortSeqNo: 0, fileUuid: 'sample-1' },
    { name: '샘플_문서.docx', size: 25600, sortSeqNo: 1, fileUuid: 'sample-2' },
    { name: '샘플_문서.jpg', size: 1125600, sortSeqNo: 2, fileUuid: 'sample-3' },
    { name: '샘플_문서.png', size: 25600, sortSeqNo: 3, fileUuid: 'sample-4' },
    { name: '샘플_문서.pdf', size: 25600, sortSeqNo: 4, fileUuid: 'sample-5' },
    { name: '샘플_문서.docx', size: 25600, sortSeqNo: 5, fileUuid: 'sample-6' },
    { name: '샘플_문서.jpg', size: 25600, sortSeqNo: 6, fileUuid: 'sample-7' },
    { name: '샘플_문서.png', size: 25600, sortSeqNo: 7, fileUuid: 'sample-8' },
  ])
  const vFileUploadDisabled = ref<FileValue[]>([])
  const vFileUploadWithContent = ref<FileValue[]>([])

  // FileUploadContent용 (안내 문구 + 업로드 예시)
  const attachDocDtoMulti = ref({
    atchDocMthCtet: '<p>여러 개의 파일을 첨부할 수 있습니다.</p>',
    formTpCd: '20',
    atchDocNm: '문서 서류',
    atchDocKindList: '*.pdf;*.doc;*.docx;*.jpg;*.png',
    multiFileAtchYn: 'Y',
  })

  const fileUpload = useFileUpload()

  const downloadFile = async (file: FileValue) => {
    if (file.fileUuid) {
      await fileUpload.fileDownload({
        fileUuid: file.fileUuid,
        sortSeqNo: file.sortSeqNo.toString(),
      })
    }
  }
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">File Upload</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        파일을 드래그 앤 드롭하거나 선택하여 업로드하는 컴포넌트입니다.
        <strong class="text-krds-gray-95">VFileUpload</strong> 원자
        컴포넌트(Atom)를
        <code class="bg-krds-gray-5 rounded px-1">v-model</code>,
        <code class="bg-krds-gray-5 rounded px-1">fileFormat</code>,
        <code class="bg-krds-gray-5 rounded px-1">accept</code> 등으로 직접
        사용합니다.
      </p>

      <!-- ==================== VFileUpload ==================== -->
      <section class="mb-20">
        <Heading level="h2" class="mb-2"> VFileUpload </Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-8">
          원자(Atom) 컴포넌트로, 폼 연동 없이 직접 사용할 수 있습니다.
          <code class="bg-krds-gray-5 rounded px-1">v-model</code>과
          <code class="bg-krds-gray-5 rounded px-1">fileFormat</code>,
          <code class="bg-krds-gray-5 rounded px-1">accept</code> 등 props를
          직접 전달합니다.
        </p>

        <!-- VFileUpload - Single -->
        <div class="mb-16">
          <Heading level="h3" class="mb-4">단일 업로드</Heading>
          <Card variant="outlined" padding="lg" class="mb-6">
            <FormField>
              <FormLabel>단일 파일 첨부</FormLabel>
              <VFileUpload
                v-model="vFileUploadSingle"
                title="신청서류"
                :total-size="20"
              />
              <FormHelperText
                >파일을 선택하거나 영역에 드래그하여 넣으세요.</FormHelperText
              >
            </FormField>
          </Card>
        </div>

        <!-- VFileUpload - Multi -->
        <div class="mb-16">
          <Heading level="h3" class="mb-4">다중 업로드</Heading>
          <p class="text-krds-body-sm text-krds-gray-70 mb-4">
            <code class="bg-krds-gray-5 rounded px-1">multiple</code> prop으로
            다중 업로드로 동작합니다.
          </p>
          <Card variant="outlined" padding="lg" class="mb-6">
            <FormField>
              <FormLabel>다중 파일 첨부</FormLabel>
              <VFileUpload
                v-model="vFileUploadMulti"
                title="문서 서류"
                :multiple="true"
                :max-length="10"
                :total-size="20"
                :file-format="['pdf', 'doc', 'docx', 'jpg', 'png']"
              />
              <FormHelperText
                >PDF, Word, JPG, PNG 등 여러 파일을 첨부할 수
                있습니다.</FormHelperText
              >
            </FormField>
          </Card>
        </div>

        <!-- VFileUpload - Format 제한 -->
        <div class="mb-16">
          <Heading level="h3" class="mb-4">파일 형식 제한</Heading>
          <Card variant="outlined" padding="lg" class="mb-6">
            <FormField>
              <FormLabel>PDF, Word만 허용</FormLabel>
              <VFileUpload
                v-model="vFileUploadFormat"
                title="워드 문서 서류"
                :total-size="20"
                :file-format="['pdf', 'doc', 'docx']"
                accept=".pdf,.doc,.docx"
              />
              <FormHelperText
                >pdf, doc, docx 확장자만 선택 가능합니다.</FormHelperText
              >
            </FormField>
          </Card>
        </div>

        <!-- VFileUpload - Readonly -->
        <div class="mb-16">
          <Heading level="h3" class="mb-4">읽기 전용 (다운로드만)</Heading>
          <Card variant="outlined" padding="lg" class="mb-6">
            <FormField>
              <FormLabel>제출된 첨부파일</FormLabel>
              <VFileUpload
                v-model="vFileUploadReadonly"
                title="문서 서류"
                readonly-and-download
                @download="downloadFile"
              />
              <FormHelperText
                >파일명 클릭 시 다운로드 시도 (가이드에서는 샘플 UUID로 동작하지
                않을 수 있음)</FormHelperText
              >
            </FormField>
          </Card>
        </div>

        <!-- VFileUpload - Disabled -->
        <div class="mb-16">
          <Heading level="h3" class="mb-4">Disabled</Heading>
          <Card variant="outlined" padding="lg" class="mb-6">
            <FormField disabled>
              <FormLabel>비활성화된 파일 첨부</FormLabel>
              <VFileUpload
                v-model="vFileUploadDisabled"
                title="신청서류"
                :total-size="20"
                disabled
              />
            </FormField>
          </Card>
        </div>

        <!-- VFileUpload - FileUploadContent (안내 문구 + 업로드) -->
        <div class="mb-16">
          <Heading level="h3" class="mb-4"
            >FileUploadContent (안내 문구 + 업로드)</Heading
          >
          <Card variant="outlined" padding="lg" class="mb-6">
            <FormField>
              <FormLabel>안내 문구 + 다중 업로드</FormLabel>
              <FileUploadContent :attach-doc-list-dto="attachDocDtoMulti" />
              <VFileUpload
                v-model="vFileUploadWithContent"
                title="문서 서류"
                :multiple="true"
                :max-length="10"
                :total-size="20"
                :file-format="['pdf', 'doc', 'docx', 'jpg', 'png']"
              />
            </FormField>
          </Card>
        </div>

        <!-- VFileUpload Props -->
        <div class="mb-8">
          <Heading level="h3" class="mb-4">VFileUpload Props</Heading>
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
                    <td class="px-4 py-3">FileValue[]</td>
                    <td class="px-4 py-3">[]</td>
                    <td class="px-4 py-3">v-model 바인딩</td>
                  </tr>
                  <tr class="border-krds-gray-5 border-b">
                    <td class="text-krds-primary-60 px-4 py-3 font-mono">
                      multiple
                    </td>
                    <td class="px-4 py-3">boolean</td>
                    <td class="px-4 py-3">false</td>
                    <td class="px-4 py-3">다중 업로드 여부</td>
                  </tr>
                  <tr class="border-krds-gray-5 border-b">
                    <td class="text-krds-primary-60 px-4 py-3 font-mono">
                      fileFormat
                    </td>
                    <td class="px-4 py-3">string[]</td>
                    <td class="px-4 py-3">[]</td>
                    <td class="px-4 py-3">허용 확장자 (예: ['pdf','doc'])</td>
                  </tr>
                  <tr class="border-krds-gray-5 border-b">
                    <td class="text-krds-primary-60 px-4 py-3 font-mono">
                      accept
                    </td>
                    <td class="px-4 py-3">string</td>
                    <td class="px-4 py-3">''</td>
                    <td class="px-4 py-3">input accept 속성</td>
                  </tr>
                  <tr class="border-krds-gray-5 border-b">
                    <td class="text-krds-primary-60 px-4 py-3 font-mono">
                      maxLength
                    </td>
                    <td class="px-4 py-3">number</td>
                    <td class="px-4 py-3">100</td>
                    <td class="px-4 py-3">최대 개수</td>
                  </tr>
                  <tr class="border-krds-gray-5 border-b">
                    <td class="text-krds-primary-60 px-4 py-3 font-mono">
                      totalSize
                    </td>
                    <td class="px-4 py-3">number</td>
                    <td class="px-4 py-3">20</td>
                    <td class="px-4 py-3">최대 파일 크기(MB)</td>
                  </tr>
                  <tr class="border-krds-gray-5 border-b">
                    <td class="text-krds-primary-60 px-4 py-3 font-mono">
                      readonlyAndDownload
                    </td>
                    <td class="px-4 py-3">boolean</td>
                    <td class="px-4 py-3">false</td>
                    <td class="px-4 py-3">읽기 전용 + 다운로드만</td>
                  </tr>
                  <tr class="border-krds-gray-5 border-b">
                    <td class="text-krds-primary-60 px-4 py-3 font-mono">
                      disabled
                    </td>
                    <td class="px-4 py-3">boolean</td>
                    <td class="px-4 py-3">false</td>
                    <td class="px-4 py-3">비활성화</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>
    </Container>
  </div>
</template>

<style scoped></style>
