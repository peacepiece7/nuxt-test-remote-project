<script setup lang="ts">
  export type TransitionDirection = 'left' | 'right' | 'up' | 'down'

  const props = withDefaults(
    defineProps<{
      /**
       * Transition 방향
       * @default 'down'
       */
      direction?: TransitionDirection
      /**
       * Transition 지속 시간 (초)
       * @default 0.3
       */
      duration?: number
    }>(),
    {
      direction: 'down',
      duration: 0.3,
    },
  )

  const transitionName = computed(() => `keep-transition-${props.direction}`)
</script>

<template>
  <Transition :name="transitionName" :css="true">
    <slot />
  </Transition>
</template>

<style>
  /* 공용 KeepTransition 트랜지션
     - down: 위에서 살짝 내려오며 페이드
     - up/left/right는 필요 시 확장 가능
  */

  .keep-transition-down-enter-active,
  .keep-transition-down-leave-active {
    transition:
      opacity 0.15s ease-out,
      transform 0.15s ease-out;
  }

  .keep-transition-down-enter-from,
  .keep-transition-down-leave-to {
    opacity: 0;
    transform: translateY(-2px) scale(0.9);
  }

  .keep-transition-down-enter-to,
  .keep-transition-down-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
</style>
