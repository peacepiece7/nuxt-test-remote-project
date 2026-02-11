<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Badge from '@/components/hanui/Badge.vue'

  useHead({
    title: 'Icon - 가이드',
  })

  // 사용 가능한 아이콘 목록 (카테고리별)
  const iconCategories = [
    {
      title: 'Actions',
      icons: [
        'check',
        'check-bold',
        'close',
        'close-bold',
        'close-circle-filled',
        'close-circle-lined',
        'plus',
        'plus-bold',
        'minus',
        'minus-bold',
        'edit',
        'delete',
        'search',
        'refresh',
        'download',
        'upload',
      ],
    },
    {
      title: 'Navigation',
      icons: [
        'chevron-up',
        'chevron-up-bold',
        'chevron-down',
        'chevron-down-bold',
        'chevron-left',
        'chevron-left-bold',
        'chevron-left-double',
        'chevron-left-double-bold',
        'chevron-right',
        'chevron-right-bold',
        'chevron-right-double',
        'chevron-right-double-bold',
        'home',
      ],
    },
    {
      title: 'Status / Alert',
      icons: [
        'info-filled',
        'info-lined',
        'caution',
        'caution-lined',
        'cautrion-filled',
        'question-filled',
        'question-lined',
        'message-default',
        'message-error',
        'message-success',
      ],
    },
    {
      title: 'File Types (img 태그로 대체 사용 추천)',
      icons: [
        'file',
        'file-attachment',
        'file-bmp',
        'file-doc',
        'file-gif',
        'file-hwp',
        'file-jpg',
        'file-pdf',
        'file-png',
        'file-ppt',
        'file-xlsx',
        'file-zip',
      ],
    },
    {
      title: 'Media / Controls',
      icons: ['play', 'play-bold', 'pause', 'pause-bold', 'eye-on', 'eye-off'],
    },
    {
      title: 'UI Elements',
      icons: [
        'star-filled',
        'star-lined',
        'pin',
        'pin-bold',
        'mark',
        'mark-bold',
        'setting',
        'setting-bold',
        'calendar',
        'call',
        'link',
        'location',
        'attachment',
        'keyboard',
        'keyboard-bold',
        'graph',
        'wifi',
        'alram',
        'announcement',
        'at',
        'new',
        'parking',
        'timeout',
      ],
    },
    {
      title: 'Bullets / Dividers',
      icons: [
        'bullet-asterisk',
        'bullet-dot',
        'bullet-dot-bold',
        'bullet-hypen',
        'bullet-shape',
        'divider',
        'tilde',
        'blank',
      ],
    },
    {
      title: 'Misc',
      icons: [
        'login-v1',
        'login-v2',
        'ic-printer',
        'ic-refresh',
        'ic-reset',
        'ic-select-chevron',
        'updown-up',
        'updown-down',
      ],
    },
  ]

  // 사용 가능한 모든 아이콘 이름 (IconButton 등에서 일괄 표시용)
  const allIconNames = computed(() =>
    iconCategories.flatMap((cat) => cat.icons),
  )

  // Size 예제용
  const sizes = [16, 20, 24, 32, 40, 48] as const
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Icon</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        SVG 아이콘 컴포넌트입니다.
        <code class="bg-krds-gray-5 rounded px-1">app/assets/icons</code> 폴더의
        SVG 파일을 name으로 불러올 수 있습니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">name</code> prop에 아이콘
          이름(파일명에서 .svg 제외)을 전달합니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex flex-col items-center gap-2">
              <Icon name="check" class="h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">check</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Icon name="close" class="h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">close</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Icon name="search" class="h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">search</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Icon name="home" class="h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">home</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Icon name="setting" class="h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">setting</span>
            </div>
          </div>
        </Card>
      </div>

      <!-- Size -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">size</code> prop 또는
          Tailwind 클래스로 크기를 조절합니다. size: 16, 20(기본), 24, 32, 40,
          48, 80, 96, 120
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap items-end gap-8">
            <div
              v-for="s in sizes"
              :key="s"
              class="flex flex-col items-center gap-2"
            >
              <Icon
                name="star-filled"
                :class="`h-[${s}px] w-[${s}px]`"
                :style="{ width: `${s}px`, height: `${s}px` }"
              />
              <span class="text-krds-gray-70 text-xs">{{ s }}px</span>
            </div>
          </div>
        </Card>
      </div>

      <!-- Color -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Color</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">color</code> prop 또는
          Tailwind text-color 클래스로 색상을 지정합니다. SVG의 fill/stroke가
          currentColor로 설정됩니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex flex-col items-center gap-2">
              <Icon name="info-filled" class="text-krds-primary-base h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">primary</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Icon name="check-bold" class="text-krds-success-base h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">success</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Icon name="caution" class="text-krds-warning-base h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">warning</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Icon
                name="close-circle-filled"
                class="text-krds-danger-base h-6 w-6"
              />
              <span class="text-krds-gray-70 text-xs">danger</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <Icon name="setting" class="text-krds-gray-70 h-6 w-6" />
              <span class="text-krds-gray-70 text-xs">gray</span>
            </div>
          </div>
        </Card>
      </div>

      <!-- Badge와 함께 사용 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Badge와 함께 사용</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">iconLeft</code>,
          <code class="bg-krds-gray-5 rounded px-1">iconRight</code> 슬롯으로
          Badge에 아이콘을 넣을 수 있습니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-3">
            <Badge variant="primary">
              <template #iconLeft>
                <Icon name="check" class="h-4 w-4" />
              </template>
              완료
            </Badge>
            <Badge variant="error">
              오류
              <template #iconRight>
                <Icon name="close-bold" class="h-4 w-4" />
              </template>
            </Badge>
            <Badge variant="success">
              <template #iconLeft>
                <Icon name="check-bold" class="h-4 w-4" />
              </template>
              성공
            </Badge>
            <Badge variant="warning">
              <template #iconLeft>
                <Icon name="caution" class="h-3.5 w-3.5" />
              </template>
              주의
            </Badge>
            <Badge variant="info">
              <template #iconLeft>
                <Icon name="info-filled" class="h-3.5 w-3.5" />
              </template>
              정보
            </Badge>
            <Badge variant="solid-primary">
              <template #iconLeft>
                <Icon name="star-filled" class="h-3.5 w-3.5" />
              </template>
              추천
            </Badge>
            <Badge variant="outline-primary">
              <template #iconLeft>
                <Icon name="download" class="h-3.5 w-3.5" />
              </template>
              다운로드
            </Badge>
          </div>
        </Card>
      </div>

      <!-- Button과 함께 사용 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Button과 함께 사용</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          Button 내부에 Icon을 함께 사용할 수 있습니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="flex flex-wrap gap-3">
            <Button variant="primary" size="md">
              <template #iconLeft>
                <Icon name="search" />
              </template>
              검색
            </Button>
            <Button variant="secondary" size="md">
              <template #iconLeft>
                <Icon name="download" />
              </template>
              다운로드
            </Button>
            <Button variant="outline" size="md">
              <Icon name="plus" class="mr-2 h-5 w-5" />
              추가
            </Button>
            <Button variant="tertiary" size="md">
              <Icon name="edit" class="mr-2 h-5 w-5" />
              수정
            </Button>
          </div>
        </Card>
      </div>

      <!-- 아이콘 버튼 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">아이콘 버튼</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-4">
          <code class="bg-krds-gray-5 rounded px-1">IconButton</code> 컴포넌트를
          사용하여 아이콘 버튼을 만들 수 있습니다.
        </p>
        <Card variant="outlined" padding="lg" class="mb-6">
          <p class="text-krds-body-sm text-krds-gray-70 mb-4">
            사용 가능한 모든 아이콘을 IconButton으로 표시합니다.
          </p>
          <div class="flex flex-wrap gap-3">
            <IconButton
              v-for="iconName in allIconNames"
              :key="iconName"
              :icon="iconName as any"
              :ariaLabel="String(iconName)"
              color="krds-gray-90"
            />
          </div>
        </Card>
      </div>

      <!-- 아이콘 목록 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">사용 가능한 아이콘</Heading>
        <p class="text-krds-body-md text-krds-gray-70 mb-6">
          <code class="bg-krds-gray-5 rounded px-1">app/assets/icons</code>
          폴더에 있는 모든 아이콘입니다.
        </p>

        <div class="space-y-8">
          <div
            v-for="category in iconCategories"
            :key="category.title"
            class="border-krds-gray-10 bg-krds-gray-5 rounded-lg border p-6"
          >
            <h3
              class="text-krds-title-sm text-krds-gray-95 mb-4 flex items-center gap-2"
            >
              <span class="bg-krds-primary-base h-5 w-1 rounded" />
              {{ category.title }}
            </h3>
            <div
              class="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"
            >
              <div
                v-for="icon in category.icons"
                :key="icon"
                class="flex flex-col items-center gap-2 rounded-lg bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <Icon :name="icon as any" class="text-krds-gray-90 h-6 w-6" />
                <span
                  class="text-krds-gray-70 text-center text-[10px] leading-tight break-all"
                  >{{ icon }}</span
                >
              </div>
            </div>
          </div>
        </div>
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
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">name</td>
                  <td class="px-4 py-3">IconName</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">아이콘 이름 (파일명에서 .svg 제외)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">size</td>
                  <td class="px-4 py-3">
                    16 | 20 | 24 | 32 | 40 | 48 | 80 | 96 | 120
                  </td>
                  <td class="px-4 py-3">20</td>
                  <td class="px-4 py-3">
                    아이콘 크기 (CSS 변수 --icon-size-* 필요)
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    color
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">아이콘 색상 (CSS color 값)</td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    ariaLabel
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">
                    접근성 라벨 (없으면 aria-hidden="true")
                  </td>
                </tr>
                <tr class="border-krds-gray-5 border-b">
                  <td class="text-krds-primary-60 px-4 py-3 font-mono">
                    class
                  </td>
                  <td class="px-4 py-3">string</td>
                  <td class="px-4 py-3">-</td>
                  <td class="px-4 py-3">
                    추가 CSS 클래스 (Tailwind h-*, w-* 등)
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

<style scoped></style>
