/**
 * GNB 메뉴·가이드 인덱스의 단일 소스.
 * componentCategories만 수정하면 GNB 패널과 가이드 카테고리 설명이 함께 반영됩니다.
 */

export const componentCategories = {
  inputs: [
    'input',
    'textarea',
    'date-input-multiple-range',
    'date-picker',
    'file-upload',
    'address-input',
  ],
  selection: ['checkbox', 'radio', 'select', 'switch'],
  buttons: ['button', 'text-button'],
  layout: [
    'container',
    'grid',
    'flex',
    'stack',
    'center',
    'wrap',
    'simple-grid',
  ],
  feedback: [
    'alert',
    'alert-dialog',
    'dialog',
    'critical-alerts',
    'toast',
    'tooltip',
    'progress',
    'spinner',
    'skeleton',
  ],
  navigation: [
    'breadcrumb',
    'in-page-navigation',
    'side-navigation',
    'main-menu',
    'filter-line',
    'pagination',
    'load-more',
    'tab-bars',
    'tab',
  ],
  display: [
    'badge',
    'icon',
    'tag',
    'heading',
    'no-data',
    'body',
    'code',
    'display',
    'label',
    'section-heading-system',
  ],
  overlay: ['modal', 'accordion', 'disclosure', 'dropdown-menu'],
  'data-display': [
    'table',
    'data-table',
    'list',
    'card',
    'carousel',
    'image',
    'aspect-ratio',
    'editor-renderer',
  ],
  'layout-components': [
    'header',
    'footer',
    'masthead',
    'identifier',
    'skip-link',
  ],
  form: ['form-field', 'form-example', 'form-example-2'],
  misc: ['slider', 'step-indicator'],
} as const

export type ComponentCategoryKey = keyof typeof componentCategories

/** 컴포넌트 slug → 표시 이름 (Ctrl+F 검색용) */
export function formatLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/** 카테고리별 컴포넌트 목록을 "A, B, C" 형태 문자열로 */
export function formatCategoryDesc(components: readonly string[]): string {
  return components.map(formatLabel).join(', ')
}

/** 카테고리 페이지용 컴포넌트 링크 (name, href, description) */
export interface CategoryComponentLink {
  name: string
  href: string
  description: string
}

