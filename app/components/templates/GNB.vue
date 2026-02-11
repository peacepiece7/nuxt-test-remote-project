<script setup lang="ts">
  import type { PanelMenuItem } from '@/components/hanui/HeaderWithPanelMenu.vue'
  import HeaderWithPanelMenu from '@/components/hanui/HeaderWithPanelMenu.vue'
  import { getPanelItems } from '@/composables/useGuideMenu'

  interface Props {
    visible: boolean
    isAtTop: boolean
  }

  defineProps<Props>()

  const route = useRoute()

  const panelItems: PanelMenuItem[] = getPanelItems()

  // 유틸리티 링크
  const utilityLinks = [
    { label: '로그인', href: '#' },
    { label: '회원가입', href: '#' },
    { label: 'ENGLISH', href: '#' },
  ]

  const isLoginDialogOpen = ref(false)
  const isLoggedIn = ref(false)
  const userName = ref('')

  const handleLoginLogout = () => {
    if (isLoggedIn.value) {
      isLoggedIn.value = false
      userName.value = ''
    } else {
      isLoginDialogOpen.value = true
    }
  }

  const handleLoginSuccess = () => {
    isLoginDialogOpen.value = false
    isLoggedIn.value = true
  }

  const goToMyPage = () => {
    navigateTo('/mypage')
  }
</script>

<template>
  <div
    class="fixed top-0 left-0 z-[1000] w-full"
    :style="{
      top: visible ? '0' : '-100%',
      transition: 'top 0.3s ease-in-out',
    }"
  >
    <HeaderWithPanelMenu
      :panel-items="panelItems"
      :utility-links="utilityLinks"
      :current-path="route.path"
    />

    <Modal :open="isLoginDialogOpen" @update:open="isLoginDialogOpen = $event">
      <div class="p-6">
        <h2 class="mb-4 text-xl font-bold">로그인</h2>
        <p class="text-krds-gray-70 mb-4 text-sm">
          로그인 기능은 추후 구현 예정입니다.
        </p>
        <Button @click="handleLoginSuccess">확인</Button>
      </div>
    </Modal>
  </div>
</template>
