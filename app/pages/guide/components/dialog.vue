<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import Dialog from '@/components/hanui/Dialog.vue'
  import { showAlert, showConfirm, useVfm } from '~/types/dialog'

  useHead({
    title: 'Dialog - 가이드',
  })

  // vue-final-modal 전역 컴포저블
  const vfm = useVfm()

  // 기본 다이얼로그
  const showBasicDialog = ref(false)

  // 사이즈별 다이얼로그
  const showSmDialog = ref(false)
  const showMdDialog = ref(false)
  const showLgDialog = ref(false)
  const showXlDialog = ref(false)
  const showFullDialog = ref(false)

  // 옵션 다이얼로그
  const showNoCloseDialog = ref(false)
  const showNoFooterDialog = ref(false)
  const showNoCancelDialog = ref(false)
  const showCustomTextDialog = ref(false)
  const showLoadingDialog = ref(false)
  const loadingState = ref(false)

  // 커스텀 슬롯 다이얼로그
  const showCustomHeaderDialog = ref(false)
  const showCustomFooterDialog = ref(false)

  const handleLoadingConfirm = async () => {
    loadingState.value = true
    await new Promise((resolve) => setTimeout(resolve, 2000))
    loadingState.value = false
    showLoadingDialog.value = false
  }

  // showAlert 함수 예시
  const handleAlert = async () => {
    await showAlert({ content: '저장이 완료되었습니다.' })
    console.log('Alert 닫힘')
  }

  // showConfirm 함수 예시
  const handleConfirm = async () => {
    const result = await showConfirm({
      title: '삭제 확인',
      content: '정말로 이 항목을 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    })

    if (result) {
      console.log('삭제 확인됨')
      await showAlert({ content: '삭제되었습니다.' })
    } else {
      console.log('삭제 취소됨')
    }
  }

  // useVfm - 모든 모달 닫기
  const handleCloseAll = () => {
    vfm.closeAll()
  }
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Dialog</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사용자에게 정보를 표시하거나 확인을 요청하는 모달 다이얼로그
        컴포넌트입니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-4">
            <Button variant="primary" @click="showBasicDialog = true">
              기본 다이얼로그 열기
            </Button>
          </div>
          <Dialog
            v-model="showBasicDialog"
            title="기본 다이얼로그"
            @confirm="showBasicDialog = false"
            @close="showBasicDialog = false"
          >
            <p>기본 다이얼로그의 내용입니다.</p>
            <p class="mt-2">확인 또는 취소 버튼을 눌러 닫을 수 있습니다.</p>
          </Dialog>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <pre
            class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
          ><code>&lt;Dialog
  v-model="showDialog"
  title="제목"
  @confirm="showDialog = false"
  @close="showDialog = false"
&gt;
  &lt;p&gt;다이얼로그 내용&lt;/p&gt;
&lt;/Dialog&gt;</code></pre>
        </Card>
      </div>

      <!-- 프로그래매틱 사용 (alert, confirm) -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6"
          >프로그래매틱 사용 (alert, confirm)</Heading
        >
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-4">
            <Button variant="primary" @click="handleAlert">
              showAlert()
            </Button>
            <Button variant="outline" @click="handleConfirm">
              showConfirm()
            </Button>
          </div>
          <p class="text-krds-gray-70 mt-3 text-sm">
            await 키워드로 다이얼로그가 닫힐 때까지 기다릴 수 있습니다.
            confirm()은 확인 시 true, 취소 시 false를 반환합니다.
          </p>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <pre
            class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
          ><code>import { showAlert, showConfirm } from '~/types/dialog'

// Alert - 알림 (확인 버튼만)
await showAlert({ content: '저장되었습니다.' })
console.log('Alert 닫힘')

// Confirm - 확인/취소
const result = await showConfirm({
  title: '삭제 확인',
  content: '정말 삭제하시겠습니까?',
  confirmText: '삭제',
  cancelText: '취소',
})

if (result) {
  // 확인 클릭
  await deleteItem()
} else {
  // 취소 클릭
}</code></pre>
        </Card>
      </div>

      <!-- useVfm 컴포저블 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">useVfm - 전역 모달 제어</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-4">
            <Button variant="outline" size="sm" @click="vfm.open('modal-1')">
              모달 1 열기
            </Button>
            <Button variant="outline" size="sm" @click="vfm.open('modal-2')">
              모달 2 열기
            </Button>
            <Button variant="primary" size="sm" @click="handleCloseAll">
              모든 모달 닫기 (closeAll)
            </Button>
          </div>
          <p class="text-krds-gray-70 mt-3 text-sm">
            useVfm()은 열린 모든 모달을 관리하고 제어할 수 있는 전역
            컴포저블입니다.
          </p>

          <Dialog
            modal-id="modal-1"
            title="모달 1"
            size="sm"
            @confirm="vfm.close('modal-1')"
            @close="vfm.close('modal-1')"
          >
            <p>첫 번째 모달입니다.</p>
          </Dialog>
          <Dialog
            modal-id="modal-2"
            title="모달 2"
            size="md"
            @confirm="vfm.close('modal-2')"
            @close="vfm.close('modal-2')"
          >
            <p>두 번째 모달입니다.</p>
          </Dialog>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <pre
            class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
          ><code>import { useVfm } from '~/types/dialog'

const vfm = useVfm()

// 모든 모달 닫기
await vfm.closeAll()

// 특정 모달 열기/닫기 (modal-id prop 필요)
await vfm.open('my-modal-id')
await vfm.close('my-modal-id')
await vfm.toggle('my-modal-id')

// 모달 상태 조회
vfm.modals        // 모든 모달
vfm.openedModals  // 열린 모달들
vfm.dynamicModals // useModal()로 생성된 동적 모달들</code></pre>
          <pre
            class="bg-krds-gray-5 mt-4 overflow-x-auto rounded-lg p-4 text-sm"
          ><code>&lt;!-- modal-id prop을 설정해야 useVfm으로 제어 가능 --&gt;
&lt;Dialog
  modal-id="my-modal-id"
  title="제목"
&gt;
  ...
&lt;/Dialog&gt;</code></pre>
        </Card>
      </div>

      <!-- 사이즈 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size - 크기</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-4">
            <Button variant="outline" size="sm" @click="showSmDialog = true">
              sm (400px)
            </Button>
            <Button variant="outline" size="sm" @click="showMdDialog = true">
              md (500px, 기본)
            </Button>
            <Button variant="outline" size="sm" @click="showLgDialog = true">
              lg (600px)
            </Button>
            <Button variant="outline" size="sm" @click="showXlDialog = true">
              xl (700px)
            </Button>
            <Button variant="outline" size="sm" @click="showFullDialog = true">
              full
            </Button>
          </div>

          <Dialog
            v-model="showSmDialog"
            title="Small 다이얼로그"
            size="sm"
            @confirm="showSmDialog = false"
            @close="showSmDialog = false"
          >
            <p>400px 크기의 다이얼로그입니다.</p>
          </Dialog>
          <Dialog
            v-model="showMdDialog"
            title="Medium 다이얼로그"
            size="md"
            @confirm="showMdDialog = false"
            @close="showMdDialog = false"
          >
            <p>500px 크기의 다이얼로그입니다. (기본값)</p>
          </Dialog>
          <Dialog
            v-model="showLgDialog"
            title="Large 다이얼로그"
            size="lg"
            @confirm="showLgDialog = false"
            @close="showLgDialog = false"
          >
            <p>600px 크기의 다이얼로그입니다.</p>
          </Dialog>
          <Dialog
            v-model="showXlDialog"
            title="XLarge 다이얼로그"
            size="xl"
            @confirm="showXlDialog = false"
            @close="showXlDialog = false"
          >
            <p>700px 크기의 다이얼로그입니다.</p>
          </Dialog>
          <Dialog
            v-model="showFullDialog"
            title="Full 다이얼로그"
            size="full"
            @confirm="showFullDialog = false"
            @close="showFullDialog = false"
          >
            <p>max-w-full 크기의 다이얼로그입니다.</p>
          </Dialog>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <pre
            class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
          ><code>&lt;Dialog size="sm"&gt;...&lt;/Dialog&gt;    &lt;!-- 400px --&gt;
&lt;Dialog size="md"&gt;...&lt;/Dialog&gt;    &lt;!-- 500px (기본값) --&gt;
&lt;Dialog size="lg"&gt;...&lt;/Dialog&gt;    &lt;!-- 600px --&gt;
&lt;Dialog size="xl"&gt;...&lt;/Dialog&gt;    &lt;!-- 700px --&gt;
&lt;Dialog size="full"&gt;...&lt;/Dialog&gt;  &lt;!-- max-w-full --&gt;</code></pre>
        </Card>
      </div>

      <!-- 옵션 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Options - 옵션</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-6">
            <div>
              <Heading level="h3" class="mb-3 text-base"
                >닫기 버튼 숨기기</Heading
              >
              <div class="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  @click="showNoCloseDialog = true"
                >
                  showClose=false
                </Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Footer 숨기기</Heading>
              <div class="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  @click="showNoFooterDialog = true"
                >
                  showFooter=false
                </Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base"
                >취소 버튼 숨기기</Heading
              >
              <div class="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  @click="showNoCancelDialog = true"
                >
                  showCancel=false
                </Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base"
                >버튼 텍스트 변경</Heading
              >
              <div class="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  @click="showCustomTextDialog = true"
                >
                  커스텀 버튼 텍스트
                </Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">로딩 상태</Heading>
              <div class="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  @click="showLoadingDialog = true"
                >
                  로딩 다이얼로그
                </Button>
              </div>
            </div>
          </div>

          <Dialog
            v-model="showNoCloseDialog"
            title="닫기 버튼 없음"
            :show-close="false"
            @confirm="showNoCloseDialog = false"
            @close="showNoCloseDialog = false"
          >
            <p>닫기(X) 버튼이 숨겨진 다이얼로그입니다.</p>
          </Dialog>
          <Dialog
            v-model="showNoFooterDialog"
            title="Footer 없음"
            :show-footer="false"
            @close="showNoFooterDialog = false"
          >
            <p>Footer가 숨겨진 다이얼로그입니다.</p>
            <p class="mt-2">닫기(X) 버튼으로만 닫을 수 있습니다.</p>
          </Dialog>
          <Dialog
            v-model="showNoCancelDialog"
            title="취소 버튼 없음"
            :show-cancel="false"
            @confirm="showNoCancelDialog = false"
            @close="showNoCancelDialog = false"
          >
            <p>취소 버튼이 숨겨진 다이얼로그입니다.</p>
          </Dialog>
          <Dialog
            v-model="showCustomTextDialog"
            title="버튼 텍스트 변경"
            confirm-text="저장하기"
            cancel-text="돌아가기"
            @confirm="showCustomTextDialog = false"
            @close="showCustomTextDialog = false"
          >
            <p>확인/취소 버튼의 텍스트가 변경된 다이얼로그입니다.</p>
          </Dialog>
          <Dialog
            v-model="showLoadingDialog"
            title="데이터 저장"
            :loading="loadingState"
            @confirm="handleLoadingConfirm"
            @close="showLoadingDialog = false"
          >
            <p>확인을 누르면 2초간 로딩 상태가 표시됩니다.</p>
          </Dialog>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <pre
            class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
          ><code>&lt;!-- 닫기 버튼 숨기기 --&gt;
&lt;Dialog :show-close="false"&gt;...&lt;/Dialog&gt;

&lt;!-- Footer 숨기기 --&gt;
&lt;Dialog :show-footer="false"&gt;...&lt;/Dialog&gt;

&lt;!-- 취소 버튼 숨기기 --&gt;
&lt;Dialog :show-cancel="false"&gt;...&lt;/Dialog&gt;

&lt;!-- 버튼 텍스트 변경 --&gt;
&lt;Dialog confirm-text="저장하기" cancel-text="돌아가기"&gt;...&lt;/Dialog&gt;

&lt;!-- 로딩 상태 --&gt;
&lt;Dialog :loading="isLoading" @confirm="handleConfirm"&gt;...&lt;/Dialog&gt;

&lt;!-- 확인 버튼 비활성화 --&gt;
&lt;Dialog :confirm-disabled="!isValid"&gt;...&lt;/Dialog&gt;

&lt;!-- 오버레이 클릭으로 닫기 --&gt;
&lt;Dialog :click-to-close="true"&gt;...&lt;/Dialog&gt;

&lt;!-- ESC 키 닫기 비활성화 --&gt;
&lt;Dialog :esc-to-close="false"&gt;...&lt;/Dialog&gt;</code></pre>
        </Card>
      </div>

      <!-- 커스텀 슬롯 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Slots - 커스텀 슬롯</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-6">
            <div>
              <Heading level="h3" class="mb-3 text-base">커스텀 Header</Heading>
              <div class="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  @click="showCustomHeaderDialog = true"
                >
                  커스텀 Header
                </Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">커스텀 Footer</Heading>
              <div class="flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  @click="showCustomFooterDialog = true"
                >
                  커스텀 Footer
                </Button>
              </div>
            </div>
          </div>

          <Dialog
            v-model="showCustomHeaderDialog"
            @confirm="showCustomHeaderDialog = false"
            @close="showCustomHeaderDialog = false"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <span
                  class="bg-krds-primary-20 text-krds-primary-80 flex h-6 w-6 items-center justify-center rounded-full text-xs"
                >
                  !
                </span>
                <h2 class="text-krds-primary-80 text-lg font-bold">
                  커스텀 헤더
                </h2>
              </div>
            </template>
            <p>header 슬롯을 사용하여 헤더를 커스터마이즈한 예시입니다.</p>
          </Dialog>
          <Dialog
            v-model="showCustomFooterDialog"
            title="커스텀 Footer"
            @close="showCustomFooterDialog = false"
          >
            <p>footer 슬롯을 사용하여 버튼을 커스터마이즈한 예시입니다.</p>
            <template #footer>
              <div class="flex w-full gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  class="flex-1"
                  @click="showCustomFooterDialog = false"
                >
                  이전
                </Button>
                <Button
                  variant="tertiary"
                  size="sm"
                  class="flex-1"
                  @click="showCustomFooterDialog = false"
                >
                  임시저장
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  class="flex-1"
                  @click="showCustomFooterDialog = false"
                >
                  제출
                </Button>
              </div>
            </template>
          </Dialog>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <pre
            class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
          ><code>&lt;!-- 커스텀 Header --&gt;
&lt;Dialog title="기본 제목"&gt;
  &lt;template #header&gt;
    &lt;div class="flex items-center gap-2"&gt;
      &lt;Icon name="info" /&gt;
      &lt;h2 class="text-lg font-bold"&gt;커스텀 헤더&lt;/h2&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;p&gt;다이얼로그 내용&lt;/p&gt;
&lt;/Dialog&gt;

&lt;!-- 커스텀 Footer --&gt;
&lt;Dialog title="제목"&gt;
  &lt;p&gt;다이얼로그 내용&lt;/p&gt;
  &lt;template #footer&gt;
    &lt;div class="flex w-full gap-2"&gt;
      &lt;Button variant="outline" class="flex-1"&gt;이전&lt;/Button&gt;
      &lt;Button variant="tertiary" class="flex-1"&gt;임시저장&lt;/Button&gt;
      &lt;Button variant="primary" class="flex-1"&gt;제출&lt;/Button&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/Dialog&gt;</code></pre>
        </Card>
      </div>

      <!-- Props 테이블 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Prop</th>
                  <th class="px-4 py-3 font-bold">Type</th>
                  <th class="px-4 py-3 font-bold">Default</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    modalId
                  </td>
                  <td class="px-4 py-3">string | symbol</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">useVfm()으로 제어하기 위한 고유 ID</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    title
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">다이얼로그 제목</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">size</td>
                  <td class="px-4 py-3">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                  <td class="px-4 py-3">'md'</td>
                  <td class="px-4 py-3">다이얼로그 크기 (px)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    showClose
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">true</td>
                  <td class="px-4 py-3">닫기(X) 버튼 표시 여부</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    showFooter
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">true</td>
                  <td class="px-4 py-3">Footer 영역 표시 여부</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    showCancel
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">true</td>
                  <td class="px-4 py-3">취소 버튼 표시 여부</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    confirmText
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">'확인'</td>
                  <td class="px-4 py-3">확인 버튼 텍스트</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    cancelText
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">'취소'</td>
                  <td class="px-4 py-3">취소 버튼 텍스트</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    confirmDisabled
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">확인 버튼 비활성화 여부</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    loading
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">로딩 상태</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    clickToClose
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">오버레이 클릭으로 닫기</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    escToClose
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">true</td>
                  <td class="px-4 py-3">ESC 키로 닫기</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    lockScroll
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">true</td>
                  <td class="px-4 py-3">배경 스크롤 잠금</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- Events 테이블 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Events</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Event</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    confirm
                  </td>
                  <td class="px-4 py-3">확인 버튼 클릭 시</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    cancel
                  </td>
                  <td class="px-4 py-3">취소 버튼 클릭 시</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    close
                  </td>
                  <td class="px-4 py-3">다이얼로그 닫힐 때</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    opened
                  </td>
                  <td class="px-4 py-3">다이얼로그 열기 애니메이션 완료 시</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    closed
                  </td>
                  <td class="px-4 py-3">다이얼로그 닫기 애니메이션 완료 시</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- Composable API 테이블 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Composable API</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">함수</th>
                  <th class="px-4 py-3 font-bold">설명</th>
                  <th class="px-4 py-3 font-bold">반환값</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    showAlert(options)
                  </td>
                  <td class="px-4 py-3">알림 다이얼로그 (확인 버튼만)</td>
                  <td class="px-4 py-3">Promise&lt;void&gt;</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    showConfirm(options)
                  </td>
                  <td class="px-4 py-3">확인 다이얼로그 (확인/취소)</td>
                  <td class="px-4 py-3">Promise&lt;boolean&gt;</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    useDialog(options)
                  </td>
                  <td class="px-4 py-3">커스텀 다이얼로그 생성</td>
                  <td class="px-4 py-3">{ open, close, destroy, isLoading }</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    useVfm()
                  </td>
                  <td class="px-4 py-3">전역 모달 관리</td>
                  <td class="px-4 py-3">
                    { closeAll, open, close, toggle, modals, openedModals }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- AlertOptions / ConfirmOptions 테이블 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Options</Heading>
        <Card variant="outlined" padding="lg">
          <Heading level="h3" class="mb-3 text-base">AlertOptions</Heading>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Option</th>
                  <th class="px-4 py-3 font-bold">Type</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    content
                  </td>
                  <td class="px-4 py-3">string (필수)</td>
                  <td class="px-4 py-3">다이얼로그 내용</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    title
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">제목 (기본: '알림')</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    confirmText
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">확인 버튼 텍스트 (기본: '확인')</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">size</td>
                  <td class="px-4 py-3">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                  <td class="px-4 py-3">다이얼로그 크기 (기본: 'sm')</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Heading level="h3" class="mt-6 mb-3 text-base"
            >ConfirmOptions</Heading
          >
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-krds-gray-10 border-b">
                  <th class="px-4 py-3 font-bold">Option</th>
                  <th class="px-4 py-3 font-bold">Type</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    content
                  </td>
                  <td class="px-4 py-3">string (필수)</td>
                  <td class="px-4 py-3">다이얼로그 내용</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    title
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">제목 (기본: '확인')</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    confirmText
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">확인 버튼 텍스트 (기본: '확인')</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    cancelText
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">취소 버튼 텍스트 (기본: '취소')</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">size</td>
                  <td class="px-4 py-3">'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                  <td class="px-4 py-3">다이얼로그 크기 (기본: 'sm')</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