/** slug별 설명(선택). 없으면 기본 문구 사용 */
export const componentDescriptions: Partial<Record<string, string>> = {
  input: '텍스트 입력 필드 컴포넌트입니다. 다양한 타입과 상태를 지원합니다.',
  textarea: '여러 줄 텍스트 입력을 위한 컴포넌트입니다.',
  'date-picker': 'VDatePicker 기반 날짜 선택 가이드입니다.',
  'file-upload': '파일 업로드를 위한 컴포넌트입니다.',
  'address-input': 'Daum 우편번호 API 기반 주소 검색 입력 컴포넌트입니다.',
  checkbox: '다중 선택을 위한 체크박스 컴포넌트입니다.',
  radio: '단일 선택을 위한 라디오 버튼 컴포넌트입니다.',
  select: '드롭다운 선택 메뉴 컴포넌트입니다.',
  switch: '켜기/끄기 토글을 위한 스위치 컴포넌트입니다.',
  button: '사용자 액션을 트리거하는 버튼 컴포넌트입니다.',
  'text-button': '텍스트 형태의 버튼 컴포넌트입니다.',
  container: '콘텐츠를 감싸는 컨테이너 컴포넌트입니다.',
  grid: '그리드 레이아웃을 위한 컴포넌트입니다.',
  flex: 'Flexbox 레이아웃을 위한 컴포넌트입니다.',
  stack: '세로 방향 스택 레이아웃 컴포넌트입니다.',
  center: '콘텐츠를 중앙 정렬하는 컴포넌트입니다.',
  wrap: '자동 줄바꿈을 지원하는 레이아웃 컴포넌트입니다.',
  'simple-grid': '간단한 그리드 레이아웃 컴포넌트입니다.',
  alert: '중요한 정보나 경고를 표시하는 알림 컴포넌트입니다.',
  'alert-dialog': '사용자 확인이 필요한 대화상자 컴포넌트입니다.',
  'critical-alerts': '중요한 경고를 표시하는 컴포넌트입니다.',
  toast: '일시적인 알림 메시지를 표시하는 컴포넌트입니다.',
  tooltip: '추가 정보를 제공하는 툴팁 컴포넌트입니다.',
  progress: '작업 진행 상태를 표시하는 컴포넌트입니다.',
  spinner: '로딩 상태를 표시하는 스피너 컴포넌트입니다.',
  skeleton: '콘텐츠 로딩 중 플레이스홀더를 표시하는 컴포넌트입니다.',
  breadcrumb: '현재 위치를 표시하는 브레드크럼 컴포넌트입니다.',
  'in-page-navigation': '페이지 내 네비게이션 컴포넌트입니다.',
  'side-navigation': '사이드바 네비게이션 컴포넌트입니다.',
  'main-menu': '메인 메뉴 컴포넌트입니다.',
  'filter-line': '목록 상단 필터 라인 컴포넌트입니다.',
  pagination: '페이지네이션 컴포넌트입니다.',
  'load-more': '더 보기 버튼 컴포넌트입니다.',
  'tab-bars': '탭 바 컴포넌트입니다.',
  tab: '탭 컴포넌트입니다.',
  badge: '상태나 카운트를 표시하는 배지 컴포넌트입니다.',
  icon: '아이콘을 표시하는 컴포넌트입니다.',
  tag: '태그를 표시하는 컴포넌트입니다.',
  heading: '제목을 표시하는 컴포넌트입니다.',
  'no-data': '빈 상태 안내를 제공하는 컴포넌트입니다.',
  body: '본문 텍스트를 표시하는 컴포넌트입니다.',
  code: '코드를 표시하는 컴포넌트입니다.',
  display: '큰 텍스트를 표시하는 컴포넌트입니다.',
  label: '라벨을 표시하는 컴포넌트입니다.',
  'section-heading-system': '섹션 제목 시스템 컴포넌트입니다.',
  modal: '모달 다이얼로그 컴포넌트입니다.',
  accordion: '접을 수 있는 아코디언 컴포넌트입니다.',
  disclosure: '내용을 펼치고 접을 수 있는 컴포넌트입니다.',
  'dropdown-menu': '드롭다운 메뉴 컴포넌트입니다.',
  table: '표 형태로 데이터를 표시하는 컴포넌트입니다.',
  'data-table': '고급 기능이 있는 데이터 테이블 컴포넌트입니다.',
  list: '리스트 형태로 데이터를 표시하는 컴포넌트입니다.',
  card: '카드 형태로 콘텐츠를 표시하는 컴포넌트입니다.',
  carousel: '슬라이드 형태로 콘텐츠를 표시하는 컴포넌트입니다.',
  image: '이미지를 표시하는 컴포넌트입니다.',
  'aspect-ratio': '비율을 유지하며 콘텐츠를 표시하는 컴포넌트입니다.',
  'editor-renderer': '에디터 렌더링 컴포넌트입니다.',
  header: '페이지 상단 헤더 컴포넌트입니다.',
  footer: '페이지 하단 푸터 컴포넌트입니다.',
  masthead: '마스터헤드 컴포넌트입니다.',
  identifier: '사이트 식별자 컴포넌트입니다.',
  'skip-link': '접근성을 위한 스킵 링크 컴포넌트입니다.',
  'form-field': '폼 필드를 구성하는 통합 컴포넌트입니다.',
  'form-example':
    '폼 사용 예시(Input, Textarea, VDatePicker, File Upload 등)입니다.',
  slider: '값을 선택할 수 있는 슬라이더 컴포넌트입니다.',
  'step-indicator': '단계를 표시하는 스텝 인디케이터 컴포넌트입니다.',
}

