<script setup lang="ts">
import { ref } from 'vue';
import Container from '@/components/hanui/Container.vue';
import Heading from '@/components/hanui/Heading.vue';
import Card from '@/components/hanui/Card.vue';
import Button from '@/components/hanui/Button.vue';
import IconButton from '@/components/hanui/IconButton.vue';
import { Search, Download, Plus, X, Check, ArrowRight } from 'lucide-vue-next';

useHead({
  title: 'Button - 가이드'
});

// Loading 상태
const loadingPrimary = ref(false);
const loadingSecondary = ref(false);
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Button</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        사용자 액션을 트리거하는 버튼 컴포넌트입니다. 다양한 variant와 size를 지원하며, 아이콘과 로딩 상태를 포함할 수 있습니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4">
              <Button>기본 버튼</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">Button</code> 컴포넌트를 import하여 사용합니다.</li>
            <li>기본 variant는 <code class="bg-krds-gray-5 px-1 rounded">primary</code>입니다.</li>
            <li>버튼 텍스트는 기본 슬롯에 작성합니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Variant -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant - 스타일 변형</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-6">
            <div>
              <Heading level="h3" class="mb-3 text-base">Primary</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">주요 액션에 사용하는 블루 채움 버튼입니다.</p>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Secondary</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="secondary">Secondary</Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">보조 액션에 사용하는 그레이 채움 버튼입니다.</p>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Tertiary</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="tertiary">Tertiary</Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">완만한 강조가 필요한 경우 사용하는 라이트 블루 채움 버튼입니다.</p>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Outline</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="outline">outline</Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">테두리 기반의 기본 버튼 스타일입니다.</p>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Semantic</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
                <Button variant="neutral">Neutral</Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">상태 메시지와 함께 사용하는 컬러 버튼입니다.</p>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">ContentsOutline</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="contentsOutline">
                  ContentsOutline
                  <template #iconLeft>
                    <Icon name="check" />
                  </template>
                </Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">삭제/위험한 액션에 사용하는 스타일입니다.</p>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">contentsPrimary</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="contentsPrimary">
                  contentsPrimary
                  <template #iconLeft>
                    <Icon name="download" />
                  </template>
                </Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">삭제/위험한 액션에 사용하는 스타일입니다.</p>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">variant</code> prop으로 버튼 스타일을 변경할 수 있습니다.</li>
            <li>사용 가능한 variant: <code class="bg-krds-gray-5 px-1 rounded">primary</code>, <code class="bg-krds-gray-5 px-1 rounded">secondary</code>, <code class="bg-krds-gray-5 px-1 rounded">tertiary</code>, <code class="bg-krds-gray-5 px-1 rounded">outline</code>, <code class="bg-krds-gray-5 px-1 rounded">contentsOutline</code>, <code class="bg-krds-gray-5 px-1 rounded">contentsPrimary</code>, <code class="bg-krds-gray-5 px-1 rounded">success</code>, <code class="bg-krds-gray-5 px-1 rounded">danger</code>, <code class="bg-krds-gray-5 px-1 rounded">warning</code>, <code class="bg-krds-gray-5 px-1 rounded">info</code>, <code class="bg-krds-gray-5 px-1 rounded">neutral</code></li>
          </ul>
        </Card>
      </div>

      <!-- Icon Button -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">IconButton</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="flex flex-wrap gap-4">
            <IconButton icon="search" ariaLabel="검색" color="krds-gray-90" />
            <IconButton icon="plus" ariaLabel="추가" color="krds-gray-90" />
            <IconButton icon="close" ariaLabel="닫기" color="krds-gray-90" />
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">name</code>으로 아이콘을 지정합니다.</li>
            <li>접근성을 위해 <code class="bg-krds-gray-5 px-1 rounded">aria-label</code>을 꼭 입력합니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Size -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Size - 크기</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">Extra Small (32px)</Heading>
              <div class="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="xs">XS 버튼</Button>
                <Button variant="secondary" size="xs">XS 버튼</Button>
                <Button variant="tertiary" size="xs">XS 버튼</Button>
                <Button variant="outline" size="xs">XS 버튼</Button>
                <Button variant="neutral" size="xs">XS 버튼</Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Small (40px)</Heading>
              <div class="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="sm">SM 버튼</Button>
                <Button variant="secondary" size="sm">SM 버튼</Button>
                <Button variant="tertiary" size="sm">SM 버튼</Button>
                <Button variant="outline" size="sm">SM 버튼</Button>
                <Button variant="neutral" size="sm">SM 버튼</Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Medium (48px) - 기본</Heading>
              <div class="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="md">MD 버튼</Button>
                <Button variant="secondary" size="md">MD 버튼</Button>
                <Button variant="tertiary" size="md">MD 버튼</Button>
                <Button variant="outline" size="md">MD 버튼</Button>
                <Button variant="neutral" size="md">MD 버튼</Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Large (56px)</Heading>
              <div class="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="lg">LG 버튼</Button>
                <Button variant="secondary" size="lg">LG 버튼</Button>
                <Button variant="tertiary" size="lg">LG 버튼</Button>
                <Button variant="outline" size="lg">LG 버튼</Button>
                <Button variant="neutral" size="lg">LG 버튼</Button>
              </div>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">size</code> prop으로 버튼 크기를 변경할 수 있습니다.</li>
            <li>사용 가능한 size: <code class="bg-krds-gray-5 px-1 rounded">xs</code> (32px), <code class="bg-krds-gray-5 px-1 rounded">sm</code> (40px), <code class="bg-krds-gray-5 px-1 rounded">md</code> (48px, 기본값), <code class="bg-krds-gray-5 px-1 rounded">lg</code> (56px), <code class="bg-krds-gray-5 px-1 rounded">xl</code> (64px), <code class="bg-krds-gray-5 px-1 rounded">icon</code> (40x40px)</li>
          </ul>
        </Card>
      </div>

      <!-- Icon Buttons -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Icon - 아이콘</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-6">
            <div>
              <Heading level="h3" class="mb-3 text-base">아이콘 왼쪽</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary">
                  <template #iconLeft>
                    <Download class="w-4 h-4" />
                  </template>
                  다운로드
                </Button>
                <Button variant="secondary">
                  <template #iconLeft>
                    <Plus class="w-4 h-4" />
                  </template>
                  추가하기
                </Button>
                <Button variant="tertiary">
                  <template #iconLeft>
                    <Search class="w-4 h-4" />
                  </template>
                  검색
                </Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">아이콘 오른쪽</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary">
                  다음
                  <template #iconRight>
                    <ArrowRight class="w-4 h-4" />
                  </template>
                </Button>
                <Button variant="secondary">
                  확인
                  <template #iconRight>
                    <Check class="w-4 h-4" />
                  </template>
                </Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">양쪽 아이콘</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary">
                  <template #iconLeft>
                    <Download class="w-4 h-4" />
                  </template>
                  다운로드
                  <template #iconRight>
                    <ArrowRight class="w-4 h-4" />
                  </template>
                </Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">아이콘만 (Icon Only)</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" size="icon" aria-label="검색">
                  <Search class="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon" aria-label="추가">
                  <Plus class="w-4 h-4" />
                </Button>
                <Button variant="tertiary" size="icon" aria-label="닫기">
                  <X class="w-4 h-4" />
                </Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">아이콘만 있는 버튼은 <code class="bg-krds-gray-5 px-1 rounded">aria-label</code>을 필수로 제공해야 합니다.</p>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">iconLeft</code> 슬롯으로 왼쪽 아이콘을 추가할 수 있습니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">iconRight</code> 슬롯으로 오른쪽 아이콘을 추가할 수 있습니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">size="icon"</code>으로 아이콘만 있는 버튼을 만들 수 있습니다.</li>
            <li>아이콘만 있는 버튼은 접근성을 위해 <code class="bg-krds-gray-5 px-1 rounded">aria-label</code>을 필수로 제공해야 합니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Loading -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Loading - 로딩 상태</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">로딩 중인 버튼</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" :loading="loadingPrimary" @click="loadingPrimary = !loadingPrimary">
                  {{ loadingPrimary ? '로딩 중...' : '클릭하여 로딩' }}
                </Button>
                <Button variant="secondary" :loading="loadingSecondary" @click="loadingSecondary = !loadingSecondary">
                  {{ loadingSecondary ? '로딩 중...' : '클릭하여 로딩' }}
                </Button>
               
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">로딩 중 아이콘</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" loading>
                  <template #iconLeft>
                    <Download class="w-4 h-4" />
                  </template>
                  다운로드 중
                </Button>
              </div>
              <p class="text-sm text-krds-gray-70 mt-2">로딩 중일 때는 아이콘이 스피너로 대체됩니다.</p>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">loading</code> prop으로 로딩 상태를 표시할 수 있습니다.</li>
            <li>로딩 중일 때는 버튼이 자동으로 비활성화되고 스피너 아이콘이 표시됩니다.</li>
            <li>로딩 중일 때는 <code class="bg-krds-gray-5 px-1 rounded">disabled</code>와 동일하게 동작합니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Disabled -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Disabled - 비활성화</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">비활성화된 버튼</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" disabled>Primary</Button>
                <Button variant="secondary" disabled>Secondary</Button>
                <Button variant="tertiary" disabled>Tertiary</Button>
                <Button variant="outline" disabled>Success</Button>
                <Button variant="contentsOutline" disabled>ContentsOutline</Button>
                <Button variant="contentsPrimary" disabled>ContentsPrimary</Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">비활성화된 아이콘 버튼</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" size="icon" disabled aria-label="검색">
                  <Search class="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon" disabled aria-label="추가">
                  <Plus class="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">disabled</code> prop으로 버튼을 비활성화할 수 있습니다.</li>
            <li>비활성화된 버튼은 클릭할 수 없고 반투명하게 표시됩니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">loading</code> 상태일 때도 자동으로 비활성화됩니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Link Button -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Link - 링크 버튼</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">내부 링크</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" href="/">홈으로</Button>
                <Button variant="secondary" href="/guide">가이드 보기</Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">외부 링크</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" href="https://example.com" target="_blank" rel="noopener noreferrer">
                  새 창에서 열기
                </Button>
                <Button variant="secondary" href="https://example.com" target="_blank">
                  <template #iconRight>
                    <ArrowRight class="w-4 h-4" />
                  </template>
                  외부 링크
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">href</code> prop을 제공하면 버튼이 링크로 동작합니다.</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">target="_blank"</code>로 새 창에서 열 수 있습니다.</li>
            <li>외부 링크의 경우 <code class="bg-krds-gray-5 px-1 rounded">rel="noopener noreferrer"</code>를 권장합니다.</li>
          </ul>
        </Card>
      </div>

      <!-- Type -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Type - 버튼 타입</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">Form에서 사용</Heading>
              <form @submit.prevent="() => {}" class="space-y-4">
                <div class="flex gap-4">
                  <Button type="submit" variant="primary">제출</Button>
                  <Button type="reset" variant="tertiary">초기화</Button>
                  <Button type="button" variant="secondary">취소</Button>
                </div>
              </form>
            </div>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="list-disc list-inside space-y-2 text-sm text-krds-gray-70">
            <li><code class="bg-krds-gray-5 px-1 rounded">type="submit"</code>: 폼 제출 버튼</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">type="reset"</code>: 폼 초기화 버튼</li>
            <li><code class="bg-krds-gray-5 px-1 rounded">type="button"</code>: 일반 버튼 (기본값)</li>
          </ul>
        </Card>
      </div>

      <!-- Variant별 전체 예시 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Variant별 전체 예시</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="space-y-6">
            <div>
              <Heading level="h3" class="mb-3 text-base">모든 Variant 비교</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="success">Success</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
                <Button variant="neutral">Neutral</Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Small Size</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" size="sm">Primary</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="tertiary" size="sm">Tertiary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="neutral" size="sm">Neutral</Button>
              </div>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">Large Size</Heading>
              <div class="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">Primary</Button>
                <Button variant="secondary" size="lg">Secondary</Button>
                <Button variant="tertiary" size="lg">Tertiary</Button>
                <Button variant="outline" size="lg">Outline</Button>
                <Button variant="neutral" size="lg">Neutral</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Props 테이블 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-krds-gray-10">
                  <th class="py-3 px-4 font-bold">Prop</th>
                  <th class="py-3 px-4 font-bold">Type</th>
                  <th class="py-3 px-4 font-bold">Default</th>
                  <th class="py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">variant</td>
                  <td class="py-3 px-4">'primary' | 'secondary' | 'tertiary' | 'outline' | 'contentsOutline' | 'contentsPrimary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral'</td>
                  <td class="py-3 px-4">'primary'</td>
                  <td class="py-3 px-4">버튼 스타일 변형</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">size</td>
                  <td class="py-3 px-4">'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'</td>
                  <td class="py-3 px-4">'md'</td>
                  <td class="py-3 px-4">버튼 크기</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">loading</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">로딩 상태</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">disabled</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">비활성화 여부</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">type</td>
                  <td class="py-3 px-4">'button' | 'submit' | 'reset'</td>
                  <td class="py-3 px-4">'button'</td>
                  <td class="py-3 px-4">버튼 타입</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">href</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">링크 URL (제공 시 &lt;a&gt; 태그로 렌더링)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">target</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">링크 타겟 (예: '_blank')</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">rel</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">링크 rel 속성</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">ariaLabel</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">접근성을 위한 라벨 (아이콘만 있는 버튼에 필수)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">class</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">추가 CSS 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- Slots -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Slots</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-krds-gray-10">
                  <th class="py-3 px-4 font-bold">Slot</th>
                  <th class="py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">default</td>
                  <td class="py-3 px-4">버튼 텍스트</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">iconLeft</td>
                  <td class="py-3 px-4">왼쪽 아이콘</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">iconRight</td>
                  <td class="py-3 px-4">오른쪽 아이콘</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- 사용 예시 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">사용 예시</Heading>
        <Card variant="outlined" padding="lg">
          <div class="space-y-4">
            <div>
              <Heading level="h3" class="mb-3 text-base">기본 사용</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import Button from '@/components/hanui/Button.vue';
