import { useModal, useModalSlot } from 'vue-final-modal'
import { ref, type Component } from 'vue'
import Modal from '@/components/hanui/Dialog.vue'
import type { DialogProps } from './types'

export interface DialogOptions extends Partial<DialogProps> {
  content?: string | Component
  contentProps?: Record<string, unknown>
}

/**
 * 프로그래매틱하게 Dialog를 사용하기 위한 컴포저블
 */
export function useDialog(options: DialogOptions = {}) {
  const { content, contentProps, ...dialogProps } = options

  const isLoading = ref(false)
  let resolvePromise: ((value: boolean) => void) | null = null

  const { open, close, destroy } = useModal({
    component: Modal,
    attrs: {
      ...dialogProps,
      loading: isLoading.value,
      onConfirm: () => {
        resolvePromise?.(true)
        close()
      },
      onCancel: () => {
        resolvePromise?.(false)
        close()
      },
      onClose: () => {
        resolvePromise?.(false)
        close()
      },
    },
    slots: {
      default:
        typeof content === 'string'
          ? content
          : content
            ? useModalSlot({
                component: content,
                attrs: contentProps || {},
              })
            : undefined,
    },
  })

  const openAsync = (): Promise<boolean> => {
    return new Promise((resolve) => {
      resolvePromise = resolve
      open()
    })
  }

  return {
    open: openAsync,
    close,
    destroy,
    isLoading,
  }
}

export interface AlertOptions {
  title?: string
  content: string
  confirmText?: string
  size?: DialogProps['size']
}

/**
 * Alert 다이얼로그 - 확인 버튼만 표시
 * @example
 * await showAlert({ content: '저장되었습니다.' })
 */
export async function showAlert(options: AlertOptions): Promise<void> {
  const dialog = useDialog({
    title: options.title ?? undefined,
    content: options.content,
    confirmText: options.confirmText ?? '확인',
    size: options.size ?? 'sm',
    showCancel: false,
    showClose: false,
  })

  await dialog.open()
  dialog.destroy()
}

export interface ConfirmOptions {
  title?: string
  content: string
  confirmText?: string
  cancelText?: string
  size?: DialogProps['size']
}

/**
 * Confirm 다이얼로그 - 확인/취소 버튼 표시
 * @returns 확인 시 true, 취소 시 false
 * @example
 * const result = await showConfirm({ content: '삭제하시겠습니까?' })
 * if (result) {
 *   // 삭제 로직
 * }
 */
export async function showConfirm(options: ConfirmOptions): Promise<boolean> {
  const dialog = useDialog({
    title: options.title ?? undefined,
    content: options.content,
    confirmText: options.confirmText ?? '확인',
    cancelText: options.cancelText ?? '취소',
    size: options.size ?? 'sm',
    showCancel: true,
    showClose: false,
  })

  const result = await dialog.open()
  dialog.destroy()
  return result
}
