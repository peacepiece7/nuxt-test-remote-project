<script setup lang="ts">
import Container from '@/components/hanui/Container.vue';
import Heading from '@/components/hanui/Heading.vue';

useHead({
  title: 'Foundation - 가이드'
});

// 색상 값 캐시
const colorValues = ref<Record<string, string>>({});

// CSS 변수에서 색상 값을 가져오는 함수
const getComputedColor = (varName: string): string => {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

// 색상 그룹 정의
const colorGroups = [
  {
    title: 'Base Colors',
    source: 'figma-main',
    colors: [
      { name: 'white', var: '--color-white' },
      { name: 'black', var: '--color-black' },
    ]
  },
  {
    title: 'Primary Colors',
    source: 'figma-main',
    colors: [
      { name: 'primary-50', var: '--color-primary-50' },
      { name: 'primary-100', var: '--color-primary-100' },
      { name: 'primary-200', var: '--color-primary-200' },
      { name: 'primary-300', var: '--color-primary-300' },
      { name: 'primary-400', var: '--color-primary-400' },
      { name: 'primary-500', var: '--color-primary-500' },
      { name: 'primary-600', var: '--color-primary-600' },
      { name: 'primary-700', var: '--color-primary-700' },
      { name: 'primary-800', var: '--color-primary-800' },
      { name: 'primary-900', var: '--color-primary-900' },
    ]
  },
  {
    title: 'Functional Colors',
    source: 'figma-main',
    colors: [
      { name: 'functional-positive', var: '--color-functional-positive' },
      { name: 'functional-negative', var: '--color-functional-negative' },
      { name: 'functional-success', var: '--color-functional-success' },
    ]
  },
  {
    title: 'Text Colors',
    source: 'figma-main',
    colors: [
      { name: 'text-title', var: '--color-text-title' },
      { name: 'text-body', var: '--color-text-body' },
      { name: 'text-caption', var: '--color-text-caption' },
      { name: 'text-placeholder', var: '--color-text-placeholder' },
      { name: 'text-disabled', var: '--color-text-disabled' },
    ]
  },
  {
    title: 'Fill Colors',
    source: 'figma-main',
    colors: [
      { name: 'fill-50', var: '--color-fill-50' },
      { name: 'fill-100', var: '--color-fill-100' },
      { name: 'fill-200', var: '--color-fill-200' },
    ]
  },
  {
    title: 'Stroke Colors',
    source: 'figma-main',
    colors: [
      { name: 'stroke-200', var: '--color-stroke-200' },
      { name: 'stroke-300', var: '--color-stroke-300' },
      { name: 'stroke-400', var: '--color-stroke-400' },
      { name: 'stroke-900', var: '--color-stroke-900' },
    ]
  },
];

// KRDS 색상 그룹
const krdsColorGroups = [
  {
    title: 'KRDS Primary',
    source: 'figma-token',
    colors: [
      { name: 'krds-primary-5', var: '--color-krds-primary-5' },
      { name: 'krds-primary-10', var: '--color-krds-primary-10' },
      { name: 'krds-primary-20', var: '--color-krds-primary-20' },
      { name: 'krds-primary-30', var: '--color-krds-primary-30' },
      { name: 'krds-primary-40', var: '--color-krds-primary-40' },
      { name: 'krds-primary-50', var: '--color-krds-primary-50' },
      { name: 'krds-primary-60', var: '--color-krds-primary-60' },
      { name: 'krds-primary-70', var: '--color-krds-primary-70' },
      { name: 'krds-primary-80', var: '--color-krds-primary-80' },
      { name: 'krds-primary-90', var: '--color-krds-primary-90' },
      { name: 'krds-primary-95', var: '--color-krds-primary-95' },
      { name: 'krds-primary-base', var: '--color-krds-primary-base' },
      { name: 'krds-primary-text', var: '--color-krds-primary-text' },
      { name: 'krds-primary-surface', var: '--color-krds-primary-surface' },
      { name: 'krds-primary-border', var: '--color-krds-primary-border' },
    ]
  },
  {
    title: 'KRDS Secondary',
    source: 'figma-token',
    colors: [
      { name: 'krds-secondary-5', var: '--color-krds-secondary-5' },
      { name: 'krds-secondary-10', var: '--color-krds-secondary-10' },
      { name: 'krds-secondary-20', var: '--color-krds-secondary-20' },
      { name: 'krds-secondary-30', var: '--color-krds-secondary-30' },
      { name: 'krds-secondary-40', var: '--color-krds-secondary-40' },
      { name: 'krds-secondary-50', var: '--color-krds-secondary-50' },
      { name: 'krds-secondary-60', var: '--color-krds-secondary-60' },
      { name: 'krds-secondary-70', var: '--color-krds-secondary-70' },
      { name: 'krds-secondary-80', var: '--color-krds-secondary-80' },
      { name: 'krds-secondary-90', var: '--color-krds-secondary-90' },
      { name: 'krds-secondary-95', var: '--color-krds-secondary-95' },
      { name: 'krds-secondary-base', var: '--color-krds-secondary-base' },
      { name: 'krds-secondary-text', var: '--color-krds-secondary-text' },
      { name: 'krds-secondary-surface', var: '--color-krds-secondary-surface' },
    ]
  },
  {
    title: 'KRDS Gray',
    source: 'figma-token',
    colors: [
      { name: 'krds-gray-0', var: '--color-krds-gray-0' },
      { name: 'krds-gray-5', var: '--color-krds-gray-5' },
      { name: 'krds-gray-10', var: '--color-krds-gray-10' },
      { name: 'krds-gray-20', var: '--color-krds-gray-20' },
      { name: 'krds-gray-30', var: '--color-krds-gray-30' },
      { name: 'krds-gray-40', var: '--color-krds-gray-40' },
      { name: 'krds-gray-50', var: '--color-krds-gray-50' },
      { name: 'krds-gray-60', var: '--color-krds-gray-60' },
      { name: 'krds-gray-70', var: '--color-krds-gray-70' },
      { name: 'krds-gray-80', var: '--color-krds-gray-80' },
      { name: 'krds-gray-90', var: '--color-krds-gray-90' },
      { name: 'krds-gray-95', var: '--color-krds-gray-95' },
      { name: 'krds-gray-100', var: '--color-krds-gray-100' },
      { name: 'krds-gray-text', var: '--color-krds-gray-text' },
      { name: 'krds-gray-surface', var: '--color-krds-gray-surface' },
      { name: 'krds-gray-background', var: '--color-krds-gray-background' },
      { name: 'krds-gray-border', var: '--color-krds-gray-border' },
    ]
  },
  {
    title: 'KRDS Danger',
    source: 'figma-token',
    colors: [
      { name: 'krds-danger-5', var: '--color-krds-danger-5' },
      { name: 'krds-danger-10', var: '--color-krds-danger-10' },
      { name: 'krds-danger-20', var: '--color-krds-danger-20' },
      { name: 'krds-danger-30', var: '--color-krds-danger-30' },
      { name: 'krds-danger-40', var: '--color-krds-danger-40' },
      { name: 'krds-danger-50', var: '--color-krds-danger-50' },
      { name: 'krds-danger-60', var: '--color-krds-danger-60' },
      { name: 'krds-danger-70', var: '--color-krds-danger-70' },
      { name: 'krds-danger-80', var: '--color-krds-danger-80' },
      { name: 'krds-danger-90', var: '--color-krds-danger-90' },
      { name: 'krds-danger-95', var: '--color-krds-danger-95' },
      { name: 'krds-danger-base', var: '--color-krds-danger-base' },
      { name: 'krds-danger-icon', var: '--color-krds-danger-icon' },
      { name: 'krds-danger-text', var: '--color-krds-danger-text' },
      { name: 'krds-danger-surface', var: '--color-krds-danger-surface' },
      { name: 'krds-danger-border', var: '--color-krds-danger-border' },
    ]
  },
  {
    title: 'KRDS Warning',
    source: 'figma-token',
    colors: [
      { name: 'krds-warning-5', var: '--color-krds-warning-5' },
      { name: 'krds-warning-10', var: '--color-krds-warning-10' },
      { name: 'krds-warning-20', var: '--color-krds-warning-20' },
      { name: 'krds-warning-30', var: '--color-krds-warning-30' },
      { name: 'krds-warning-40', var: '--color-krds-warning-40' },
      { name: 'krds-warning-50', var: '--color-krds-warning-50' },
      { name: 'krds-warning-60', var: '--color-krds-warning-60' },
      { name: 'krds-warning-70', var: '--color-krds-warning-70' },
      { name: 'krds-warning-80', var: '--color-krds-warning-80' },
      { name: 'krds-warning-90', var: '--color-krds-warning-90' },
      { name: 'krds-warning-95', var: '--color-krds-warning-95' },
      { name: 'krds-warning-base', var: '--color-krds-warning-base' },
      { name: 'krds-warning-icon', var: '--color-krds-warning-icon' },
      { name: 'krds-warning-text', var: '--color-krds-warning-text' },
      { name: 'krds-warning-surface', var: '--color-krds-warning-surface' },
      { name: 'krds-warning-border', var: '--color-krds-warning-border' },
    ]
  },
  {
    title: 'KRDS Success',
    source: 'figma-token',
    colors: [
      { name: 'krds-success-5', var: '--color-krds-success-5' },
      { name: 'krds-success-10', var: '--color-krds-success-10' },
      { name: 'krds-success-20', var: '--color-krds-success-20' },
      { name: 'krds-success-30', var: '--color-krds-success-30' },
      { name: 'krds-success-40', var: '--color-krds-success-40' },
      { name: 'krds-success-50', var: '--color-krds-success-50' },
      { name: 'krds-success-60', var: '--color-krds-success-60' },
      { name: 'krds-success-70', var: '--color-krds-success-70' },
      { name: 'krds-success-80', var: '--color-krds-success-80' },
      { name: 'krds-success-90', var: '--color-krds-success-90' },
      { name: 'krds-success-95', var: '--color-krds-success-95' },
      { name: 'krds-success-base', var: '--color-krds-success-base' },
      { name: 'krds-success-icon', var: '--color-krds-success-icon' },
      { name: 'krds-success-text', var: '--color-krds-success-text' },
      { name: 'krds-success-surface', var: '--color-krds-success-surface' },
      { name: 'krds-success-border', var: '--color-krds-success-border' },
    ]
  },
  {
    title: 'KRDS Info',
    source: 'figma-token',
    colors: [
      { name: 'krds-info-5', var: '--color-krds-info-5' },
      { name: 'krds-info-10', var: '--color-krds-info-10' },
      { name: 'krds-info-20', var: '--color-krds-info-20' },
      { name: 'krds-info-30', var: '--color-krds-info-30' },
      { name: 'krds-info-40', var: '--color-krds-info-40' },
      { name: 'krds-info-50', var: '--color-krds-info-50' },
      { name: 'krds-info-60', var: '--color-krds-info-60' },
      { name: 'krds-info-70', var: '--color-krds-info-70' },
      { name: 'krds-info-80', var: '--color-krds-info-80' },
      { name: 'krds-info-90', var: '--color-krds-info-90' },
      { name: 'krds-info-95', var: '--color-krds-info-95' },
      { name: 'krds-info-base', var: '--color-krds-info-base' },
      { name: 'krds-info-icon', var: '--color-krds-info-icon' },
      { name: 'krds-info-text', var: '--color-krds-info-text' },
      { name: 'krds-info-surface', var: '--color-krds-info-surface' },
      { name: 'krds-info-border', var: '--color-krds-info-border' },
    ]
  },
  {
    title: 'KRDS Accent',
    source: 'figma-token',
    colors: [
      { name: 'krds-accent-5', var: '--color-krds-accent-5' },
      { name: 'krds-accent-10', var: '--color-krds-accent-10' },
      { name: 'krds-accent-20', var: '--color-krds-accent-20' },
      { name: 'krds-accent-30', var: '--color-krds-accent-30' },
      { name: 'krds-accent-40', var: '--color-krds-accent-40' },
      { name: 'krds-accent-50', var: '--color-krds-accent-50' },
      { name: 'krds-accent-60', var: '--color-krds-accent-60' },
      { name: 'krds-accent-70', var: '--color-krds-accent-70' },
      { name: 'krds-accent-80', var: '--color-krds-accent-80' },
      { name: 'krds-accent-90', var: '--color-krds-accent-90' },
      { name: 'krds-accent-95', var: '--color-krds-accent-95' },
      { name: 'krds-accent-base', var: '--color-krds-accent-base' },
      { name: 'krds-accent-text', var: '--color-krds-accent-text' },
      { name: 'krds-accent-surface', var: '--color-krds-accent-surface' },
    ]
  },
];

// Variables.css의 색상 그룹
const variablesColorGroups = [
  {
    title: 'New Blue',
    source: 'variables',
    colors: [
      { name: 'new-blue-950', var: '--color-new-blue-950' },
      { name: 'new-blue-900', var: '--color-new-blue-900' },
      { name: 'new-blue-800', var: '--color-new-blue-800' },
      { name: 'new-blue-700', var: '--color-new-blue-700' },
      { name: 'new-blue-600', var: '--color-new-blue-600' },
      { name: 'new-blue-500', var: '--color-new-blue-500' },
      { name: 'new-blue-400', var: '--color-new-blue-400' },
      { name: 'new-blue-300', var: '--color-new-blue-300' },
      { name: 'new-blue-250', var: '--color-new-blue-250' },
      { name: 'new-blue-200', var: '--color-new-blue-200' },
      { name: 'new-blue-100', var: '--color-new-blue-100' },
      { name: 'new-blue-50', var: '--color-new-blue-50' },
    ]
  },
  {
    title: 'Blue',
    source: 'variables',
    colors: [
      { name: 'blue-900', var: '--color-blue-900' },
      { name: 'blue-800', var: '--color-blue-800' },
      { name: 'blue-700', var: '--color-blue-700' },
      { name: 'blue-600', var: '--color-blue-600' },
      { name: 'blue-500', var: '--color-blue-500' },
      { name: 'blue-400', var: '--color-blue-400' },
      { name: 'blue-300', var: '--color-blue-300' },
      { name: 'blue-200', var: '--color-blue-200' },
      { name: 'blue-100', var: '--color-blue-100' },
      { name: 'blue-50', var: '--color-blue-50' },
    ]
  },
  {
    title: 'Sky Blue',
    source: 'variables',
    colors: [
      { name: 'sky-blue-900', var: '--color-sky-blue-900' },
      { name: 'sky-blue-800', var: '--color-sky-blue-800' },
      { name: 'sky-blue-700', var: '--color-sky-blue-700' },
      { name: 'sky-blue-600', var: '--color-sky-blue-600' },
      { name: 'sky-blue-500', var: '--color-sky-blue-500' },
      { name: 'sky-blue-400', var: '--color-sky-blue-400' },
      { name: 'sky-blue-300', var: '--color-sky-blue-300' },
      { name: 'sky-blue-200', var: '--color-sky-blue-200' },
      { name: 'sky-blue-100', var: '--color-sky-blue-100' },
      { name: 'sky-blue-50', var: '--color-sky-blue-50' },
    ]
  },
  {
    title: 'Cyan',
    source: 'variables',
    colors: [
      { name: 'cyan-900', var: '--color-cyan-900' },
      { name: 'cyan-800', var: '--color-cyan-800' },
      { name: 'cyan-700', var: '--color-cyan-700' },
      { name: 'cyan-600', var: '--color-cyan-600' },
      { name: 'cyan-500', var: '--color-cyan-500' },
      { name: 'cyan-400', var: '--color-cyan-400' },
      { name: 'cyan-300', var: '--color-cyan-300' },
      { name: 'cyan-200', var: '--color-cyan-200' },
      { name: 'cyan-100', var: '--color-cyan-100' },
      { name: 'cyan-50', var: '--color-cyan-50' },
    ]
  },
  {
    title: 'Green',
    source: 'variables',
    colors: [
      { name: 'green-900', var: '--color-green-900' },
      { name: 'green-800', var: '--color-green-800' },
      { name: 'green-700', var: '--color-green-700' },
      { name: 'green-600', var: '--color-green-600' },
      { name: 'green-500', var: '--color-green-500' },
      { name: 'green-400', var: '--color-green-400' },
      { name: 'green-300', var: '--color-green-300' },
      { name: 'green-200', var: '--color-green-200' },
      { name: 'green-100', var: '--color-green-100' },
      { name: 'green-50', var: '--color-green-50' },
    ]
  },
  {
    title: 'Purple Blue',
    source: 'variables',
    colors: [
      { name: 'purple-blue-900', var: '--color-purple-blue-900' },
      { name: 'purple-blue-800', var: '--color-purple-blue-800' },
      { name: 'purple-blue-700', var: '--color-purple-blue-700' },
      { name: 'purple-blue-600', var: '--color-purple-blue-600' },
      { name: 'purple-blue-500', var: '--color-purple-blue-500' },
      { name: 'purple-blue-400', var: '--color-purple-blue-400' },
      { name: 'purple-blue-300', var: '--color-purple-blue-300' },
      { name: 'purple-blue-200', var: '--color-purple-blue-200' },
      { name: 'purple-blue-100', var: '--color-purple-blue-100' },
      { name: 'purple-blue-50', var: '--color-purple-blue-50' },
    ]
  },
  {
    title: 'Purple',
    source: 'variables',
    colors: [
      { name: 'purple-900', var: '--color-purple-900' },
      { name: 'purple-800', var: '--color-purple-800' },
      { name: 'purple-700', var: '--color-purple-700' },
      { name: 'purple-600', var: '--color-purple-600' },
      { name: 'purple-500', var: '--color-purple-500' },
      { name: 'purple-400', var: '--color-purple-400' },
      { name: 'purple-300', var: '--color-purple-300' },
      { name: 'purple-200', var: '--color-purple-200' },
      { name: 'purple-100', var: '--color-purple-100' },
      { name: 'purple-50', var: '--color-purple-50' },
    ]
  },
  {
    title: 'Red',
    source: 'variables',
    colors: [
      { name: 'red-900', var: '--color-red-900' },
      { name: 'red-800', var: '--color-red-800' },
      { name: 'red-700', var: '--color-red-700' },
      { name: 'red-600', var: '--color-red-600' },
      { name: 'red-500', var: '--color-red-500' },
      { name: 'red-400', var: '--color-red-400' },
      { name: 'red-300', var: '--color-red-300' },
      { name: 'red-200', var: '--color-red-200' },
      { name: 'red-100', var: '--color-red-100' },
      { name: 'red-50', var: '--color-red-50' },
    ]
  },
  {
    title: 'Orange',
    source: 'variables',
    colors: [
      { name: 'orange-900', var: '--color-orange-900' },
      { name: 'orange-800', var: '--color-orange-800' },
      { name: 'orange-700', var: '--color-orange-700' },
      { name: 'orange-600', var: '--color-orange-600' },
      { name: 'orange-500', var: '--color-orange-500' },
      { name: 'orange-400', var: '--color-orange-400' },
      { name: 'orange-300', var: '--color-orange-300' },
      { name: 'orange-200', var: '--color-orange-200' },
      { name: 'orange-100', var: '--color-orange-100' },
      { name: 'orange-50', var: '--color-orange-50' },
    ]
  },
  {
    title: 'Yellow',
    source: 'variables',
    colors: [
      { name: 'yellow-900', var: '--color-yellow-900' },
      { name: 'yellow-800', var: '--color-yellow-800' },
      { name: 'yellow-700', var: '--color-yellow-700' },
      { name: 'yellow-600', var: '--color-yellow-600' },
      { name: 'yellow-500', var: '--color-yellow-500' },
      { name: 'yellow-400', var: '--color-yellow-400' },
      { name: 'yellow-300', var: '--color-yellow-300' },
      { name: 'yellow-200', var: '--color-yellow-200' },
      { name: 'yellow-100', var: '--color-yellow-100' },
      { name: 'yellow-50', var: '--color-yellow-50' },
    ]
  },
  {
    title: 'Grey',
    source: 'variables',
    colors: [
      { name: 'grey-900', var: '--color-grey-900' },
      { name: 'grey-800', var: '--color-grey-800' },
      { name: 'grey-700', var: '--color-grey-700' },
      { name: 'grey-650', var: '--color-grey-650' },
      { name: 'grey-600', var: '--color-grey-600' },
      { name: 'grey-500', var: '--color-grey-500' },
      { name: 'grey-400', var: '--color-grey-400' },
      { name: 'grey-300', var: '--color-grey-300' },
      { name: 'grey-200', var: '--color-grey-200' },
      { name: 'grey-100', var: '--color-grey-100' },
      { name: 'grey-50', var: '--color-grey-50' },
    ]
  },
];

// 색상이 밝은지 어두운지 판단하는 함수
const isLightColor = (color: string): boolean => {
  if (!color) return false;
  // rgba 형식 처리
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbaMatch) {
    const rStr = rgbaMatch[1];
    const gStr = rgbaMatch[2];
    const bStr = rgbaMatch[3];
    if (rStr && gStr && bStr) {
      const r = parseInt(rStr, 10);
      const g = parseInt(gStr, 10);
      const b = parseInt(bStr, 10);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128;
    }
  }
  // hex 형식 처리
  const hexMatch = color.match(/#([0-9a-f]{6}|[0-9a-f]{3})/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex && hex.length >= 3) {
      const rStr = hex.length === 3 ? (hex.charAt(0) || '0') + (hex.charAt(0) || '0') : hex.substring(0, 2);
      const gStr = hex.length === 3 ? (hex.charAt(1) || '0') + (hex.charAt(1) || '0') : hex.substring(2, 4);
      const bStr = hex.length === 3 ? (hex.charAt(2) || '0') + (hex.charAt(2) || '0') : hex.substring(4, 6);
      const r = parseInt(rStr, 16);
      const g = parseInt(gStr, 16);
      const b = parseInt(bStr, 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128;
    }
  }
  return false;
};

