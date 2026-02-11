<script setup lang="ts">
  import { Ckeditor } from '@ckeditor/ckeditor5-vue'
  import translations from 'ckeditor5/translations/ko.js'
  import 'ckeditor5/ckeditor5.css'
  import MyEditorSkeleton from './MyEditorSkeleton.vue'
  import { FormFieldContextKey } from '@/composables/useFormField'

  interface Props {
    name?: string
    modelValue?: string | null
    disabled?: boolean
    /** 편집 영역 최소 높이 (CSS 값, 예: '300px', '20rem'). config 옵션이 없어 CSS로만 조절 가능 */
    minHeight?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    name: '',
    modelValue: '',
    minHeight: '',
  })

  const emits = defineEmits<{
    'update:modelValue': [p: string]
    blur: []
    input: [p: string]
  }>()

  defineOptions({
    inheritAttrs: false,
  })

  const attrs = useAttrs()
  const formField = inject(FormFieldContextKey, null)

  const minHeightStyle = computed(() =>
    props.minHeight ? { '--ck-editor-min-height': props.minHeight } : undefined,
  )

  const effectiveStatus = computed(() => formField?.status)
  const hasError = computed(() => effectiveStatus.value === 'error')

  // v-model(ref) 변경 시 formField 동기화 (Input/Textarea와 동일 패턴)
  watch(
    () => props.modelValue,
    (newVal) => {
      if (typeof window === 'undefined') return
      if (newVal === formField?.value) return
      formField?.setValue?.(newVal ?? '')
    },
    { immediate: true },
  )

  // setValues 등 폼 필드 변경 시 부모 ref 동기화 (Input의 watch(formField.value)와 동일)
  watch(
    () => formField?.value,
    (newValue) => {
      if (typeof window === 'undefined') return
      if (newValue === props.modelValue) return
      emits('update:modelValue', newValue ?? '')
    },
  )

  const isLayoutReady = ref(false)
  const editor = ref<any>(null)
  const config = ref<any>(null)

  onMounted(async () => {
    const {
      ClassicEditor,
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      Autosave,
      BlockQuote,
      Bold,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      ImageBlock,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      SimpleUploadAdapter,
      SourceEditing,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    } = await import('ckeditor5')
    editor.value = ClassicEditor

    config.value = {
      licenseKey: 'GPL',
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'sourceEditing',
          '|',
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          'underline',
          '|',
          'link',
          'insertImage',
          'mediaEmbed',
          'insertTable',
          'blockQuote',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent',
        ],
        shouldNotGroupWhenFull: false,
      },
      plugins: [
        AccessibilityHelp,
        Autoformat,
        AutoImage,
        Autosave,
        BlockQuote,
        Bold,
        Essentials,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        GeneralHtmlSupport,
        Heading,
        ImageBlock,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        MediaEmbed,
        Paragraph,
        PasteFromOffice,
        SelectAll,
        SimpleUploadAdapter,
        SourceEditing,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
        Undo,
        MyCustomUploadAdapterPlugin,
      ],
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true,
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph',
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1',
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2',
          },
          {
            model: 'heading3',
            view: 'h3',
            title: 'Heading 3',
            class: 'ck-heading_heading3',
          },
          {
            model: 'heading4',
            view: 'h4',
            title: 'Heading 4',
            class: 'ck-heading_heading4',
          },
          {
            model: 'heading5',
            view: 'h5',
            title: 'Heading 5',
            class: 'ck-heading_heading5',
          },
          {
            model: 'heading6',
            view: 'h6',
            title: 'Heading 6',
            class: 'ck-heading_heading6',
          },
        ],
      },
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true,
          },
        ],
      },
      image: {
        toolbar: [
          'imageTextAlternative',
          '|',
          'imageStyle:inline',
          'imageStyle:wrapText',
          'imageStyle:breakText',
          '|',
          'resizeImage',
        ],
      },
      initialData: props.modelValue ?? formField?.value ?? '',
      language: 'ko',
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file',
            },
          },
        },
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      placeholder: '내용을 입력하세요.',
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties',
        ],
      },
      translations: [translations],
    }

    isLayoutReady.value = true
  })

  class UploadAdapter {
    loader: any
    xhr: any

    constructor(loader: any) {
      this.loader = loader
    }

    upload() {
      return this.loader.file.then(
        (file: any) =>
          new Promise((resolve, reject) => {
            this._initRequest()
            this._initListeners(resolve, reject)
            this._sendRequest(file)
          }),
      )
    }

    _initRequest() {
      const xhr = (this.xhr = new XMLHttpRequest())
      xhr.open('POST', '/api/common/ckeditor/upload', true)
      xhr.responseType = 'json'
    }

    _initListeners(resolve: any, reject: any) {
      const genericErrorText = '파일을 업로드 할 수 없습니다.'

      this.xhr.addEventListener('error', () => reject(genericErrorText))
      this.xhr.addEventListener('abort', () => reject())
      this.xhr.addEventListener('load', () => {
        const response = this.xhr.response

        if (!response || response.error) {
          return reject(response?.error?.message || genericErrorText)
        }

        resolve({ default: response.url })
      })
    }

    _sendRequest(file: any) {
      const data = new FormData()
      // key값은 서버에서 받을 때 사용할 key값
      data.append('upload', file)
      this.xhr.send(data)
    }
  }

  function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any,
    ) => {
      return new UploadAdapter(loader)
    }
  }
</script>

<template>
  <div
    class="main-container my-ckeditor"
    :class="[attrs.class, { 'my-ckeditor--error': hasError }]"
    :style="minHeightStyle"
  >
    <div class="editor-container editor-container_classic-editor">
      <div class="editor-container__editor">
        <!-- Skeleton UI -->
        <MyEditorSkeleton v-if="!isLayoutReady || !editor" />
        <!-- Actual Editor -->
        <Ckeditor
          v-if="isLayoutReady && editor"
          :model-value="props.modelValue ?? formField?.value ?? ''"
          :editor="editor"
          :config="config"
          :disabled="props.disabled"
          @update:model-value="
            ($event) => {
              formField?.setValue?.($event)
              emits('update:modelValue', $event)
            }
          "
          @blur="
            () => {
              formField?.handleBlur?.()
              emits('blur')
            }
          "
          @input="emits('input', $event)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* CKEditor 5는 config에 height 옵션이 없어 CSS로만 편집 영역 높이 조절 */
  .my-ckeditor :deep(.ck-editor__editable),
  .my-ckeditor :deep(.ck-editor__editable_inline) {
    min-height: var(--ck-editor-min-height, 300px);
  }

  /* VFormField status와 연동: 에러 시 border 빨간색 (에러 메시지는 VFormError에서 표시) */
  .my-ckeditor--error :deep(.ck-editor__editable),
  .my-ckeditor--error :deep(.ck-editor__editable_inline) {
    border-color: var(--color-krds-danger-60) !important;
    border-width: 1px !important;
    border-style: solid !important;
  }
</style>
