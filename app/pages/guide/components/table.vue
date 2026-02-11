<script setup lang="ts">
  import { ref } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import Table from '@/components/hanui/Table.vue'
  import Button from '@/components/hanui/Button.vue'
  import Input from '@/components/hanui/Input.vue'
  import type { TableColumn } from '@/components/hanui/Table.vue'

  useHead({
    title: 'Table - 가이드',
  })

  type MemberRow = {
    id: number
    name: string
    department: string
    role: string
    status: string
    joinedAt: string
  }

  type MergeCell = {
    value: string
    colspan?: number
    rowspan?: number
  }

  type MergeRow = {
    id: number
    name: string | MergeCell
    department: string | MergeCell
    role: string | MergeCell
    status: string | MergeCell
    joinedAt: string | MergeCell
  }

  type ScrollRow = {
    id: number
    name: string
    department: string
    role: string
    status: string
    joinedAt: string
  }

  type WideRow = {
    id: number
    name: string
    department: string
    role: string
    status: string
    joinedAt: string
    phone: string
    email: string
    location: string
    note: string
  }

  const basicColumns: TableColumn<MemberRow>[] = [
    { key: 'name', label: '이름'},
    { key: 'department', label: '부서' },
    { key: 'role', label: '직무' },
    { key: 'status', label: '상태' },
    { key: 'joinedAt', label: '입사일', align: 'right' },
  ]

  const sortableColumns: TableColumn<MemberRow>[] = [
    { key: 'name', label: '이름', align: 'left', sortable: true },
    { key: 'department', label: '부서', sortable: true },
    { key: 'role', label: '직무' },
    { key: 'status', label: '상태', sortable: true },
    { key: 'joinedAt', label: '입사일', align: 'right', sortable: true },
  ]

  const rows = ref<MemberRow[]>([
    {
      id: 1001,
      name: '김하늬',
      department: '기획',
      role: 'PM',
      status: '재직',
      joinedAt: '2022-01-15',
    },
    {
      id: 1002,
      name: '이도현',
      department: '디자인',
      role: 'UI/UX',
      status: '재직',
      joinedAt: '2021-11-02',
    },
    {
      id: 1003,
      name: '박지수',
      department: '개발',
      role: 'Frontend',
      status: '휴직',
      joinedAt: '2020-05-20',
    },
    {
      id: 1004,
      name: '최민준',
      department: '개발',
      role: 'Backend',
      status: '재직',
      joinedAt: '2019-08-11',
    },
  ])

  const scrollRows = ref<ScrollRow[]>(
    Array.from({ length: 18 }, (_, index) => ({
      id: 4000 + index,
      name: `직원 ${index + 1}`,
      department: index % 2 === 0 ? '기획' : '개발',
      role: index % 3 === 0 ? 'PM' : 'Frontend',
      status: index % 4 === 0 ? '휴직' : '재직',
      joinedAt: `2021-0${(index % 9) + 1}-15`,
    })),
  )

  const selectedRows = ref<MemberRow[]>([])
  const radioSelectedRows = ref<MemberRow[]>([])
  const emptyRows = ref<MemberRow[]>([])
  const isLoading = ref(true)
  const memoById = ref<Record<number, string>>(
    Object.fromEntries(rows.value.map((row) => [row.id, ''])),
  )
  const page = ref(1)
  const totalPage = ref(12)

  const groupedColumns: TableColumn<MergeRow>[] = [
    {
      label: '인적 정보',
      children: [
        { key: 'name', label: '이름', align: 'left' },
        { key: 'department', label: '부서' },
      ],
    },
    {
      label: '근무 정보',
      children: [
        { key: 'role', label: '직무' },
        { key: 'status', label: '상태' },
      ],
    },
    { key: 'joinedAt', label: '입사일', align: 'right' },
  ]

  const mergeRows = ref<MergeRow[]>([
    {
      id: 2001,
      name: { value: '김하늬', rowspan: 2 },
      department: '기획',
      role: 'PM',
      status: '재직',
      joinedAt: '2022-01-15',
    },
    {
      id: 2002,
      name: '',
      department: '운영',
      role: '지원',
      status: '재직',
      joinedAt: '2022-03-10',
    },
    {
      id: 2003,
      name: '이도현',
      department: '디자인',
      role: { value: '직무+상태 통합', colspan: 2 },
      status: '',
      joinedAt: '2021-11-02',
    },
  ])

  const singleHeaderColumns: TableColumn<MergeRow>[] = [
    { key: 'name', label: '이름', align: 'left' },
    { key: 'department', label: '부서' },
    { key: 'role', label: '직무' },
    { key: 'status', label: '상태' },
    { key: 'joinedAt', label: '입사일', align: 'right' },
  ]

  const bodyRowspanRows = ref<MergeRow[]>([
    {
      id: 3001,
      name: { value: '박지수', rowspan: 3 },
      department: '개발',
      role: 'Frontend',
      status: '재직',
      joinedAt: '2020-05-20',
    },
    {
      id: 3002,
      name: '',
      department: '개발',
      role: 'Backend',
      status: '재직',
      joinedAt: '2021-01-12',
    },
    {
      id: 3003,
      name: '',
      department: '개발',
      role: 'Infra',
      status: '휴직',
      joinedAt: '2021-07-08',
    },
  ])

  const bodyColspanRows = ref<MergeRow[]>([
    {
      id: 3101,
      name: '최민준',
      department: '개발',
      role: { value: '직무 + 상태 통합', colspan: 2 },
      status: '',
      joinedAt: '2019-08-11',
    },
    {
      id: 3102,
      name: '이도현',
      department: '디자인',
      role: 'UI/UX',
      status: '재직',
      joinedAt: '2021-11-02',
    },
  ])

  const fullMergeColumns: TableColumn<MergeRow>[] = [
    {
      label: '기본 정보',
      children: [
        { key: 'name', label: '이름', align: 'left' },
        { key: 'department', label: '부서' },
      ],
    },
    {
      label: '근무 정보',
      children: [
        { key: 'role', label: '직무' },
        { key: 'status', label: '상태' },
      ],
    },
    { key: 'joinedAt', label: '입사일', align: 'right' },
  ]

  const fullMergeRows = ref<MergeRow[]>([
    {
      id: 3201,
      name: { value: '김하늬', rowspan: 2 },
      department: '기획',
      role: { value: '직무 + 상태 통합', colspan: 2 },
      status: '',
      joinedAt: '2022-01-15',
    },
    {
      id: 3202,
      name: '',
      department: '운영',
      role: '지원',
      status: '재직',
      joinedAt: '2022-03-10',
    },
  ])

  const scrollColumns: TableColumn<ScrollRow>[] = [
    { key: 'name', label: '이름' },
    { key: 'department', label: '부서' },
    { key: 'role', label: '직무' },
    { key: 'status', label: '상태' },
    { key: 'joinedAt', label: '입사일', align: 'right' },
  ]

  const wideColumns: TableColumn<WideRow>[] = [
    { key: 'name', label: '이름' },
    { key: 'department', label: '부서' },
    { key: 'role', label: '직무' },
    { key: 'status', label: '상태' },
    { key: 'joinedAt', label: '입사일' },
    { key: 'phone', label: '연락처' },
    { key: 'email', label: '이메일' },
    { key: 'location', label: '근무지' },
    { key: 'note', label: '비고' },
  ]

  const wideRows = ref<WideRow[]>([
    {
      id: 5001,
      name: '김하늬',
      department: '기획',
      role: 'PM',
      status: '재직',
      joinedAt: '2022-01-15',
      phone: '010-1234-5678',
      email: 'hanei@example.com',
      location: '서울',
      note: '신규 서비스',
    },
    {
      id: 5002,
      name: '이도현',
      department: '디자인',
      role: 'UI/UX',
      status: '재직',
      joinedAt: '2021-11-02',
      phone: '010-2222-3333',
      email: 'dohyun@example.com',
      location: '세종',
      note: '리브랜딩',
    },
  ])
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Table</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        컬럼 정의와 데이터 배열로 구성하는 테이블 컴포넌트입니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
          <Table
          @row-click="(a) => { console.log('row-click', a) }"
            :columns="basicColumns"
            :data="rows"
          />
        <Card variant="filled" padding="lg">
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li><code class="bg-krds-gray-5 rounded px-1">columns</code>로 컬럼 구조를 정의합니다.</li>
            <li><code class="bg-krds-gray-5 rounded px-1">data</code>는 행 데이터 배열입니다.</li>
          </ul>
        </Card>
      </div>

      <!-- 선택 가능한 테이블 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">행 선택</Heading>
          <Table
            :columns="basicColumns"
            :data="rows"
            selection-type="checkbox"
            v-model:selected-rows="selectedRows"
          />
          <Table
            :columns="basicColumns"
            :data="rows"
            selection-type="radio"
            v-model:selected-rows="radioSelectedRows"
          />
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">v-model:selected-rows</code>로 선택 상태를 제어합니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            단일 선택은 <code class="bg-krds-gray-5 rounded px-1">selectionType="radio"</code>,
            체크박스 선택은 <code class="bg-krds-gray-5 rounded px-1">selectionType="checkbox"</code>로 설정합니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            선택 기능이 필요 없으면 <code class="bg-krds-gray-5 rounded px-1">selectionType</code>을 지정하지 않습니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            이 경우 <code class="bg-krds-gray-5 rounded px-1">selectedRows</code>는 사용되지 않습니다.
          </p>
        </Card>
      </div>

      <!-- 정렬 가능한 테이블 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">정렬</Heading>
          <Table
            :columns="sortableColumns"
            :data="rows"
            @sort="() => {}"
          />
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">sortable</code> 컬럼을 클릭하면
            <code class="bg-krds-gray-5 rounded px-1">sort</code> 이벤트가 발생합니다.
          </p>
        </Card>
      </div>

      <!-- 상태 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">상태</Heading>
        <Card variant="outlined" padding="lg" class="mb-4 space-y-6">
          <div>
            <Heading level="h3" class="mb-4 text-lg">로딩</Heading>
            <Table
              :columns="basicColumns"
              :data="rows"
              :loading="isLoading"
            />
          </div>
          <div>
            <Heading level="h3" class="mb-4 text-lg">빈 데이터</Heading>
            <Table
              :columns="basicColumns"
              :data="emptyRows"
              empty-text="등록된 데이터가 없습니다."
            />
          </div>
        </Card>
      </div>

      <!-- 페이지네이션 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">페이지네이션</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Table
            :columns="basicColumns"
            :data="rows"
            :pagination-current-page="page"
            :pagination-total-pages="totalPage"
            @update:paginationCurrentPage="(next) => (page = next)"
          />
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-gray-70 text-sm">
            페이지네이션을 사용하려면
            <code class="bg-krds-gray-5 rounded px-1">paginationCurrentPage</code>와
            <code class="bg-krds-gray-5 rounded px-1">paginationTotalPages</code>를 전달합니다.
          </p>
        </Card>
      </div>

      <!-- 스크롤 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">스크롤</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Heading level="h3" class="mb-4 text-lg">수직 스크롤</Heading>
          <Table
            :columns="scrollColumns"
            :data="scrollRows"
            max-height="240px"
          />
        </Card>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Heading level="h3" class="mb-4 text-lg">수평 스크롤</Heading>
          <div class="overflow-x-auto">
            <Table
              :columns="wideColumns"
              :data="wideRows"
              add-class="min-w-[900px]"
            />
          </div>
        </Card>
        <Card variant="filled" padding="lg" class="space-y-2">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">maxHeight</code>로 높이를 제한하면
            수직 스크롤이 적용됩니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            가로 스크롤은 래퍼에 <code class="bg-krds-gray-5 rounded px-1">overflow-x-auto</code>를 적용하고
            테이블에 최소 폭을 지정합니다.
          </p>
        </Card>
      </div>

      <!-- 커스텀 셀 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">커스텀 셀</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Table
            :columns="basicColumns"
            :data="rows"
          >
            <template #cell-status="{ value }">
              <span
                class="inline-flex rounded-full px-2 py-1 text-xs"
                :class="value === '재직' ? 'bg-krds-primary-5 text-primary-600' : 'bg-krds-gray-10 text-krds-gray-70'"
              >
                {{ value }}
              </span>
            </template>
          </Table>
        </Card>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Table
            :columns="basicColumns"
            :data="rows"
          >
            <template #cell-name="{ value, row }">
              <div class="inline-flex items-center gap-2">
                <span class="text-krds-gray-80">{{ value }}</span>
                <Input
                  v-model="memoById[row.id]"
                  size="md"
                  placeholder="메모"
                  class="max-w-[160px]"
                />
              </div>
            </template>
            <template #cell-status="{ value }">
              <div class="inline-flex items-center gap-2">
                <span class="text-krds-gray-80">{{ value }}</span>
                <Button variant="outline" size="xs">상세</Button>
              </div>
            </template>
          </Table>
        </Card>
        <Card variant="filled" padding="lg" class="space-y-2">
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">cell-컬럼키</code> 슬롯으로 셀 렌더링을 커스텀할 수 있습니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            슬롯이 없으면 기본 렌더링으로 <code class="bg-krds-gray-5 rounded px-1">getCellValue</code> 결과가 표시됩니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            슬롯 인자: <code class="bg-krds-gray-5 rounded px-1">value</code>,
            <code class="bg-krds-gray-5 rounded px-1">row</code>,
            <code class="bg-krds-gray-5 rounded px-1">index</code>,
            <code class="bg-krds-gray-5 rounded px-1">column</code>
          </p>
        </Card>
      </div>

      <!-- 병합 예시 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">병합 예시</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Heading level="h3" class="mb-4 text-lg">다중 헤더 (colspan/rowspan)</Heading>
          <Table
            :columns="groupedColumns"
            :data="mergeRows"
          />
        </Card>
        <Card variant="filled" padding="lg" class="space-y-2">
          <p class="text-krds-gray-70 text-sm">
            헤더에 <code class="bg-krds-gray-5 rounded px-1">children</code>을 정의하면 다중 헤더 행이 생성됩니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            헤더 병합은 <code class="bg-krds-gray-5 rounded px-1">colspan</code>,
            <code class="bg-krds-gray-5 rounded px-1">rowspan</code>으로 제어합니다.
          </p>
        </Card>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Heading level="h3" class="mb-4 text-lg">바디 병합 - rowspan</Heading>
          <Table
            :columns="singleHeaderColumns"
            :data="bodyRowspanRows"
          />
        </Card>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Heading level="h3" class="mb-4 text-lg">바디 병합 - colspan</Heading>
          <Table
            :columns="singleHeaderColumns"
            :data="bodyColspanRows"
          />
        </Card>
        <Card variant="outlined" padding="lg" class="mb-4">
          <Heading level="h3" class="mb-4 text-lg">헤더 + 바디 병합 조합</Heading>
          <Table
            :columns="fullMergeColumns"
            :data="fullMergeRows"
          />
        </Card>
        <Card variant="filled" padding="lg" class="space-y-2">
          <p class="text-krds-gray-70 text-sm">
            셀 값에 <code class="bg-krds-gray-5 rounded px-1">{{ '{ value, colspan, rowspan }' }}</code> 형태를 사용하면
            바디 병합이 적용됩니다.
          </p>
          <p class="text-krds-gray-70 text-sm">
            <code class="bg-krds-gray-5 rounded px-1">rowspan</code>으로 가려진 셀은 자동으로 숨김 처리됩니다.
          </p>
        </Card>
      </div>

      <!-- Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-krds-gray-10">
                  <th class="py-3 px-4 font-bold">Prop</th>
                  <th class="py-3 px-4 font-bold">Type</th>
                  <th class="py-3 px-4 font-bold">Default</th>
                  <th class="py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">columns</td>
                  <td class="py-3 px-4">TableColumn[]</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">컬럼 정의</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">data</td>
                  <td class="py-3 px-4">T[]</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">행 데이터 배열</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">rowKey</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">"id"</td>
                  <td class="py-3 px-4">행 고유 키 필드</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">loading</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">로딩 상태 표시</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">selectionType</td>
                  <td class="py-3 px-4">"checkbox" | "radio"</td>
                  <td class="py-3 px-4">undefined</td>
                  <td class="py-3 px-4">선택 방식</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">selectedRows</td>
                  <td class="py-3 px-4">T[]</td>
                  <td class="py-3 px-4">[]</td>
                  <td class="py-3 px-4">선택된 행 (v-model)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">emptyText</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">"데이터가 없습니다."</td>
                  <td class="py-3 px-4">빈 데이터 메시지</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">hoverable</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">true</td>
                  <td class="py-3 px-4">행 hover 효과</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">striped</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">줄무늬 배경</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">bordered</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">true</td>
                  <td class="py-3 px-4">테이블 테두리</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">compact</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">컴팩트 모드</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">stickyHeader</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">false</td>
                  <td class="py-3 px-4">헤더 고정</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">maxHeight</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">최대 높이 (스크롤)</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">addClass</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">""</td>
                  <td class="py-3 px-4">추가 클래스</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">paginationCurrentPage</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">페이지네이션 현재 페이지</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">paginationTotalPages</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">페이지네이션 총 페이지 수</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">paginationSiblingCount</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">1</td>
                  <td class="py-3 px-4">페이지네이션 주변 표시 개수</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">paginationShowFirstLast</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">true</td>
                  <td class="py-3 px-4">처음/마지막 버튼 표시</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">paginationShowPreviousNext</td>
                  <td class="py-3 px-4">boolean</td>
                  <td class="py-3 px-4">true</td>
                  <td class="py-3 px-4">이전/다음 버튼 표시</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">paginationLabels</td>
                  <td class="py-3 px-4">object</td>
                  <td class="py-3 px-4">{}</td>
                  <td class="py-3 px-4">페이지네이션 라벨 문구 재정의</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">paginationClass</td>
                  <td class="py-3 px-4">string</td>
                  <td class="py-3 px-4">-</td>
                  <td class="py-3 px-4">페이지네이션 래퍼 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <!-- Pagination Events -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Pagination Events</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-krds-gray-10">
                  <th class="py-3 px-4 font-bold">Event</th>
                  <th class="py-3 px-4 font-bold">Payload</th>
                  <th class="py-3 px-4 font-bold">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">update:paginationCurrentPage</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">페이지네이션 현재 페이지 변경</td>
                </tr>
                <tr class="border-b border-krds-gray-5">
                  <td class="py-3 px-4 font-mono text-krds-primary-60">paginationPageChange</td>
                  <td class="py-3 px-4">number</td>
                  <td class="py-3 px-4">페이지 변경 시 호출</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
