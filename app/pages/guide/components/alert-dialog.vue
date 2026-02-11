<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import AlertDialog from '@/components/hanui/AlertDialog.vue'
  import Button from '@/components/hanui/Button.vue'

  useHead({
    title: 'Alert Dialog - 가이드',
  })

  // 기본 예시
  const basicOpen = ref(false)

  // Variant 예시
  const defaultOpen = ref(false)
  const warningOpen = ref(false)
  const dangerOpen = ref(false)
  const infoOpen = ref(false)
  const successOpen = ref(false)

  // 옵션 예시
  const noIconOpen = ref(false)
  const customButtonsOpen = ref(false)

  // Confirm/Cancel 이벤트 예시
  const confirmOpen = ref(false)
  const confirmResult = ref('')

  function onConfirm() {
    confirmResult.value = '확인 클릭'
    confirmOpen.value = false
  }

  function onCancel() {
    confirmResult.value = '취소 클릭'
    confirmOpen.value = false
  }

  // 슬롯(커스텀 컨텐츠) 예시
  const slotOpen = ref(false)
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Alert Dialog</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사용자 확인이 필요한 알림형 대화상자입니다. 제목·설명·확인/취소 버튼이
        포함되며, variant에 따라 아이콘과 스타일이 달라집니다. ESC 키 또는
        배경 클릭으로 닫을 수 있습니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <Button @click="basicOpen = true">기본 Alert Dialog 열기</Button>
            <AlertDialog
              v-model:open="basicOpen"
              title="알림"
              description="기본 형태의 Alert Dialog입니다."
            />
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">v-model:open</code>로
              열림/닫힘 상태를 바인딩합니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">title</code> prop으로
              제목을 지정합니다 (필수).
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">description</code>으로
              부가 설명을 넣을 수 있습니다.
            </li>
            <li>확인/취소 버튼이 기본으로 제공되며, ESC·배경 클릭으로 닫습니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Variant -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant - 스타일 변형</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" @click="defaultOpen = true">
              default
            </Button>
            <Button variant="outline" @click="warningOpen = true">
              warning
            </Button>
            <Button variant="outline" @click="dangerOpen = true">
              danger
            </Button>
            <Button variant="outline" @click="infoOpen = true">
              info
            </Button>
            <Button variant="outline" @click="successOpen = true">
              success
            </Button>
          </div>

          <AlertDialog
            v-model:open="defaultOpen"
            title="기본 알림"
            description="variant: default"
            variant="default"
          />
          <AlertDialog
            v-model:open="warningOpen"
            title="경고"
            description="variant: warning — 주의가 필요한 상황에 사용합니다."
            variant="warning"
          />
          <AlertDialog
            v-model:open="dangerOpen"
            title="위험"
            description="variant: danger — 삭제·되돌릴 수 없는 작업에 사용합니다."
            variant="danger"
            confirm-text="삭제"
          />
          <AlertDialog
            v-model:open="infoOpen"
            title="안내"
            description="variant: info — 참고 정보에 사용합니다."
            variant="info"
          />
          <AlertDialog
            v-model:open="successOpen"
            title="완료"
            description="variant: success — 성공·완료 메시지에 사용합니다."
            variant="success"
          />
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">variant="default"</code
              >: 기본 테두리/버튼
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">variant="warning"</code
              >: 경고 아이콘·색상
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">variant="danger"</code
              >: 위험 아이콘·빨간 버튼
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">variant="info"</code
              >: 정보 아이콘·색상
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">variant="success"</code
              >: 성공 아이콘·색상
            </li>
          </ul>
        </Card>
      </div>

      <!-- Options -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Options - 옵션</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-3">
            <Button variant="outline" @click="noIconOpen = true">
              아이콘 없음
            </Button>
            <Button variant="outline" @click="customButtonsOpen = true">
              버튼 문구 변경
            </Button>
          </div>

          <AlertDialog
            v-model:open="noIconOpen"
            title="아이콘 없음"
            description="showIcon: false 로 아이콘을 숨길 수 있습니다."
            :show-icon="false"
          />
          <AlertDialog
            v-model:open="customButtonsOpen"
            title="버튼 문구 변경"
            description="confirmText, cancelText 로 버튼 텍스트를 바꿀 수 있습니다."
            confirm-text="동의"
            cancel-text="닫기"
          />
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">:show-icon="false"</code
              >: 헤더 아이콘 숨김
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">confirm-text</code
              >: 확인 버튼 문구 (기본: '확인')
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">cancel-text</code
              >: 취소 버튼 문구 (기본: '취소')
            </li>
          </ul>
        </Card>
      </div>

      <!-- Confirm / Cancel 이벤트 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Confirm / Cancel 이벤트</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <Button @click="confirmOpen = true">확인·취소 이벤트 테스트</Button>
            <div v-if="confirmResult" class="text-krds-gray-70 text-sm">
              결과:
              <code class="bg-krds-gray-5 rounded px-1">{{
                confirmResult
              }}</code>
            </div>
          </div>

          <AlertDialog
            v-model:open="confirmOpen"
            title="동작 확인"
            description="확인 또는 취소를 누르면 결과가 표시됩니다."
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">@confirm</code>: 확인
              버튼 클릭 시 발생 (닫기 전에 호출)
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">@cancel</code>: 취소
              버튼·ESC·배경 클릭 시 발생
            </li>
            <li>두 이벤트 모두 내부에서 <code class="bg-krds-gray-5 rounded px-1">update:open(false)</code>가 호출됩니다.</li>
          </ul>
        </Card>
      </div>

      <!-- 슬롯 (커스텀 컨텐츠) -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Slots - 커스텀 컨텐츠</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Button variant="outline" @click="slotOpen = true">
            커스텀 본문이 있는 Alert Dialog
          </Button>

          <AlertDialog
            v-model:open="slotOpen"
            title="추가 내용"
            description="설명 아래에 슬롯으로 넣은 내용이 표시됩니다."
          >
            <p class="text-krds-gray-70 text-sm mt-2 rounded-lg bg-krds-gray-5 p-3">
              여기가 기본 슬롯 영역입니다. 폼 필드나 리스트 등 원하는 내용을 넣을 수 있습니다.
            </p>
          </AlertDialog>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">#default</code>: 제목·설명
              아래, 푸터(버튼) 위에 커스텀 컨텐츠를 넣을 수 있습니다.
            </li>
          </ul>
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
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">open</td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">
                    열림/닫힘 상태 (v-model:open 바인딩)
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    variant
                  </td>
                  <td class="px-4 py-3">'default' | 'warning' | 'danger' | 'info' | 'success'</td>
                  <td class="px-4 py-3">'default'</td>
                  <td class="px-4 py-3">테두리·아이콘·확인 버튼 스타일</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">title</td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">제목 (필수, aria-labelledby에 사용)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    description
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">부가 설명 문구</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    confirmText
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">'확인'</td>
                  <td class="px-4 py-3">확인 버튼 문구</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    cancelText
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">'취소'</td>
                  <td class="px-4 py-3">취소 버튼 문구</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    showIcon
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">true</td>
                  <td class="px-4 py-3">variant별 아이콘 표시 여부</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">class</td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">컨텐츠 래퍼에 적용할 추가 클래스</td>
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
                  <th class="px-4 py-3 font-bold">Payload</th>
                  <th class="px-4 py-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    update:open
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">v-model:open 바인딩용</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    confirm
                  </td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">확인 버튼 클릭 시 (이후 닫힘)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    cancel
                  </td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">취소 버튼·ESC·배경 클릭 시 (이후 닫힘)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- 접근성 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Accessibility - 접근성</Heading>
        <Card variant="outlined" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">role="alertdialog"</code
              >, <code class="bg-krds-gray-5 rounded px-1">aria-modal="true"</code>
              적용
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">aria-labelledby</code
              >에 title 연결
            </li>
            <li>ESC 키로 닫기, 열릴 때 body 스크롤 잠금/해제</li>
          </ul>
        </Card>
      </div>

      <!-- 사용 예시 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">사용 예시</Heading>
        <Card variant="outlined" padding="lg">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">기본 사용</Heading>
              <pre
                class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
              ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue';
import AlertDialog from '@/components/hanui/AlertDialog.vue';
import Button from '@/components/hanui/Button.vue';

const open = ref(false);
&lt;/script&gt;

&lt;template&gt;
  &lt;Button @click="open = true"&gt;열기&lt;/Button&gt;
  &lt;AlertDialog
    v-model:open="open"
    title="알림"
    description="내용을 입력하세요."
  /&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">삭제 확인 (danger)</Heading>
              <pre
                class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
              ><code>&lt;AlertDialog
  v-model:open="deleteOpen"
  variant="danger"
  title="삭제 확인"
  description="이 작업은 되돌릴 수 없습니다."
  confirm-text="삭제"
  @confirm="handleDelete"
  @cancel="deleteOpen = false"
/&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">이벤트 처리</Heading>
              <pre
                class="bg-krds-gray-5 overflow-x-auto rounded-lg p-4 text-sm"
              ><code>&lt;AlertDialog
  v-model:open="open"
  title="확인"
  @confirm="onConfirm"
  @cancel="onCancel"
/&gt;</code></pre>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
