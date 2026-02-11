<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      name?: string
      modelValue: string
      renderer?: 'html' | 'editor'
      minHeight?: string
    }>(),
    { modelValue: '', renderer: 'editor', minHeight: '350px' },
  )

  const emits = defineEmits<{
    'update:modelValue': [modelValue: string]
  }>()
</script>

<template>
  <div
    v-if="renderer === 'html'"
    class="ck-content"
    v-html="props.modelValue"
  />

  <ClientOnly>
    <div v-if="props.renderer === 'editor'">
      <MyCkeditor
        :name="props.name || ''"
        :model-value="props.modelValue"
        :min-height="props.minHeight"
        @update:model-value="emits('update:modelValue', $event)"
      />
    </div>
  </ClientOnly>
</template>
