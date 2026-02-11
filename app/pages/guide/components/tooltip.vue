<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import HanuiTooltip from '@/components/hanui/Tooltip.vue'

  useHead({
    title: 'Tooltip - 가이드',
  })
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Tooltip</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        마우스 호버 또는 포커스 시 짧은 설명을 보여주는 툴팁 컴포넌트입니다.
        <code class="bg-krds-gray-5 rounded px-1">content</code>,
        <code class="bg-krds-gray-5 rounded px-1">variant</code>,
        <code class="bg-krds-gray-5 rounded px-1">position</code> 등을 조합해
        사용합니다.
      </p>

      <!-- Variant -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">variant</code>: default
          (진한 배경), light (흰 배경 + 테두리)
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-4">
            <HanuiTooltip content="기본 툴팁 (default)" variant="default">
              <button
                type="button"
                class="bg-krds-gray-90 rounded px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Default
              </button>
            </HanuiTooltip>
            <HanuiTooltip content="라이트 툴팁 (light)" variant="light">
              <button
                type="button"
                class="border-krds-gray-20 text-krds-gray-90 hover:bg-krds-gray-5 rounded border bg-white px-4 py-2 text-sm font-medium"
              >
                Light
              </button>
            </HanuiTooltip>
          </div>
        </Card>
      </div>

      <!-- Position -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Position</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">position</code>: top,
          bottom — 툴팁이 표시될 방향입니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div
            class="flex flex-col items-center justify-center gap-8 self-center py-8"
          >
            <div>
              <HanuiTooltip content="위쪽 툴팁" position="top">
                <button
                  type="button"
                  class="bg-krds-primary-80 rounded px-4 py-2 text-sm font-medium text-white"
                >
                  Top
                </button>
              </HanuiTooltip>
            </div>

            <div>
              <HanuiTooltip content="아래쪽 툴팁" position="bottom">
                <button
                  type="button"
                  class="bg-krds-primary-80 rounded px-4 py-2 text-sm font-medium text-white"
                >
                  Bottom
                </button>
              </HanuiTooltip>
            </div>
          </div>
        </Card>
      </div>

      <!-- Disabled -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Disabled</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">disabled</code>: true일 때
          툴팁이 표시되지 않습니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <HanuiTooltip content="이 툴팁은 보이지 않습니다" :disabled="true">
            <button
              type="button"
              class="border-krds-gray-30 bg-krds-gray-10 text-krds-gray-50 cursor-not-allowed rounded border px-4 py-2 text-sm"
            >
              Disabled
            </button>
          </HanuiTooltip>
        </Card>
      </div>

      <!-- Multiline -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">멀티라인</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">content</code>에 줄바꿈(
          <code class="bg-krds-gray-5 rounded px-1">\n</code>)을 넣으면 여러
          줄로 표시됩니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-4">
            <HanuiTooltip
              :content="'첫 번째 줄\n두 번째 줄\n세 번째 줄'"
              position="top"
            >
              <button
                type="button"
                class="border-krds-gray-30 rounded border px-4 py-2 text-sm"
              >
                멀티라인 툴팁 (호버)
              </button>
            </HanuiTooltip>
            <HanuiTooltip
              :content="'멀티라인 툴팁\n(흰색 버튼)'"
              position="top"
              variant="light"
            >
              <button
                type="button"
                class="border-krds-gray-20 text-krds-gray-90 hover:bg-krds-gray-5 rounded border bg-white px-4 py-2 text-sm font-medium shadow-sm"
              >
                멀티라인 (흰색 버튼)
              </button>
            </HanuiTooltip>
          </div>
        </Card>
      </div>

      <!-- Trigger: 텍스트/아이콘 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">트리거 예시</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          기본 슬롯에 버튼, 링크, 아이콘 등 어떤 요소든 트리거로 넣을 수
          있습니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap items-center gap-6">
            <HanuiTooltip content="도움말입니다" position="top">
              <span
                class="bg-krds-gray-20 text-krds-gray-70 inline-flex h-6 w-6 cursor-help items-center justify-center rounded-full text-xs"
              >
                ?
              </span>
            </HanuiTooltip>
            <HanuiTooltip content="정보 아이콘" position="top">
              <span class="text-krds-primary-80 cursor-pointer text-xl"
                >ℹ️</span
              >
            </HanuiTooltip>
            <HanuiTooltip content="클릭 가능한 링크" position="top">
              <a
                href="#"
                class="text-krds-primary-80 underline hover:no-underline"
                @click.prevent
              >
                링크
              </a>
            </HanuiTooltip>
          </div>
        </Card>
      </div>

      <!-- Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
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
                    content
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">툴팁에 표시할 텍스트 (필수)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    variant
                  </td>
                  <td class="px-4 py-3">'default' | 'light'</td>
                  <td class="px-4 py-3">'default'</td>
                  <td class="px-4 py-3">
                    default: 진한 배경 / light: 흰 배경 + 테두리
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    position
                  </td>
                  <td class="px-4 py-3">'top' | 'bottom'</td>
                  <td class="px-4 py-3">'top'</td>
                  <td class="px-4 py-3">툴팁 표시 방향</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    delay
                  </td>
                  <td class="px-4 py-3">number</td>
                  <td class="px-4 py-3">200</td>
                  <td class="px-4 py-3">표시 전 대기 시간(ms)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    disabled
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">false</td>
                  <td class="px-4 py-3">true면 툴팁 비표시</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    autoPosition
                  </td>
                  <td class="px-4 py-3">boolean</td>
                  <td class="px-4 py-3">true</td>
                  <td class="px-4 py-3">
                    뷰포트 기준으로 top/bottom 자동 선택
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    class / wrapperClass
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">
                    툴팁 박스 / 래퍼에 적용할 추가 클래스
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
