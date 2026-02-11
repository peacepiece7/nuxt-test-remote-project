<script setup lang="ts">
  import { computed } from 'vue'
  import Icon from '@/components/hanui/Icon.vue'
  import { cn } from '@/lib/utils'

  export interface BreadcrumbItem {
    label: string
    value?: string
    href?: string
  }

  interface DisplayItem extends BreadcrumbItem {
    isCollapsed?: boolean
  }

  const props = withDefaults(
    defineProps<{
      items: BreadcrumbItem[]
      separator?: string
      maxItems?: number
      itemsBeforeCollapse?: number
      itemsAfterCollapse?: number
      ariaLabel?: string
      class?: string
    }>(),
    {
      separator: '',
      itemsBeforeCollapse: 1,
      itemsAfterCollapse: 1,
      ariaLabel: 'Breadcrumb',
    },
  )

  const displayedItems = computed<DisplayItem[]>(() => {
    if (!props.maxItems || props.items.length <= props.maxItems) {
      return props.items
    }

    return [
      ...props.items.slice(0, props.itemsBeforeCollapse),
      { label: '...', isCollapsed: true },
      ...props.items.slice(-props.itemsAfterCollapse),
    ]
  })

  const linkClasses = cn(
    'text-krds-gray-90',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-base focus-visible:ring-offset-2',
    'rounded-[4px]',
  )

  const isHomeItem = (item: BreadcrumbItem, index: number) =>
    item.value === 'home' || (index === 0 && item.href === '/')
</script>

<template>
  <nav
    id="breadcrumb"
    :aria-label="ariaLabel"
    :class="cn('mb-10 pt-6', props.class)"
  >
    <ol class="flex flex-wrap items-center gap-1">
      <li
        v-for="(item, index) in displayedItems"
        :key="item.href || `${item.label}-${index}`"
        class="flex items-center gap-1"
      >
        <!-- Collapsed indicator (디자인 유지 + 접근성만 보완) -->
        <span v-if="item.isCollapsed" class="text-krds-gray-90">
          <span class="sr-only">중간 경로 생략</span>
          <span aria-hidden="true">...</span>
        </span>

        <!-- Current page -->
        <span
          v-else-if="index === displayedItems.length - 1"
          class="text-krds-gray-90 inline-flex items-center font-normal"
          aria-current="page"
        >
          <span class="inline-flex items-center gap-1 px-1">
            <Icon
              v-if="isHomeItem(item, index)"
              name="home"
              :size="16"
              class="text-krds-gray-80"
              aria-hidden="true"
            />
            {{ item.label }}
          </span>
        </span>

        <!-- Link -->
        <NuxtLink
          v-else-if="item.href"
          :to="item.href"
          :class="
            cn(
              linkClasses,
              'inline-flex items-center px-1 hover:bg-[#e7e9e9] hover:underline',
            )
          "
        >
          <span class="inline-flex items-center gap-1 align-middle">
            <Icon
              v-if="isHomeItem(item, index)"
              name="home"
              :size="16"
              class="text-krds-gray-80"
              aria-hidden="true"
            />
            {{ item.label }}
          </span>
        </NuxtLink>

        <!-- href 없는 경우 (기존 디자인 흐름 유지) -->
        <span v-else class="text-krds-gray-90 inline-flex items-center px-1">
          {{ item.label }}
        </span>

        <!-- Separator (디자인 그대로) -->
        <span
          v-if="index !== displayedItems.length - 1"
          class="text-krds-gray-50 inline-flex items-center select-none"
          aria-hidden="true"
        >
          <Icon
            v-if="!separator"
            name="chevron-right"
            :size="16"
            class="text-krds-gray-80"
            aria-hidden="true"
          />
          <span v-else>{{ separator }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>
