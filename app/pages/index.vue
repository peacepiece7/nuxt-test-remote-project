<script setup lang="ts">
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Button from '@/components/hanui/Button.vue'
  import Card from '@/components/hanui/Card.vue'
  import Section from '@/components/hanui/Section.vue'
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <Section
      padding="3xl"
      background="primary"
      class="flex min-h-[60vh] items-center"
    >
      <Container>
        <div class="mx-auto max-w-3xl text-center">
          <Heading level="h1" class="mb-6">
            Sports Club에 오신 것을 환영합니다
          </Heading>
          <p class="text-krds-body-lg text-krds-gray-70 mb-8">
            다양한 스포츠 활동과 커뮤니티를 통해 건강한 라이프스타일을
            만들어보세요. 함께 운동하고, 함께 성장하는 공간입니다.
          </p>
          <div class="flex justify-center gap-4">
            <Button size="lg" href="/guide">컴포넌트 가이드</Button>
            <Button size="lg" variant="secondary" href="#features"
              >더 알아보기</Button
            >
          </div>
        </div>
      </Container>
    </Section>

    <!-- Features Section -->
    <Section id="features" padding="3xl" background="white">
      <Container>
        <Heading level="h2" class="mb-12 text-center"> 주요 기능 </Heading>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card variant="shadow" hoverable padding="lg">
            <div class="text-center">
              <div
                class="bg-krds-primary-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              >
                <span class="text-2xl">🏋️</span>
              </div>
              <Heading level="h3" class="mb-3">다양한 운동 프로그램</Heading>
              <p class="text-krds-body-md text-krds-gray-70">
                개인 맞춤형 운동 프로그램을 제공하여 목표에 맞는 효과적인 운동을
                할 수 있습니다.
              </p>
            </div>
          </Card>

          <Card variant="shadow" hoverable padding="lg">
            <div class="text-center">
              <div
                class="bg-krds-primary-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              >
                <span class="text-2xl">👥</span>
              </div>
              <Heading level="h3" class="mb-3">커뮤니티 활동</Heading>
              <p class="text-krds-body-md text-krds-gray-70">
                같은 관심사를 가진 사람들과 함께 운동하고 경쟁하며 동기부여를
                받을 수 있습니다.
              </p>
            </div>
          </Card>

          <Card variant="shadow" hoverable padding="lg">
            <div class="text-center">
              <div
                class="bg-krds-primary-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              >
                <span class="text-2xl">📊</span>
              </div>
              <Heading level="h3" class="mb-3">운동 기록 관리</Heading>
              <p class="text-krds-body-md text-krds-gray-70">
                운동 기록을 체계적으로 관리하고 진행 상황을 시각적으로 확인할 수
                있습니다.
              </p>
            </div>
          </Card>

          <Card variant="shadow" hoverable padding="lg">
            <div class="text-center">
              <div
                class="bg-krds-primary-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              >
                <span class="text-2xl">🏆</span>
              </div>
              <Heading level="h3" class="mb-3">경쟁과 챌린지</Heading>
              <p class="text-krds-body-md text-krds-gray-70">
                다양한 챌린지에 참여하여 목표를 달성하고 성취감을 느낄 수
                있습니다.
              </p>
            </div>
          </Card>

          <Card variant="shadow" hoverable padding="lg">
            <div class="text-center">
              <div
                class="bg-krds-primary-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              >
                <span class="text-2xl">📱</span>
              </div>
              <Heading level="h3" class="mb-3">모바일 앱 지원</Heading>
              <p class="text-krds-body-md text-krds-gray-70">
                언제 어디서나 모바일 앱을 통해 운동 계획을 확인하고 기록할 수
                있습니다.
              </p>
            </div>
          </Card>

          <Card variant="shadow" hoverable padding="lg">
            <div class="text-center">
              <div
                class="bg-krds-primary-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              >
                <span class="text-2xl">💪</span>
              </div>
              <Heading level="h3" class="mb-3">전문가 상담</Heading>
              <p class="text-krds-body-md text-krds-gray-70">
                전문 트레이너와의 상담을 통해 올바른 운동 방법과 영양 관리에
                대한 조언을 받을 수 있습니다.
              </p>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  </div>
</template>