// 색상 값을 가져오는 함수 (재귀적으로 var() 해결)
const resolveColorValue = (varName: string, visited = new Set<string>()): string => {
  if (typeof window === 'undefined') return '';
  if (visited.has(varName)) return ''; // 순환 참조 방지
  visited.add(varName);
  
  const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  
  // var() 참조인 경우 재귀적으로 해결
  if (value.startsWith('var(')) {
    const innerVar = value.match(/var\(([^)]+)\)/)?.[1];
    if (innerVar) {
      return resolveColorValue(innerVar.trim(), visited);
    }
  }
  
  return value || '';
};

// 색상 값을 가져오는 함수 (캐시 사용)
const getColorValue = (varName: string): string => {
  if (colorValues.value[varName]) {
    return colorValues.value[varName];
  }
  const value = resolveColorValue(varName);
  if (value) {
    colorValues.value[varName] = value;
  }
  return value;
};

onMounted(() => {
  // 모든 색상 값을 미리 계산
  nextTick(() => {
    // 모든 색상 그룹의 색상 값 미리 로드
    const allColors = [
      ...colorGroups.flatMap(g => g.colors),
      ...krdsColorGroups.flatMap(g => g.colors),
      ...variablesColorGroups.flatMap(g => g.colors),
    ];
    
    allColors.forEach(color => {
      const value = resolveColorValue(color.var);
      if (value) {
        colorValues.value[color.var] = value;
      }
    });
  });
});
</script>

