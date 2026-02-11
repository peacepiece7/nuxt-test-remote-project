<!--
    Table.vue - 엔터프라이즈급 데이터 테이블 컴포넌트

    구조:
    ┌─────────────────────────────────────────────────┐
    │  .data-table-wrapper                            │
    │  ├─ <table>                                     │
    │  │  ├─ <thead> 헤더 (정렬 가능)                 │
    │  │  └─ <tbody>                                  │
    │  │     ├─ 로딩 상태                             │
    │  │     ├─ 빈 데이터 상태                        │
    │  │     └─ 데이터 행들                           │
    │  └─ 페이지네이션 슬롯                           │
    └─────────────────────────────────────────────────┘

    핵심 기능:
    - 컬럼 정의 기반 렌더링
    - 정렬 (sortable 컬럼)
    - 체크박스 선택 (selectable)
    - 커스텀 셀 슬롯
    - 로딩/빈 상태 UI
    - 웹 접근성 (ARIA)
-->

<script setup lang="ts" generic="T extends Record<string, any>">
    import { computed, ref, useId, watch } from "vue";
    import Checkbox from "@/components/hanui/Checkbox.vue";
    import Radio from "@/components/hanui/Radio.vue";
    import Pagination from "@/components/hanui/Pagination.vue";

    // 컬럼 정의 타입
    export interface TableColumn<T = any> {
        key?: string; // 데이터 키 (헤더 그룹은 생략 가능)
        label: string; // 헤더 라벨
        width?: string; // 컬럼 너비 (예: "120px", "20%")
        minWidth?: string; // 최소 너비
        align?: "left" | "center" | "right"; // 정렬
        sortable?: boolean; // 정렬 가능 여부
        formatter?: (value: any, row: T, index: number) => string; // 값 포맷터
        cellClass?: string; // 셀 추가 클래스
        headerClass?: string; // 헤더 추가 클래스
        colspan?: number; // 헤더 병합(가로)
        rowspan?: number; // 헤더 병합(세로)
        children?: TableColumn<T>[]; // 다중 헤더
    }

    // 정렬 상태 타입
    export interface SortState {
        key: string;
        order: "asc" | "desc";
    }

    interface TableProps {
        columns: TableColumn<T>[]; // 컬럼 정의
        data: T[]; // 데이터 배열
        rowKey?: string; // 행 고유 키 (기본: "id")
        loading?: boolean; // 로딩 상태
        selectionType?: "checkbox" | "radio"; // 선택 방식
        selectedRows?: T[]; // 선택된 행들 (v-model)
        emptyText?: string; // 빈 데이터 메시지
        hoverable?: boolean; // 행 호버 효과
        striped?: boolean; // 줄무늬 배경
        bordered?: boolean; // 테두리
        compact?: boolean; // 컴팩트 모드
        stickyHeader?: boolean; // 헤더 고정
        maxHeight?: string; // 최대 높이 (스크롤)
        addClass?: string; // 추가 클래스
        paginationCurrentPage?: number; // 페이지네이션 현재 페이지
        paginationTotalPages?: number; // 페이지네이션 총 페이지 수
        paginationSiblingCount?: number; // 페이지네이션 주변 표시 개수
        paginationShowFirstLast?: boolean; // 페이지네이션 처음/마지막 버튼
        paginationShowPreviousNext?: boolean; // 페이지네이션 이전/다음 버튼
        paginationLabels?: {
            first?: string;
            previous?: string;
            next?: string;
            last?: string;
            page?: string;
        };
        paginationClass?: string; // 페이지네이션 래퍼 클래스
    }

    interface TableEmits {
        (e: "update:selectedRows", rows: T[]): void;
        (e: "sort", sortState: SortState): void;
        (e: "rowClick", row: T, index: number): void;
        (e: "update:paginationCurrentPage", page: number): void;
        (e: "paginationPageChange", page: number): void;
    }

    const props = withDefaults(defineProps<TableProps>(), {
        rowKey: "id",
        loading: false,
        selectedRows: () => [],
        emptyText: "데이터가 없습니다.",
        hoverable: true,
        striped: false,
        bordered: true,
        compact: false,
        stickyHeader: false,
        maxHeight: undefined,
        addClass: "",
        paginationSiblingCount: 1,
        paginationShowFirstLast: true,
        paginationShowPreviousNext: true,
        paginationLabels: () => ({}),
    });

    const emit = defineEmits<TableEmits>();

    const instanceId = useId();
    const headerSelectionValue = "__all__";
    const hasSelection = computed(() => Boolean(props.selectionType));
    const selectionHeaderId = computed(() => `${instanceId}-selection`);
    const leafColumnCount = computed(() => headerMeta.value.totalLeafCount);
    const tableColumnCount = computed(() => Math.max(leafColumnCount.value, 1));
    const hasPagination = computed(
        () =>
            typeof props.paginationCurrentPage === "number" &&
            typeof props.paginationTotalPages === "number",
    );
    const shouldStickHeader = computed(() => Boolean(props.stickyHeader || props.maxHeight));

    // 정렬 상태
    const sortState = ref<SortState | null>(null);

    // 선택된 행 키 Set (성능 최적화)
    const selectedKeySet = computed(() => {
        return new Set(props.selectedRows.map(row => row[props.rowKey]));
    });
    const selectedRowKeys = computed(() =>
        props.selectedRows.map(row => row[props.rowKey])
    );
    const selectedRowKey = computed(() =>
        props.selectedRows.length > 0 ? props.selectedRows[0][props.rowKey] : undefined
    );

    // 전체 선택 상태
    const isAllSelected = computed(() => {
        if (props.data.length === 0) return false;
        return props.data.every(row => selectedKeySet.value.has(row[props.rowKey]));
    });

    // 일부 선택 상태 (indeterminate)
    const isIndeterminate = computed(() => {
        if (props.data.length === 0) return false;
        const selectedCount = props.data.filter(row => selectedKeySet.value.has(row[props.rowKey])).length;
        return selectedCount > 0 && selectedCount < props.data.length;
    });

    // 행 선택 여부
    const isRowSelected = (row: T): boolean => {
        return selectedKeySet.value.has(row[props.rowKey]);
    };

    // 전체 선택/해제
    const toggleAllSelection = () => {
        if (isAllSelected.value) {
            emit("update:selectedRows", []);
        } else {
            emit("update:selectedRows", [...props.data]);
        }
    };

    // 개별 행 선택/해제
    const toggleRowSelection = (row: T) => {
        const key = row[props.rowKey];
        if (props.selectionType === "radio") {
            emit("update:selectedRows", [row]);
            return;
        }
        if (selectedKeySet.value.has(key)) {
            emit(
                "update:selectedRows",
                props.selectedRows.filter(r => r[props.rowKey] !== key)
            );
        } else {
            emit("update:selectedRows", [...props.selectedRows, row]);
        }
    };

    // 정렬 토글
    const toggleSort = (column: TableColumn<T>) => {
        if (!column.sortable) return;

        let newOrder: "asc" | "desc" = "asc";

        if (sortState.value?.key === column.key) {
            newOrder = sortState.value.order === "asc" ? "desc" : "asc";
        }

        sortState.value = { key: column.key, order: newOrder };
        emit("sort", sortState.value);
    };

    type CellValueObject = {
        value: any;
        colspan?: number;
        rowspan?: number;
    };

    const isCellValueObject = (value: unknown): value is CellValueObject =>
        Boolean(value) &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        ("value" in (value as Record<string, unknown>) ||
            "colspan" in (value as Record<string, unknown>) ||
            "rowspan" in (value as Record<string, unknown>));

    const getRawCellValue = (row: T, column: TableColumn<T>) => {
        if (!column.key) return "";
        const raw = row[column.key];
        if (isCellValueObject(raw)) return raw.value;
        return raw;
    };

    // 셀 값 가져오기
    const getCellValue = (row: T, column: TableColumn<T>, index: number): string => {
        const value = getRawCellValue(row, column);

        if (column.formatter) {
            return column.formatter(value, row, index);
        }

        return value ?? "";
    };

    // 행 클릭 핸들러
    const handleRowClick = (row: T, index: number) => {
        emit("rowClick", row, index);
    };

    // 정렬 아이콘 상태
    const getSortIconState = (column: TableColumn<T>): "none" | "asc" | "desc" => {
        if (!column.sortable) return "none";
        if (sortState.value?.key !== column.key) return "none";
        return sortState.value.order;
    };

    const sortedData = computed(() => {
        if (!sortState.value) return props.data;

        const { key, order } = sortState.value;
        const direction = order === "asc" ? 1 : -1;

        const getComparableValue = (value: unknown) => {
            if (value === null || value === undefined) return "";
            if (typeof value === "number") return value;
            if (value instanceof Date) return value.getTime();

            const text = String(value).trim();
            const time = Date.parse(text);
            if (!Number.isNaN(time)) return time;
            return text;
        };

        const compare = (a: unknown, b: unknown) => {
            const left = getComparableValue(a);
            const right = getComparableValue(b);

            if (typeof left === "number" && typeof right === "number") {
                return left === right ? 0 : left > right ? 1 : -1;
            }

            return String(left).localeCompare(String(right), "ko", {
                numeric: true,
                sensitivity: "base",
            });
        };

        return [...props.data].sort((leftRow, rightRow) => {
            const leftValue = leftRow[key];
            const rightValue = rightRow[key];
            const leftRaw = isCellValueObject(leftValue) ? leftValue.value : leftValue;
            const rightRaw = isCellValueObject(rightValue) ? rightValue.value : rightValue;
            return compare(leftRaw, rightRaw) * direction;
        });
    });

    type HeaderRenderCell = {
        id: string;
        label: string;
        key?: string;
        sortable?: boolean;
        align?: "left" | "center" | "right";
        headerClass?: string;
        width?: string;
        minWidth?: string;
        colspan: number;
        rowspan: number;
        startIndex: number;
        endIndex: number;
        isLeaf: boolean;
    };

    const headerMeta = computed(() => {
        const nodes = props.columns ?? [];
        const rows: HeaderRenderCell[][] = [];
        const leafColumns: TableColumn<T>[] = [];
        const leafHeaderIdsByIndex: string[][] = [];

        const getDepth = (list: TableColumn<T>[]): number => {
            if (list.length === 0) return 0;
            return Math.max(
                ...list.map((node) =>
                    node.children && node.children.length > 0
                        ? 1 + getDepth(node.children)
                        : 1,
                ),
            );
        };

        const countLeaves = (node: TableColumn<T>): number => {
            if (node.children && node.children.length > 0) {
                return node.children.reduce((sum, child) => sum + countLeaves(child), 0);
            }
            return 1;
        };

        const maxDepth = getDepth(nodes);
        if (maxDepth === 0) {
            return {
                rows,
                leafColumns,
                leafHeaderIdsByIndex,
                totalLeafCount: 0,
            };
        }

        for (let i = 0; i < maxDepth; i += 1) rows.push([]);

        let headerIdCounter = 0;
        let leafIndex = 0;

        const traverse = (
            node: TableColumn<T>,
            depth: number,
            startIndex: number,
            parentIds: string[],
        ): number => {
            const hasChildren = Boolean(node.children && node.children.length > 0);
            const leafCount = hasChildren ? countLeaves(node) : 1;
            const colspan = Math.max(1, node.colspan ?? leafCount);
            const rowspan = Math.max(
                1,
                node.rowspan ?? (hasChildren ? 1 : maxDepth - depth),
            );
            const id = `${instanceId}-th-${headerIdCounter++}`;
            const cell: HeaderRenderCell = {
                id,
                label: node.label,
                key: node.key,
                sortable: node.sortable,
                align: node.align,
                headerClass: node.headerClass,
                width: node.width,
                minWidth: node.minWidth,
                colspan,
                rowspan,
                startIndex,
                endIndex: startIndex + leafCount - 1,
                isLeaf: !hasChildren,
            };

            rows[depth].push(cell);

            const nextParentIds = [...parentIds, id];

            if (hasChildren) {
                let childStart = startIndex;
                node.children!.forEach((child) => {
                    const usedLeaves = traverse(child, depth + 1, childStart, nextParentIds);
                    childStart += usedLeaves;
                });
            } else if (node.key) {
                leafColumns.push(node);
                leafHeaderIdsByIndex[leafIndex] = nextParentIds;
                leafIndex += 1;
            }

            return leafCount;
        };

        let start = 0;
        nodes.forEach((node) => {
            const used = traverse(node, 0, start, []);
            start += used;
        });

        return {
            rows,
            leafColumns,
            leafHeaderIdsByIndex,
            totalLeafCount: leafIndex,
        };
    });

    const normalizedBodyRows = computed(() => {
        const data = sortedData.value;
        const columns = headerMeta.value.leafColumns;
        const headerIdsByIndex = headerMeta.value.leafHeaderIdsByIndex;
        const colCount = columns.length;
        const skipMap = Array.from({ length: colCount }, () => 0);

        const getHeadersForSpan = (startIndex: number, span: number) => {
            const ids = new Set<string>();
            for (let i = startIndex; i < startIndex + span; i += 1) {
                (headerIdsByIndex[i] || []).forEach((id) => ids.add(id));
            }
            return Array.from(ids).join(" ");
        };

        return data.map((row, rowIndex) => {
            const cells: Array<{
                column: TableColumn<T>;
                colSpan: number;
                rowSpan: number;
                headers: string;
                displayValue: string;
                colIndex: number;
            }> = [];

            let colIndex = 0;
            while (colIndex < colCount) {
                if (skipMap[colIndex] > 0) {
                    skipMap[colIndex] -= 1;
                    colIndex += 1;
                    continue;
                }

                const column = columns[colIndex];
                if (!column || !column.key) {
                    colIndex += 1;
                    continue;
                }

                const raw = row[column.key];
                const cellData = isCellValueObject(raw)
                    ? raw
                    : { value: raw, colspan: 1, rowspan: 1 };

                const colSpan = Math.max(1, Math.min(cellData.colspan ?? 1, colCount - colIndex));
                const rowSpan = Math.max(1, cellData.rowspan ?? 1);

                if (rowSpan > 1) {
                    for (let i = 0; i < colSpan; i += 1) {
                        skipMap[colIndex + i] = Math.max(skipMap[colIndex + i], rowSpan - 1);
                    }
                }

                const headers = getHeadersForSpan(colIndex, colSpan);

                cells.push({
                    column,
                    colSpan,
                    rowSpan,
                    headers,
                    displayValue: getCellValue(row, column, rowIndex),
                    colIndex,
                });

                colIndex += colSpan;
            }

            return { row, index: rowIndex, cells };
        });
    });

    // 정렬 상태 초기화 (외부에서 데이터 변경 시)
    watch(
        () => props.data,
        () => {
            // 필요시 정렬 상태 유지 또는 초기화 로직
        }
    );
