<script setup lang="ts">
  import { ref } from 'vue'
  import Icon from '@/components/hanui/Icon.vue'
  import youtubeIcon from '@/assets/icons/youtube.svg'
  import facebookIcon from '@/assets/icons/facebook.svg'
  import instagramIcon from '@/assets/icons/insta.svg'
  import blogIcon from '@/assets/icons/blog.svg'
  import googlePlayIcon from '@/assets/icons/google-play.svg'
  import appleStoreIcon from '@/assets/icons/apple-store.svg'

  const footerMenu = [
    { label: '개인정보처리방침', href: '#', highlighted: true },
    { label: '이용약관', href: '#' },
    { label: '이메일무단수집거부', href: '#' },
  ]

  const relatedSites = [
    {
      id: 'family-sites',
      title: '패밀리사이트 및 유관기관',
      links: [
        { name: '대한체육회', url: '#' },
        { name: '대한올림픽위원회', url: '#' },
      ],
    },
  ]

  const snsLinks = [
    { name: 'youtube', href: '#', icon: youtubeIcon },
    { name: 'facebook', href: '#', icon: facebookIcon },
    { name: 'insta', href: '#', icon: instagramIcon },
    { name: 'blog', href: '#', icon: blogIcon },
  ]

  const storeLinks = [
    { name: 'Google Play', url: '#', icon: googlePlayIcon },
    { name: 'App Store', url: '#', icon: appleStoreIcon },
  ]

  const organizationName = '대한체육회'
  const phoneNumbers = ['070-8667-4282', '070-8667-4296']
  const address =
    '(우 05540) 서울특별시 송파구 올림픽로 424 올림픽회관    (이메일) help.spclub.ksoc@gmail.com'
  const copyright =
    'Copyright ⓒ 2018 Korean Sport & Olympic Committee. All Rights Reserved.'

  const openModal = ref<string | null>(null)
  const mainRelatedSite = relatedSites[0]
  const relatedSiteLabel = mainRelatedSite?.title ?? '패밀리사이트 및 유관기관'
</script>

<template>
  <footer
    id="krds-footer"
    class="relative z-50 bg-krds-gray-90 text-krds-white"
  >
    <div class="mx-auto w-full max-w-[1600px] px-8 py-10 md:px-8 md:py-12 lg:px-8 lg:py-16">
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <nav
          class="flex flex-wrap items-center gap-6 text-[14px] leading-[1.5] tracking-[-0.28px] md:text-[16px] md:tracking-[-0.32px]"
          aria-label="사이트 정책"
        >
          <a
            v-for="menu in footerMenu"
            :key="menu.label"
            :href="menu.href"
            :class="[
              'font-medium text-krds-white hover:underline',
              menu.highlighted &&
                'font-bold text-[color:var(--krds-color-light-orange-50)]',
            ]"
          >
            {{ menu.label }}
          </a>
        </nav>

        <button
          type="button"
          class="flex h-12 w-full items-center justify-between rounded-[8px] border border-krds-gray-20 px-6 text-[16px] font-medium leading-[1.5] tracking-[-0.32px] text-krds-white transition-colors md:h-12 md:max-w-[320px] md:text-[16px] md:tracking-[-0.32px] lg:h-14 lg:text-[18px] lg:tracking-[-0.36px]"
          :title="`${relatedSiteLabel} 메뉴`"
          @click="openModal = mainRelatedSite.id"
        >
          <span class="truncate">{{ relatedSiteLabel }}</span>
          <Icon name="plus" :size="20" aria-hidden="true" />
        </button>
      </div>

      <div class="mt-8 flex flex-col gap-8 md:flex-col lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-4">
          <div class="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
            <span
              class="text-krds-body-lg font-bold tracking-[-0.4px] text-krds-white"
            >
              {{ organizationName }}
            </span>
            <template v-for="(phone, idx) in phoneNumbers" :key="phone">
              <span
                v-if="idx > 0"
                class="hidden text-krds-title-md font-bold tracking-[-0.48px] text-krds-white md:inline"
              >
                /
              </span>
              <span
                class="text-[28px] font-bold leading-[1.5] tracking-[-0.56px] text-krds-white md:text-krds-title-md md:tracking-[-0.48px]"
              >
                {{ phone }}
              </span>
            </template>
          </div>
          <div class="text-[14px] leading-[1.5] tracking-[-0.28px] text-krds-gray-40">
            <p class="mb-0">
              {{ address }}
            </p>
            <p>
              {{ copyright }}
            </p>
          </div>
        </div>

        <div class="flex flex-col items-end gap-4 md:flex-row md:items-center md:justify-end md:gap-4 lg:gap-8">
          <nav
            class="flex items-center gap-4 md:gap-5"
            aria-label="소셜 미디어"
          >
            <a
              v-for="sns in snsLinks"
              :key="sns.name"
              :href="sns.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.3)] md:h-10 md:w-10"
              :aria-label="`${sns.name} (새 창 열기)`"
            >
              <img
                :src="sns.icon"
                alt=""
                class="h-4 w-4 md:h-5 md:w-5"
                aria-hidden="true"
              />
            </a>
          </nav>

          <div class="flex items-center gap-2 md:gap-5">
            <a
              v-for="store in storeLinks"
              :key="store.name"
              :href="store.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-[96px] items-center justify-center rounded-full border border-krds-gray-30 text-[12px] font-medium text-krds-white md:h-10 md:w-[120px]"
            >
              <img
                :src="store.icon"
                alt=""
                class="h-4 md:h-5"
                style="filter: brightness(0) invert(1);"
                aria-hidden="true"
              />
              <span class="sr-only">{{ store.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Sites Modal -->
    <Teleport to="body">
      <template v-for="site in relatedSites" :key="site.id">
        <div
          v-if="openModal === site.id"
          class="fixed inset-0 z-[1000] bg-black/50"
          @click="openModal = null"
        />
        <div
          v-if="openModal === site.id"
          class="fixed top-1/2 left-1/2 z-[1001] max-h-[85vh] w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-lg"
        >
          <div
            class="border-krds-gray-10 flex items-center justify-between border-b px-8 py-6"
          >
            <h2 class="text-xl font-bold">{{ site.title }}</h2>
            <button
              type="button"
              class="hover:bg-krds-gray-5 rounded-md p-2"
              aria-label="닫기"
              @click="openModal = null"
            >
              <Icon name="close" :size="24" aria-hidden="true" />
            </button>
          </div>
          <div class="max-h-[calc(85vh-5rem)] overflow-y-auto p-8">
            <ul class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              <li v-for="link in site.links" :key="link.name">
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-krds-gray-70 border-krds-gray-10 hover:text-krds-primary-60 hover:border-krds-primary-20 hover:bg-krds-primary-5 block rounded-md border p-4 text-center transition-colors"
                >
                  {{ link.name }}
                  <span class="sr-only"> (새 창 열기)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Teleport>
  </footer>
</template>