<template>
  <div class="min-h-screen py-12 bg-white">
    <Container>
      <Heading level="h1" class="mb-4">Foundation - Color Palette</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        프로젝트에서 사용하는 모든 색상 팔레트입니다. figma-main.css, figma-token.css의 KRDS 색상과 main.css, variables.css의 색상을 비교할 수 있습니다.
      </p>

      <!-- 빠른 네비게이션 -->
      <div class="mb-12 flex flex-wrap gap-2">
        <a href="#figma-main" class="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
          Figma Main
        </a>
        <a href="#krds-colors" class="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
          KRDS Colors
        </a>
        <a href="#variables-colors" class="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium">
          Variables Colors
        </a>
      </div>

      <!-- Figma Main Colors -->
      <section id="figma-main" class="mb-16 scroll-mt-8">
        <Heading level="h2" class="mb-6 text-2xl font-bold">Figma Main Colors</Heading>
        <div class="space-y-12">
          <div
            v-for="group in colorGroups"
            :key="group.title"
            class="bg-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <h3 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span class="w-1 h-6 bg-blue-600 rounded"></span>
              {{ group.title }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              <div
                v-for="color in group.colors"
                :key="color.name"
                class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div
                  class="h-32 w-full relative group"
                  :style="{ backgroundColor: `var(${color.var})` }"
                >
                  <div
                    v-if="getColorValue(color.var)"
                    class="absolute bottom-2 left-2 right-2 px-2 py-1 rounded text-xs font-mono backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    :style="{
                      backgroundColor: isLightColor(getColorValue(color.var)) 
                        ? 'rgba(0, 0, 0, 0.7)' 
                        : 'rgba(255, 255, 255, 0.9)',
                      color: isLightColor(getColorValue(color.var)) ? '#fff' : '#000'
                    }"
                  >
                    {{ getColorValue(color.var).substring(0, 20) }}{{ getColorValue(color.var).length > 20 ? '...' : '' }}
                  </div>
                </div>
                <div class="p-3 space-y-1 bg-white">
                  <div class="text-sm font-semibold text-gray-900 truncate" :title="color.name">{{ color.name }}</div>
                  <div class="text-xs text-gray-500 font-mono break-all">{{ color.var }}</div>
                  <div v-if="getColorValue(color.var)" class="text-xs text-gray-600 font-mono truncate" :title="getColorValue(color.var)">
                    {{ getColorValue(color.var) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- KRDS Colors -->
      <section id="krds-colors" class="mb-16 scroll-mt-8">
        <Heading level="h2" class="mb-6 text-2xl font-bold">KRDS Colors (Figma Token)</Heading>
        <div class="space-y-12">
          <div
            v-for="group in krdsColorGroups"
            :key="group.title"
            class="bg-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <h3 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span class="w-1 h-6 bg-green-600 rounded"></span>
              {{ group.title }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              <div
                v-for="color in group.colors"
                :key="color.name"
                class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div
                  class="h-32 w-full relative group"
                  :style="{ backgroundColor: `var(${color.var})` }"
                >
                  <div
                    v-if="getColorValue(color.var)"
                    class="absolute bottom-2 left-2 right-2 px-2 py-1 rounded text-xs font-mono backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    :style="{
                      backgroundColor: isLightColor(getColorValue(color.var)) 
                        ? 'rgba(0, 0, 0, 0.7)' 
                        : 'rgba(255, 255, 255, 0.9)',
                      color: isLightColor(getColorValue(color.var)) ? '#fff' : '#000'
                    }"
                  >
                    {{ getColorValue(color.var).substring(0, 20) }}{{ getColorValue(color.var).length > 20 ? '...' : '' }}
                  </div>
                </div>
                <div class="p-3 space-y-1 bg-white">
                  <div class="text-sm font-semibold text-gray-900 truncate" :title="color.name">{{ color.name }}</div>
                  <div class="text-xs text-gray-500 font-mono break-all">{{ color.var }}</div>
                  <div v-if="getColorValue(color.var)" class="text-xs text-gray-600 font-mono truncate" :title="getColorValue(color.var)">
                    {{ getColorValue(color.var) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Variables.css Colors -->
      <section id="variables-colors" class="mb-16 scroll-mt-8">
        <Heading level="h2" class="mb-6 text-2xl font-bold">Variables.css Colors</Heading>
        <div class="space-y-12">
          <div
            v-for="group in variablesColorGroups"
            :key="group.title"
            class="bg-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <h3 class="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <span class="w-1 h-6 bg-purple-600 rounded"></span>
              {{ group.title }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
              <div
                v-for="color in group.colors"
                :key="color.name"
                class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div
                  class="h-32 w-full relative group"
                  :style="{ backgroundColor: `var(${color.var})` }"
                >
                  <div
                    v-if="getColorValue(color.var)"
                    class="absolute bottom-2 left-2 right-2 px-2 py-1 rounded text-xs font-mono backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    :style="{
                      backgroundColor: isLightColor(getColorValue(color.var)) 
                        ? 'rgba(0, 0, 0, 0.7)' 
                        : 'rgba(255, 255, 255, 0.9)',
                      color: isLightColor(getColorValue(color.var)) ? '#fff' : '#000'
                    }"
                  >
                    {{ getColorValue(color.var).substring(0, 20) }}{{ getColorValue(color.var).length > 20 ? '...' : '' }}
                  </div>
                </div>
                <div class="p-3 space-y-1 bg-white">
                  <div class="text-sm font-semibold text-gray-900 truncate" :title="color.name">{{ color.name }}</div>
                  <div class="text-xs text-gray-500 font-mono break-all">{{ color.var }}</div>
                  <div v-if="getColorValue(color.var)" class="text-xs text-gray-600 font-mono truncate" :title="getColorValue(color.var)">
                    {{ getColorValue(color.var) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  </div>
</template>

<style scoped>
/* 데스크톱 최적화 스타일 */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}

/* 스크롤 시 부드러운 이동 */
html {
  scroll-behavior: smooth;
}
</style>