</script>

<template>
    <div
        :class="['data-table-wrapper w-full', addClass, bordered ? 'border-t-2 border-krds-gray-90' : 'border-t border-transparent']"
        :style="maxHeight ? { maxHeight, overflow: 'auto' } : undefined"
    >
        <!-- aria-busy: 로딩 상태 전달 -->
        <table
            class="w-full border-collapse"
            :class="[loading && 'pointer-events-none']"
            :aria-busy="loading"
            :aria-rowcount="data.length"
        >
            <!-- 테이블 헤더 -->
            <thead class="bg-krds-gray-10" :class="[shouldStickHeader && 'sticky top-0 z-10']">
                <tr v-for="(headerRow, rowIndex) in headerMeta.rows" :key="`header-row-${rowIndex}`">
                    <!-- 선택 컬럼 -->
                    <th
                        v-if="rowIndex === 0 && selectionType === 'checkbox'"
                        :id="selectionHeaderId"
                        class="h-14 min-h-14 px-4 text-center border-b border-l border-r border-krds-gray-30"
                        :class="[compact && 'h-auto min-h-0 py-2']"
                        scope="col"
                        :rowspan="headerMeta.rows.length"
                    >
                        <Checkbox
                            :model-value="isAllSelected ? [headerSelectionValue] : []"
                            :value="{ value: headerSelectionValue, label: '전체 선택' }"
                            name="data-table-select-all"
                            :indeterminate="isIndeterminate"
                            :disabled="data.length === 0"
                            @update:modelValue="toggleAllSelection"
                        />
                    </th>
                    <th
                        v-else-if="rowIndex === 0 && selectionType === 'radio'"
                        :id="selectionHeaderId"
                        class="h-14 min-h-14 px-4 text-center border-b border-l border-r border-krds-gray-30"
                        :class="[compact && 'h-auto min-h-0 py-2']"
                        scope="col"
                        :rowspan="headerMeta.rows.length"
                    />

                    <!-- 데이터 컬럼 헤더 -->
                    <th
                        v-for="cell in headerRow"
                        :key="cell.id"
                        :id="cell.id"
                        class="h-14 min-h-14 px-4 text-base font-semibold text-krds-gray-90 border-b border-krds-gray-30 tracking-[-0.32px] leading-[1.5]"
                        :class="[
                            cell.startIndex === 0 && 'border-l border-krds-gray-30',
                            cell.endIndex < headerMeta.totalLeafCount - 1 && 'border-r',
                            cell.endIndex === headerMeta.totalLeafCount - 1 && 'border-r border-krds-gray-30',
                            cell.align === 'center' && 'text-center',
                            cell.align === 'right' && 'text-right',
                            cell.align !== 'center' && cell.align !== 'right' && 'text-center',
                            compact && 'h-auto min-h-0 py-2 px-3',
                            cell.headerClass
                        ]"
                        :style="{
                            width: cell.width,
                            minWidth: cell.minWidth
                        }"
                        scope="col"
                        :colspan="cell.colspan"
                        :rowspan="cell.rowspan"
                        :aria-sort="
                            cell.sortable && cell.key
                                ? sortState?.key === cell.key
                                    ? sortState.order === 'asc'
                                        ? 'ascending'
                                        : 'descending'
                                    : 'none'
                                : undefined
                        "
                    >
                        <button
                            v-if="cell.sortable && cell.key"
                            type="button"
                            class="flex h-full w-full items-center gap-1.5 transition-colors hover:bg-[#E8EAED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            :class="[
                                cell.align === 'center' && 'justify-center',
                                cell.align === 'right' && 'justify-end',
                                cell.align !== 'center' && cell.align !== 'right' && 'justify-center'
                            ]"
                            @click="toggleSort(cell as TableColumn<T>)"
                        >
                            <span>{{ cell.label }}</span>

                            <!-- 정렬 아이콘 -->
                            <span class="inline-flex flex-col gap-0.5" aria-hidden="true">
                                <svg
                                    class="w-2.5 h-2.5 transition-colors"
                                    :class="[
                                        getSortIconState(cell as TableColumn<T>) === 'asc' ? 'text-krds-primary' : 'text-krds-gray-40'
                                    ]"
                                    viewBox="0 0 10 6"
                                    fill="currentColor"
                                >
                                    <path d="M5 0L10 6H0L5 0Z" />
                                </svg>
                                <svg
                                    class="w-2.5 h-2.5 transition-colors"
                                    :class="[
                                        getSortIconState(cell as TableColumn<T>) === 'desc' ? 'text-krds-primary' : 'text-krds-gray-40'
                                    ]"
                                    viewBox="0 0 10 6"
                                    fill="currentColor"
                                >
                                    <path d="M5 6L0 0H10L5 6Z" />
                                </svg>
                            </span>
                        </button>
                        <div
                            v-else
                            class="flex items-center gap-1.5"
                            :class="[
                                cell.align === 'center' && 'justify-center',
                                cell.align === 'right' && 'justify-end',
                                cell.align !== 'center' && cell.align !== 'right' && 'justify-center'
                            ]"
                        >
                            <span>{{ cell.label }}</span>
                        </div>
                    </th>
                </tr>
            </thead>

            <!-- 테이블 바디 -->
            <tbody>
                <!-- 로딩 상태 -->
                <tr v-if="loading">
                    <td
                        :colspan="hasSelection ? tableColumnCount + 1 : tableColumnCount"
                        class="px-4 py-12 text-center bg-white"
                    >
                        <div class="flex flex-col items-center gap-3">
                            <svg
                                class="w-8 h-8 text-krds-primary animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="3"
                                />
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            <span class="text-krds-body-sm text-krds-gray-60">데이터를 불러오는 중...</span>
                        </div>
                    </td>
                </tr>

                <!-- 빈 데이터 상태 -->
                    <tr v-else-if="data.length === 0">
                    <td
                        :colspan="hasSelection ? tableColumnCount + 1 : tableColumnCount"
                        class="px-4 py-12 text-center bg-white"
                    >
                        <div class="flex flex-col items-center gap-3">
                            <svg
                                class="w-12 h-12 text-krds-gray-30"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.5"
                                aria-hidden="true"
                            >
                                <path
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            <span class="text-krds-body-sm text-krds-gray-60">{{ emptyText }}</span>
                        </div>

                        <p class="sr-only" aria-live="polite">{{ emptyText }}</p>

                        <!-- 빈 상태 커스텀 슬롯 -->
                        <slot name="empty" />
                    </td>
                </tr>

                <!-- 데이터 행 -->
                <template v-else>
                    <tr
                        v-for="rowItem in normalizedBodyRows"
                        :key="rowItem.row[rowKey] ?? rowItem.index"
                        class="transition-colors bg-white"
                        :class="[
                            hoverable && 'hover:bg-[#F9FAFB]',
                            striped && rowItem.index % 2 === 1 && 'bg-[#F9FAFB]'
                        ]"
                        :tabindex="hasSelection ? 0 : undefined"
                        :aria-selected="hasSelection ? isRowSelected(rowItem.row) : undefined"
                        @click="handleRowClick(rowItem.row, rowItem.index)"
                        @keydown.enter.prevent="hasSelection ? toggleRowSelection(rowItem.row) : undefined"
                        @keydown.space.prevent="hasSelection ? toggleRowSelection(rowItem.row) : undefined"
                    >
                        <!-- 체크박스 셀 -->
                        <td
                            v-if="selectionType === 'checkbox'"
                            class="h-14 min-h-14 px-4 text-center border-b border-l border-r border-[#D0D4D9]"
                            :class="[
                                compact && 'h-auto min-h-0 py-2',
                                isRowSelected(rowItem.row) && 'bg-krds-primary-5'
                            ]"
                            :headers="selectionHeaderId"
                            @click.stop
                        >
                            <Checkbox
                                :model-value="selectedRowKeys"
                                :value="{ value: rowItem.row[rowKey], label: `${rowItem.row[rowKey]} 선택` }"
                                name="data-table-select-row"
                                @update:modelValue="() => toggleRowSelection(rowItem.row)"
                            />
                        </td>
                        <td
                            v-else-if="selectionType === 'radio'"
                            class="h-14 min-h-14 px-4 text-center border-b border-l border-r border-[#D0D4D9]"
                            :class="[
                                compact && 'h-auto min-h-0 py-2',
                                isRowSelected(rowItem.row) && 'bg-krds-primary-5'
                            ]"
                            :headers="selectionHeaderId"
                            @click.stop
                        >
                            <Radio
                                :model-value="selectedRowKey"
                                :value="{ value: rowItem.row[rowKey], label: `${rowItem.row[rowKey]} 선택` }"
                                name="data-table-select-row"
                                @update:modelValue="() => toggleRowSelection(rowItem.row)"
                            />
                        </td>

                        <!-- 데이터 셀 -->
                        <td
                            v-for="cell in rowItem.cells"
                            :key="`${cell.column.key}-${cell.colIndex}`"
                            class="h-14 min-h-14 px-4 text-base text-krds-gray-80 border-b border-krds-gray-30 tracking-[-0.32px] leading-[1.5]"
                            :class="[
                                cell.colIndex === 0 && 'border-l border-krds-gray-30',
                                cell.colIndex + cell.colSpan - 1 < leafColumnCount - 1 && 'border-r',
                                cell.colIndex + cell.colSpan - 1 === leafColumnCount - 1 && 'border-r border-krds-gray-30',
                                (!cell.column.align || cell.column.align === 'center') && 'text-center',
                                cell.column.align === 'right' && 'text-right',
                                cell.column.align === 'left' && 'text-left',
                                compact && 'h-auto min-h-0 py-2 px-3',
                                isRowSelected(rowItem.row) && 'bg-krds-primary-5',
                                cell.column.cellClass
                            ]"
                            :colspan="cell.colSpan"
                            :rowspan="cell.rowSpan"
                            :headers="cell.headers"
                        >
                            <!-- 셀 슬롯 (커스텀 렌더링) -->
                            <slot
                                :name="`cell-${cell.column.key}`"
                                :value="rowItem.row[cell.column.key as string]"
                                :row="rowItem.row"
                                :index="rowItem.index"
                                :column="cell.column"
                            >
                                {{ cell.displayValue }}
                            </slot>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <!-- 하단 슬롯 (페이지네이션 등) -->
    <Pagination
    class="mt-10"
        v-if="hasPagination"
        :current-page="paginationCurrentPage!"
        :total-pages="paginationTotalPages!"
        :sibling-count="paginationSiblingCount"
        :show-first-last="paginationShowFirstLast"
        :show-previous-next="paginationShowPreviousNext"
        :labels="paginationLabels"
        :class="paginationClass"
        @update:currentPage="(page) => emit('update:paginationCurrentPage', page)"
        @pageChange="(page) => emit('paginationPageChange', page)"
    />
    <slot name="footer" />
</template>

<style scoped>
    /* 스크롤바 스타일 */
    .data-table-wrapper::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    .data-table-wrapper::-webkit-scrollbar-track {
        background: var(--krds-color-light-gray-5);
    }

    .data-table-wrapper::-webkit-scrollbar-thumb {
        background: var(--krds-color-light-gray-30);
        border-radius: 3px;
    }

    .data-table-wrapper::-webkit-scrollbar-thumb:hover {
        background: var(--krds-color-light-gray-50);
    }
</style>
