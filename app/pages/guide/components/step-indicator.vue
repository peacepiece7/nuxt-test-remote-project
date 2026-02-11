<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import RequestStepper from '@/components/molecules/RequestStepper.vue'
  import StatusStepper from '@/components/molecules/StatusStepper.vue'
  import ProgressIndicator from '@/components/molecules/ProgressIndicator.vue'
  import type { RequestStep } from '~/components/molecules/RequestStepper.vue'
  import type { StatusStep } from '~/components/molecules/StatusStepper.vue'
  import type { ProgressStep } from '~/components/molecules/ProgressIndicator.vue'

  useHead({
    title: 'Step Indicator - 가이드',
  })

  // RequestStepper 예제 데이터
  const requestSteps = ref<RequestStep[]>([
    { step: 1, title: '신청 정보' },
    { step: 2, title: '등록 지역' },
    { step: 3, title: '서류 첨부' },
    { step: 4, title: '정보 확인' },
    { step: 5, title: '신청서 첨부' },
    { step: 6, title: '완료' },
  ])
  const requestCurrentStep = ref(0)

  // RequestStepper disabledIndices 예제 데이터
  const requestStepsWithDisabled = ref<RequestStep[]>([
    { step: 1, title: '신청 정보' },
    { step: 2, title: '등록 지역' },
    { step: 3, title: '서류 첨부' },
    { step: 4, title: '정보 확인' },
    { step: 5, title: '신청서 첨부' },
    { step: 6, title: '완료' },
  ])
  const requestCurrentStepWithDisabled = ref(0)
  // 첫 번째(인덱스 0)와 마지막(인덱스 5) 스텝을 클릭 불가능하게 설정
  const requestDisabledIndices = [0, 5]

  // StatusStepper 예제 데이터
  const statusSteps = ref<StatusStep[]>([
    { step: 1, title: '신청' },
    { step: 2, title: '접수' },
    { step: 3, title: '검토' },
    { step: 4, title: '반려' },
  ])
  const statusCurrentStep = ref(0)
  const statusRejectedIndices = computed(() => {
    // 현재 스텝이 반려(인덱스 3)일 때 반려 색상 표시
    return statusCurrentStep.value === 3 ? [3] : []
  })

  // StatusStepper readonly=false 예제 데이터
  const statusStepsEditable = ref<StatusStep[]>([
    { step: 1, title: '신청' },
    { step: 2, title: '접수' },
    { step: 3, title: '검토' },
    { step: 4, title: '반려' },
  ])
  const statusCurrentStepEditable = ref(0)
  const statusRejectedIndicesEditable = computed(() => {
    // 현재 스텝이 반려(인덱스 3)일 때 반려 색상 표시
    return statusCurrentStepEditable.value === 3 ? [3] : []
  })

  // RequestStepper labelMode 예제 데이터
  const requestStepsSide = ref<RequestStep[]>([
    { step: 1, title: '신청 정보' },
    { step: 2, title: '등록 지역' },
    { step: 3, title: '서류 첨부' },
    { step: 4, title: '정보 확인' },
    { step: 5, title: '신청서 첨부' },
    { step: 6, title: '완료' },
  ])
  const requestCurrentStepSide = ref(0)

  const requestStepsDown = ref<RequestStep[]>([
    { step: 1, title: '신청 정보' },
    { step: 2, title: '등록 지역' },
    { step: 3, title: '서류 첨부' },
    { step: 4, title: '정보 확인' },
    { step: 5, title: '신청서 첨부' },
    { step: 6, title: '완료' },
  ])
  const requestCurrentStepDown = ref(0)

  // ProgressIndicator 예제 데이터
  const progressSteps = ref<ProgressStep[]>([
    { step: 1, title: '신청 정보' },
    { step: 2, title: '등록 지역' },
    { step: 3, title: '서류 첨부' },
    { step: 4, title: '정보 확인' },
  ])
  const progressCurrent = ref(1)

  // ProgressIndicator reject 예제 데이터
  const progressStepsReject = ref<ProgressStep[]>([
    { step: 1, title: '신청' },
    { step: 2, title: '접수' },
    { step: 3, title: '검토' },
    { step: 4, title: '반려' },
  ])
  const progressCurrentReject = ref(2)
  const progressReject = computed(() => {
    // 현재 스텝이 반려(인덱스 3)일 때 reject 표시
    return progressCurrentReject.value === 3
  })
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">Step Indicator</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        신청/처리 흐름을 단계별로 표시하는 Step Indicator 컴포넌트 모음입니다.
        진행 상황을 한눈에 보여주고, 경우에 따라 사용자가 직접 단계를 이동할 수
        있습니다.
      </p>

      <!-- RequestStepper 기본 사용 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">RequestStepper - 기본</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <RequestStepper
              v-model="requestCurrentStep"
              :steps="requestSteps"
              @click="(index) => (requestCurrentStep = index)"
            />

            <div class="mt-4 flex gap-4">
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="requestCurrentStep === 0"
                @click="
                  requestCurrentStep = Math.max(0, requestCurrentStep - 1)
                "
              >
                이전
              </button>
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="requestCurrentStep === requestSteps.length - 1"
                @click="
                  requestCurrentStep = Math.min(
                    requestSteps.length - 1,
                    requestCurrentStep + 1,
                  )
                "
              >
                다음
              </button>
            </div>

            <p class="text-krds-gray-70 text-sm">
              현재 단계: {{ requestCurrentStep + 1 }} /
              {{ requestSteps.length }}
            </p>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul class="text-krds-gray-70 list-inside list-disc space-y-2 text-sm">
            <li>
              <code class="bg-krds-gray-5 rounded px-1">v-model</code>로 현재
              단계(index)를 바인딩합니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">steps</code>에
              <code class="bg-krds-gray-5 rounded px-1">step</code>,
              <code class="bg-krds-gray-5 rounded px-1">title</code>을 가진
              배열을 전달합니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">@click</code> 이벤트로
              사용자가 클릭한 단계를 감지할 수 있습니다.
            </li>
          </ul>
        </Card>
      </div>

      <!-- RequestStepper disabledIndices -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">
          RequestStepper - disabledIndices
        </Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <RequestStepper
              v-model="requestCurrentStepWithDisabled"
              :steps="requestStepsWithDisabled"
              :disabled-indices="requestDisabledIndices"
              @click="(index) => (requestCurrentStepWithDisabled = index)"
            />

            <div class="mt-4 flex gap-4">
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="requestCurrentStepWithDisabled === 0"
                @click="
                  requestCurrentStepWithDisabled = Math.max(
                    0,
                    requestCurrentStepWithDisabled - 1,
                  )
                "
              >
                이전
              </button>
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="
                  requestCurrentStepWithDisabled ===
                  requestStepsWithDisabled.length - 1
                "
                @click="
                  requestCurrentStepWithDisabled = Math.min(
                    requestStepsWithDisabled.length - 1,
                    requestCurrentStepWithDisabled + 1,
                  )
                "
              >
                다음
              </button>
            </div>

            <p class="text-krds-gray-70 text-sm">
              현재 단계: {{ requestCurrentStepWithDisabled + 1 }} /
              {{ requestStepsWithDisabled.length }}
            </p>
            <p class="text-krds-gray-60 text-xs">
              첫 번째(1단계)와 마지막(6단계) 스텝은 클릭 불가능 (<code
                class="bg-krds-gray-5 rounded px-1"
                >disabledIndices=[0, 5]</code
              >)
            </p>
          </div>
        </Card>
      </div>

      <!-- StatusStepper readonly=true -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">
          StatusStepper - 읽기 전용 (readonly=true)
        </Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <StatusStepper
              v-model="statusCurrentStep"
              :steps="statusSteps"
              :rejected-indices="statusRejectedIndices"
              @click="(index) => (statusCurrentStep = index)"
            />

            <div class="mt-4 flex gap-4">
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="statusCurrentStep === 0"
                @click="statusCurrentStep = Math.max(0, statusCurrentStep - 1)"
              >
                이전
              </button>
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="statusCurrentStep === statusSteps.length - 1"
                @click="
                  statusCurrentStep = Math.min(
                    statusSteps.length - 1,
                    statusCurrentStep + 1,
                  )
                "
              >
                다음
              </button>
            </div>

            <p class="text-krds-gray-70 text-sm">
              현재 단계: {{ statusCurrentStep + 1 }} / {{ statusSteps.length }}
            </p>
            <p class="text-krds-gray-60 text-xs">
              기본값인
              <code class="bg-krds-gray-5 rounded px-1">readonly=true</code
              >에서는 스텝을 직접 클릭할 수 없습니다.
            </p>
          </div>
        </Card>
      </div>

      <!-- StatusStepper readonly=false -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">
          StatusStepper - 클릭 가능 (readonly=false)
        </Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <StatusStepper
              v-model="statusCurrentStepEditable"
              :steps="statusStepsEditable"
              :rejected-indices="statusRejectedIndicesEditable"
              :readonly="false"
              @click="(index) => (statusCurrentStepEditable = index)"
            />

            <div class="mt-4 flex gap-4">
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="statusCurrentStepEditable === 0"
                @click="
                  statusCurrentStepEditable = Math.max(
                    0,
                    statusCurrentStepEditable - 1,
                  )
                "
              >
                이전
              </button>
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="
                  statusCurrentStepEditable === statusStepsEditable.length - 1
                "
                @click="
                  statusCurrentStepEditable = Math.min(
                    statusStepsEditable.length - 1,
                    statusCurrentStepEditable + 1,
                  )
                "
              >
                다음
              </button>
            </div>

            <p class="text-krds-gray-70 text-sm">
              현재 단계: {{ statusCurrentStepEditable + 1 }} /
              {{ statusStepsEditable.length }}
            </p>
            <p class="text-krds-gray-60 text-xs">
              <code class="bg-krds-gray-5 rounded px-1">readonly=false</code>로
              설정하면 스텝을 직접 클릭하여 이동할 수 있습니다.
            </p>
          </div>
        </Card>
      </div>

      <!-- RequestStepper labelMode -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">
          RequestStepper - labelMode (side / down)
        </Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-10">
            <div>
              <Heading level="h3" class="mb-4 text-base">
                labelMode="side"
              </Heading>
              <RequestStepper
                v-model="requestCurrentStepSide"
                :steps="requestStepsSide"
                label-mode="side"
                @click="(index) => (requestCurrentStepSide = index)"
              />
              <p class="text-krds-gray-70 mt-4 text-sm">
                현재 단계: {{ requestCurrentStepSide + 1 }} /
                {{ requestStepsSide.length }}
              </p>
            </div>

            <div>
              <Heading level="h3" class="mb-4 text-base">
                labelMode="down" (기본값)
              </Heading>
              <RequestStepper
                v-model="requestCurrentStepDown"
                :steps="requestStepsDown"
                label-mode="down"
                @click="(index) => (requestCurrentStepDown = index)"
              />
              <p class="text-krds-gray-70 mt-4 text-sm">
                현재 단계: {{ requestCurrentStepDown + 1 }} /
                {{ requestStepsDown.length }}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <!-- ProgressIndicator 기본 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">ProgressIndicator</Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <ProgressIndicator
              :steps="progressSteps"
              :current="progressCurrent"
            />

            <div class="mt-4 flex gap-4">
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="progressCurrent === 0"
                @click="progressCurrent = Math.max(0, progressCurrent - 1)"
              >
                이전
              </button>
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="progressCurrent === progressSteps.length - 1"
                @click="
                  progressCurrent = Math.min(
                    progressSteps.length - 1,
                    progressCurrent + 1,
                  )
                "
              >
                다음
              </button>
            </div>

            <p class="text-krds-gray-70 text-sm">
              현재 단계: {{ progressCurrent + 1 }} / {{ progressSteps.length }}
            </p>
            <p class="text-krds-gray-60 text-xs">
              원형 progress와 현재/다음 단계 라벨을 함께 표시합니다.
            </p>
          </div>
        </Card>
      </div>

      <!-- ProgressIndicator reject -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">
          ProgressIndicator - reject 상태
        </Heading>
        <Card variant="outlined" padding="lg" class="mb-6">
          <div class="space-y-6">
            <ProgressIndicator
              :steps="progressStepsReject"
              :current="progressCurrentReject"
              :reject="progressReject"
            />

            <div class="mt-4 flex gap-4">
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="progressCurrentReject === 0"
                @click="
                  progressCurrentReject = Math.max(0, progressCurrentReject - 1)
                "
              >
                이전
              </button>
              <button
                type="button"
                class="bg-primary-600 hover:bg-primary-700 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                :disabled="
                  progressCurrentReject === progressStepsReject.length - 1
                "
                @click="
                  progressCurrentReject = Math.min(
                    progressStepsReject.length - 1,
                    progressCurrentReject + 1,
                  )
                "
              >
                다음
              </button>
            </div>

            <p class="text-krds-gray-70 text-sm">
              현재 단계: {{ progressCurrentReject + 1 }} /
              {{ progressStepsReject.length }}
            </p>
            <p class="text-krds-gray-60 text-xs">
              반려 단계(4단계)일 때 원형 progress와 텍스트가
              <code class="bg-krds-gray-5 rounded px-1">reject=true</code>로
              빨간색 표시됩니다.
            </p>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