&lt;/script&gt;

&lt;template&gt;
  &lt;Button variant="primary"&gt;클릭하세요&lt;/Button&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">아이콘과 함께 사용</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import Button from '@/components/hanui/Button.vue';
import { Download } from 'lucide-vue-next';
&lt;/script&gt;

&lt;template&gt;
  &lt;Button variant="primary"&gt;
    &lt;template #iconLeft&gt;
      &lt;Download class="w-4 h-4" /&gt;
    &lt;/template&gt;
    다운로드
  &lt;/Button&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">로딩 상태</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue';
import Button from '@/components/hanui/Button.vue';

const isLoading = ref(false);

const handleClick = async () => {
  isLoading.value = true;
  // 비동기 작업...
  await new Promise(resolve => setTimeout(resolve, 2000));
  isLoading.value = false;
};
&lt;/script&gt;

&lt;template&gt;
  &lt;Button variant="primary" :loading="isLoading" @click="handleClick"&gt;
    저장하기
  &lt;/Button&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">링크 버튼</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;Button variant="primary" href="/guide"&gt;
  가이드 보기
&lt;/Button&gt;

&lt;Button variant="secondary" href="https://example.com" target="_blank" rel="noopener noreferrer"&gt;
  외부 링크
&lt;/Button&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">아이콘만 있는 버튼</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;script setup lang="ts"&gt;
import Button from '@/components/hanui/Button.vue';
import { Search } from 'lucide-vue-next';
&lt;/script&gt;

&lt;template&gt;
  &lt;Button variant="primary" size="icon" aria-label="검색"&gt;
    &lt;Search class="w-4 h-4" /&gt;
  &lt;/Button&gt;
&lt;/template&gt;</code></pre>
            </div>
            <div>
              <Heading level="h3" class="mb-3 text-base">폼에서 사용</Heading>
              <pre class="bg-krds-gray-5 p-4 rounded-lg text-sm overflow-x-auto"><code>&lt;form @submit.prevent="handleSubmit"&gt;
  &lt;!-- 폼 필드들 --&gt;
  
  &lt;div class="flex gap-4"&gt;
    &lt;Button type="submit" variant="primary"&gt;제출&lt;/Button&gt;
    &lt;Button type="reset" variant="tertiary"&gt;초기화&lt;/Button&gt;
    &lt;Button type="button" variant="secondary" @click="handleCancel"&gt;취소&lt;/Button&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