const DEFAULT_DESCRIPTION = '상세 가이드를 확인하세요.'

/** 특정 카테고리의 상세 컴포넌트 링크 목록 (가이드 카테고리 페이지용) */
export function getCategoryComponents(
  categoryKey: ComponentCategoryKey,
): CategoryComponentLink[] {
  const slugs = componentCategories[categoryKey] || []
  return slugs.map((slug) => ({
    name: formatLabel(slug),
    href: `/guide/components/${slug}`,
    description: componentDescriptions[slug] ?? DEFAULT_DESCRIPTION,
  }))
}

/** GNB용 패널 메뉴 아이템 (헤더 컴포넌트 타입과 호환) */
export interface PanelMenuItem {
  label: string
  href?: string
  panel?: Array<{ label: string; href: string }>
}

const categoryMeta: Record<
  ComponentCategoryKey | 'foundation',
  { label: string; href: string; customDesc?: string }
> = {
  foundation: {
    label: 'Foundation',
    href: '/guide/foundation',
    customDesc: '색상, 타이포그래피, 간격 등 디자인 토큰과 기초 가이드',
  },
  inputs: { label: 'Inputs', href: '/guide/inputs' },
  selection: { label: 'Selection', href: '/guide/selection' },
  buttons: { label: 'Buttons', href: '/guide/buttons' },
  layout: { label: 'Layout', href: '/guide/layout' },
  feedback: { label: 'Feedback', href: '/guide/feedback' },
  navigation: { label: 'Navigation', href: '/guide/navigation' },
  display: { label: 'Display', href: '/guide/display' },
  overlay: { label: 'Overlay', href: '/guide/overlay' },
  'data-display': { label: 'Data Display', href: '/guide/data-display' },
  'layout-components': {
    label: 'Layout Components',
    href: '/guide/layout-components',
  },
  form: { label: 'Form', href: '/guide/form' },
  misc: { label: 'Misc', href: '/guide/misc' },
}

/** GNB 패널용 메뉴 아이템 (HeaderWithPanelMenu에 전달) */
export function getPanelItems(): PanelMenuItem[] {
  const items: PanelMenuItem[] = [
    {
      label: categoryMeta.foundation.label,
      href: categoryMeta.foundation.href,
    },
  ]
  const keys: ComponentCategoryKey[] = [
    'inputs',
    'selection',
    'buttons',
    'layout',
    'feedback',
    'navigation',
    'display',
    'overlay',
    'data-display',
    'layout-components',
    'form',
    'misc',
  ]
  for (const key of keys) {
    const meta = categoryMeta[key]
    const components = componentCategories[key] || []
    items.push({
      label: meta.label,
      href: meta.href,
      panel: components.map((component) => ({
        label: formatLabel(component),
        href: `/guide/components/${component}`,
      })),
    })
  }
  return items
}

/** 가이드 인덱스 페이지용 카테고리 (label, href, desc) */
export interface GuideCategoryItem {
  label: string
  href: string
  desc: string
}

export function getGuideCategories(): GuideCategoryItem[] {
  const result: GuideCategoryItem[] = [
    {
      label: categoryMeta.foundation.label,
      href: categoryMeta.foundation.href,
      desc: categoryMeta.foundation.customDesc!,
    },
  ]
  const keys: ComponentCategoryKey[] = [
    'inputs',
    'selection',
    'buttons',
    'layout',
    'feedback',
    'navigation',
    'display',
    'overlay',
    'data-display',
    'layout-components',
    'form',
    'misc',
  ]
  for (const key of keys) {
    const meta = categoryMeta[key]
    const components = componentCategories[key] || []
    result.push({
      label: meta.label,
      href: meta.href,
      desc: meta.customDesc ?? formatCategoryDesc(components),
    })
  }
  return result
}
