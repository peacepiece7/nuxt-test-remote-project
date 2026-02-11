<script setup lang="ts">
  // import { useWait } from "@/composables/useWait";
  import { computed, ref } from 'vue'
  import EditorRenderder from './EditorRenderder.vue'
  // import VExcelFIleReduceModal from "./VExcelFIleReduceModal.vue";
  // import VHangulFileReduceModal from "./VHangulFileReduceModal.vue";

  const props = withDefaults(
    defineProps<{
      attachDocListDto: any
      // fileFormat?: string[];
      // accept?: string;
      readonly?: boolean
    }>(),
    {
      fileFormat: () => [],
      // accept: "",
      readonly: false,
    },
  )

  const emit = defineEmits<{
    (e: 'print', path: string): void
  }>()

  const fileUpload = useFileUpload()
  // const { waitTo } = useWait();

  const isIncludeExcelFormat = computed(() => {
    return props.attachDocListDto.atchDocKindList?.includes('xlsx')
    // || props.fileFormat.includes("xls") ||
    // props.accept?.includes("xlsx") ||
    // props.accept?.includes("xls")
  })

  const isIncludeHangulFormat = computed(() => {
    return props.attachDocListDto.atchDocKindList?.includes('hwp')
  })

  const isOpenExcelReduceModal = ref(false)
  const isOpenHangulReduceModal = ref(false)

  const downloadSampleFile = async () => {
    // return waitTo(async () => {
    // try {
    const list = await fileUpload.fileList({
      fileUuid: props.attachDocListDto.formFileUuid,
    })
    await fileUpload.fileDownload({
      fileUuid: props.attachDocListDto.formFileUuid,
      sortSeqNo: list?.[list.length - 1]?.sortSeqNo,
    })
    // } catch (error) {
    // throw error;
    // }
    // });
  }

  const printSampleFile = async () => {
    // return waitTo(async () => {
    // try {
    emit('print', props.attachDocListDto.formPrtPth)
    // } catch (error) {
    // throw error;
    // }
    // });
  }

  const hasButton = computed(() => {
    return (
      (props.attachDocListDto.formTpCd === '20' &&
        props.attachDocListDto.formPrtPth) ||
      (props.attachDocListDto.formTpCd === '30' &&
        props.attachDocListDto.formFileUuid) ||
      isIncludeExcelFormat.value ||
      isIncludeHangulFormat.value
    )
  })
</script>

<template>
  <div v-if="attachDocListDto.atchDocMthCtet" class="info-container">
    <div class="info-container-inner">
      <EditorRenderder
        renderer="html"
        :model-value="attachDocListDto.atchDocMthCtet || ''"
      />
    </div>
  </div>

  <div v-if="hasButton && !readonly" class="button-container mt-10 mb-10">
    <div
      v-if="attachDocListDto.formTpCd === '20' && attachDocListDto.formPrtPth"
    >
      <button @click="printSampleFile()">
        <slot name="print-button-label">양식 출력</slot>
      </button>
    </div>
    <div
      v-if="attachDocListDto.formTpCd === '30' && attachDocListDto.formFileUuid"
    >
      <button @click="downloadSampleFile()">
        <slot name="download-button-label">양식 다운로드</slot>
      </button>
    </div>

    <div v-if="isIncludeExcelFormat">
      <button color="white" @click="isOpenExcelReduceModal = true">
        💡 엑셀파일 용량 줄이기
      </button>
    </div>
    <div v-if="isIncludeHangulFormat">
      <button color="white" @click="isOpenHangulReduceModal = true">
        💡 한글파일 용량 줄이기
      </button>
    </div>
  </div>
  <template v-else>
    <div v-if="attachDocListDto.atchDocMthCtet" class="mb-10" />
  </template>

  <!-- 용량 줄이기 모달들 -->
  <!-- <VExcelFIleReduceModal :isOpen="isOpenExcelReduceModal" @cancel="isOpenExcelReduceModal = false" /> -->
  <!-- <VHangulFileReduceModal :isOpen="isOpenHangulReduceModal" @cancel="isOpenHangulReduceModal = false" /> -->
</template>

<style scoped>
  .info-container {
    width: 100%;
    border: 2px dashed #c0dfc1;
    border-radius: 8px;
    padding: 10px;
    background-color: rgba(76, 175, 80, 0.06);
  }

  .button-container {
    display: flex;
    gap: 8px;
  }

  div {
    flex: 1;
    min-width: 0;

    &:only-child {
      flex: none;
      width: 100%;
    }

    :deep(button) {
      width: 100%;
    }
  }
</style>
