export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface DialogProps {
  modalId?: string | symbol
  title?: string
  size?: DialogSize
  showClose?: boolean
  showFooter?: boolean
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  confirmDisabled?: boolean
  loading?: boolean
  clickToClose?: boolean
  escToClose?: boolean
  lockScroll?: boolean
  hideOverlay?: boolean
  overlayTransition?: string
  contentTransition?: string
}

export interface DialogEmits {
  confirm: []
  cancel: []
  close: []
  opened: []
  closed: []
}
