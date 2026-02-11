<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Button from '@/components/hanui/Button.vue'
  import { getGuideCategories } from '@/composables/useGuideMenu'

  useHead({
    title: '체육회 디자인 시스템 가이드',
    meta: [
      {
        name: 'description',
        content:
          '체육회 디자인 시스템 퍼블리싱 가이드. Foundation, Inputs, Selection, Buttons 등 컴포넌트 사용법을 확인하세요.',
      },
    ],
  })

  const guideCategories = getGuideCategories()
</script>

<template>
  <div class="guide-index min-h-screen">
    <!-- Hero -->
    <section
      class="from-krds-primary-5 via-krds-gray-0 to-krds-primary-10 relative overflow-hidden bg-gradient-to-br py-20 sm:py-28"
    >
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.04]"
        style="
          background-image: radial-gradient(
            circle at 1px 1px,
            var(--color-krds-primary-base) 1px,
            transparent 0
          );
          background-size: 32px 32px;
        "
      />
      <Container class="relative">
        <p
          class="border-krds-primary-30 bg-krds-primary-10 text-krds-primary-70 mb-4 inline-block rounded-full border px-4 py-1.5 text-sm font-medium"
        >
          Publishing Guide
        </p>
        <Heading level="h1" class="mb-6 max-w-3xl">
          체육회 디자인 시스템 가이드
        </Heading>
        <p
          class="text-krds-body-lg text-krds-gray-70 max-w-2xl leading-relaxed"
        >
          상단 GNB(전역 내비게이션)에 있는 메뉴들은 이 가이드의
          <strong class="text-krds-gray-95">퍼블리싱 가이드</strong>입니다.
          Foundation, Inputs, Selection, Buttons, Layout, Feedback 등 각 항목을
          클릭하면 해당 카테고리의
          <strong class="text-krds-gray-95">컴포넌트 문서</strong>로 이동합니다.
        </p>
      </Container>
    </section>

    <!-- GNB 링크 안내 배너 -->
    <section class="border-krds-gray-10 bg-krds-gray-0 border-b py-10">
      <Container>
        <Card
          variant="outlined"
          padding="lg"
          class="border-krds-primary-20 bg-krds-primary-5/50"
        >
          <div
            class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <Heading level="h2" class="text-krds-title-md mb-2">
                GNB 메뉴 = 퍼블리싱 가이드
              </Heading>
              <p class="text-krds-body-md text-krds-gray-70">
                페이지 상단 네비게이션의 Foundation, Inputs, Selection, Buttons,
                Layout, Feedback, Navigation, Display, Overlay, Data Display,
                Layout Components, Form, Misc 메뉴는 모두
                <strong>체육회 디자인 시스템 가이드</strong>의 퍼블리싱
                가이드입니다. 각 메뉴에서 개별 컴포넌트 페이지로 이동할 수
                있습니다.
              </p>
            </div>
            <NuxtLink to="/guide/foundation" class="shrink-0">
              <Button variant="primary" size="lg"> Foundation 바로가기 </Button>
            </NuxtLink>
          </div>
        </Card>
      </Container>
    </section>

    <!-- 카테고리 그리드 -->
    <section class="py-16 sm:py-24">
      <Container>
        <Heading level="h2" class="mb-4"> 가이드 카테고리 </Heading>
        <p class="text-krds-body-lg text-krds-gray-70 mb-12 max-w-2xl">
          아래 카드들은 GNB에 노출되는 퍼블리싱 가이드 카테고리와 동일합니다.
          클릭 시 해당 가이드 페이지로 이동합니다.
        </p>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="cat in guideCategories"
            :key="cat.label"
            :to="cat.href"
            class="block transition-opacity hover:opacity-90"
          >
            <Card
              variant="shadow"
              hoverable
              padding="lg"
              class="flex h-full flex-col"
            >
              <Heading level="h3" class="text-krds-title-sm mb-2">
                {{ cat.label }}
              </Heading>
              <p class="text-krds-body-sm text-krds-gray-70 flex-1">
                {{ cat.desc }}
              </p>
              <div
                class="text-krds-primary-base mt-4 flex items-center gap-1 text-sm font-medium"
              >
                가이드 보기
                <span class="text-krds-primary-60" aria-hidden="true">→</span>
              </div>
            </Card>
          </NuxtLink>
        </div>
      </Container>
    </section>

    <!-- 가이드 구조 안내 -->
    <section class="border-krds-gray-10 bg-krds-gray-5 border-t py-16 sm:py-24">
      <Container>
        <Heading level="h2" class="mb-4"> 가이드 구성 </Heading>
        <p class="text-krds-body-lg text-krds-gray-70 mb-12 max-w-2xl">
          체육회 디자인 시스템 가이드는 Foundation에서 시작해, 카테고리별
          컴포넌트 문서로 이어집니다.
        </p>
        <div class="grid gap-8 md:grid-cols-3">
          <Card variant="outlined" padding="lg" class="border-krds-primary-20">
            <div
              class="bg-krds-primary-10 text-krds-primary-base mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
            >
              <span class="text-lg font-bold">1</span>
            </div>
            <Heading level="h3" class="text-krds-title-sm mb-2">
              Foundation
            </Heading>
            <p class="text-krds-body-sm text-krds-gray-70">
              색상, 타이포그래피, 간격 등 디자인 토큰과 기초 원칙을 확인합니다.
            </p>
            <NuxtLink to="/guide/foundation" class="mt-4 inline-block">
              <Button variant="secondary" size="sm">이동</Button>
            </NuxtLink>
          </Card>
          <Card variant="outlined" padding="lg" class="border-krds-primary-20">
            <div
              class="bg-krds-primary-10 text-krds-primary-base mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
            >
              <span class="text-lg font-bold">2</span>
            </div>
            <Heading level="h3" class="text-krds-title-sm mb-2">
              카테고리
            </Heading>
            <p class="text-krds-body-sm text-krds-gray-70">
              Inputs, Buttons, Layout, Feedback 등 카테고리별 개요와 사용 예시를
              봅니다.
            </p>
            <NuxtLink to="/guide/inputs" class="mt-4 inline-block">
              <Button variant="secondary" size="sm">예: Inputs</Button>
            </NuxtLink>
          </Card>
          <Card variant="outlined" padding="lg" class="border-krds-primary-20">
            <div
              class="bg-krds-primary-10 text-krds-primary-base mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
            >
              <span class="text-lg font-bold">3</span>
            </div>
            <Heading level="h3" class="text-krds-title-sm mb-2">
              컴포넌트
            </Heading>
            <p class="text-krds-body-sm text-krds-gray-70">
              각 카테고리 내 개별 컴포넌트(Input, Button, Card 등) 상세 문서를
              확인합니다.
            </p>
            <NuxtLink to="/guide/components/button" class="mt-4 inline-block">
              <Button variant="secondary" size="sm">예: Button</Button>
            </NuxtLink>
          </Card>
        </div>
      </Container>
    </section>

    <!-- 사용 방법 -->
    <section class="py-16 sm:py-24">
      <Container>
        <Heading level="h2" class="mb-4"> 사용 방법 </Heading>
        <p class="text-krds-body-lg text-krds-gray-70 mb-10 max-w-2xl">
          프로젝트에서 디자인 시스템 컴포넌트를 활용할 때는 먼저 Foundation으로
          토큰을 익히고, 필요한 카테고리·컴포넌트 문서를 참고하세요.
        </p>
        <ul class="space-y-4">
          <li class="flex gap-4">
            <span
              class="bg-krds-primary-10 text-krds-primary-base flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            >
              1
            </span>
            <div>
              <strong class="text-krds-gray-95">상단 GNB</strong>에서 Foundation
              또는 원하는 카테고리를 클릭하면 해당 퍼블리싱 가이드로 이동합니다.
            </div>
          </li>
          <li class="flex gap-4">
            <span
              class="bg-krds-primary-10 text-krds-primary-base flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            >
              2
            </span>
            <div>
              카테고리 페이지에서
              <strong class="text-krds-gray-95">개별 컴포넌트 카드</strong>의
              「자세히 보기」를 클릭하면 컴포넌트 상세 문서를 볼 수 있습니다.
            </div>
          </li>
          <li class="flex gap-4">
            <span
              class="bg-krds-primary-10 text-krds-primary-base flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            >
              3
            </span>
            <div>
              컴포넌트 문서에서
              <strong class="text-krds-gray-95"
                >사용 예시, Props, Variants</strong
              >
              등을 확인하고 코드에 적용할 수 있습니다.
            </div>
          </li>
        </ul>
      </Container>
    </section>

    <!-- CTA -->
    <section class="border-krds-gray-10 bg-krds-gray-0 border-t py-16 sm:py-24">
      <Container>
        <div
          class="from-krds-primary-10 to-krds-primary-20 rounded-2xl bg-gradient-to-br px-8 py-14 text-center sm:px-12"
        >
          <Heading level="h2" class="mb-4"> Foundation부터 시작하기 </Heading>
          <p class="text-krds-body-md text-krds-gray-70 mx-auto mb-8 max-w-xl">
            색상, 타이포, 간격 등 디자인 토큰을 먼저 살펴보고, 퍼블리싱 가이드의
            컴포넌트들을 활용해 보세요.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink to="/guide/foundation">
              <Button variant="primary" size="lg"> Foundation 가이드 </Button>
            </NuxtLink>
            <NuxtLink to="/guide/inputs">
              <Button variant="secondary" size="lg"> Inputs 가이드 </Button>
            </NuxtLink>
          </div>
        </div>
      </Container>
    </section>
  </div>
</template>

<style scoped lang="css">
  .guide-index {
    min-height: 100vh;
  }
</style>
