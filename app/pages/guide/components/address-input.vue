<script setup lang="ts">
  import * as yup from 'yup'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/yup'
  import Container from '@/components/hanui/Container.vue'
  import Heading from '@/components/hanui/Heading.vue'
  import Card from '@/components/hanui/Card.vue'
  import FormLabel from '@/components/hanui/FormLabel.vue'
  import Button from '@/components/hanui/Button.vue'
  import AddressInput from '@/components/molecules/AddressInput.vue'

  useHead({
    title: 'AddressInput - 가이드',
  })

  const formSchema = yup.object({
    zpcd: yup.string().required('주소를 검색해주세요'),
    addr: yup.string().required('주소를 검색해주세요'),
    dtlAddr: yup.string().required('상세주소를 입력해주세요'),
    lat: yup.string().optional().default(''),
    lng: yup.string().optional().default(''),
    zpcdReadonly: yup.string().optional().default(''),
    addrReadonly: yup.string().optional().default(''),
    dtlAddrReadonly: yup.string().optional().default(''),
    latReadonly: yup.string().optional().default(''),
    lngReadonly: yup.string().optional().default(''),
  })

  type FormValues = yup.InferType<typeof formSchema>

  const initialValues: FormValues = {
    zpcd: '',
    addr: '',
    dtlAddr: '',
    lat: '',
    lng: '',
    zpcdReadonly: '',
    addrReadonly: '',
    dtlAddrReadonly: '',
    latReadonly: '',
    lngReadonly: '',
  }

  const { handleSubmit, resetForm, setTouched } = useForm<FormValues>({
    validationSchema: toTypedSchema(formSchema),
    initialValues: { ...initialValues },
  })

  const onInvalid = ({
    errors,
  }: {
    errors: Record<string, string | undefined>
  }) => {
    if (errors && Object.keys(errors).length > 0) {
      setTouched(Object.fromEntries(Object.keys(errors).map((k) => [k, true])))
    }
  }

  const onSubmit = (payload: FormValues) => {
    // eslint-disable-next-line no-alert
    alert(
      `제출 값:\n우편번호: ${payload.zpcd}\n주소: ${payload.addr}\n상세주소: ${payload.dtlAddr}\n위도: ${payload.lat}\n경도: ${payload.lng}`,
    )
  }

  const handleReset = () => {
    resetForm()
  }
</script>

<template>
  <div class="min-h-screen py-12">
    <Container>
      <Heading level="h1" class="mb-4">AddressInput</Heading>
      <p class="text-krds-body-lg text-krds-gray-70 mb-12">
        Daum 우편번호 API를 활용한 주소 검색 입력 컴포넌트입니다. 우편번호,
        주소, 상세주소, 위도·경도를 한 번에 처리합니다.
      </p>

      <!-- 기본 사용법 -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">기본 사용법</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <form
            class="flex max-w-xl flex-col gap-6"
            @submit.prevent="
              (e) => {
                handleSubmit(onSubmit, onInvalid)(e)
              }
            "
          >
            <VFormField name="addr" required>
              <FormLabel>주소</FormLabel>
              <AddressInput
                zpcd-name="zpcd"
                addr-name="addr"
                dtl-addr-name="dtlAddr"
                lat-name="lat"
                lng-name="lng"
              />
              <!-- <VFormError /> -->
            </VFormField>

            <div class="flex gap-2">
              <Button variant="primary" size="md" type="submit"> 제출 </Button>
              <Button
                variant="outline"
                size="md"
                type="button"
                @click="handleReset"
              >
                초기화
              </Button>
            </div>
          </form>
        </Card>
        <Card variant="filled" padding="lg">
          <Heading level="h4" class="mb-3 text-base">사용 방법</Heading>
          <ul
            class="text-krds-body-md text-krds-gray-70 list-inside list-disc space-y-2"
          >
            <li>
              <code class="bg-krds-gray-5 rounded px-1">useForm</code>과 yup
              스키마에 우편번호(zpcd), 주소(addr), 상세주소(dtlAddr), 위도(lat),
              경도(lng) 필드를 정의합니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">VFormField</code>의
              <code class="bg-krds-gray-5 rounded px-1">name</code>은 검증/에러
              표시용 대표 필드(addr)와 일치시킵니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">zpcd-name</code>,
              <code class="bg-krds-gray-5 rounded px-1">addr-name</code> 등
              prop으로 폼 필드 이름을 지정합니다.
            </li>
            <li>
              Kakao Maps API(
              <code class="bg-krds-gray-5 rounded px-1">nuxt.config</code>의
              <code class="bg-krds-gray-5 rounded px-1">kakaoMapKey</code>)가
              설정되어 있어야 좌표 변환이 동작합니다.
            </li>
            <li>
              <code class="bg-krds-gray-5 rounded px-1">VFormError</code>로 주소
              미입력 시 &quot;주소를 입력해주세요&quot; 등의 에러 메시지가
              표시됩니다. 주소 검색 없이 제출하면 에러가 나타납니다.
            </li>
          </ul>
        </Card>
      </div>

      <!-- Readonly -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Readonly</Heading>
        <Card variant="outlined" padding="lg" class="mb-4">
          <div class="max-w-xl">
            <VFormField name="addrReadonly">
              <FormLabel>주소 (읽기 전용)</FormLabel>
              <AddressInput
                zpcd-name="zpcdReadonly"
                addr-name="addrReadonly"
                dtl-addr-name="dtlAddrReadonly"
                lat-name="latReadonly"
                lng-name="lngReadonly"
                readonly
              />
            </VFormField>
          </div>
        </Card>
        <Card variant="filled" padding="lg">
          <p class="text-krds-body-md text-krds-gray-70">
            <code class="bg-krds-gray-5 rounded px-1">readonly</code> prop을
            사용하면 주소검색 버튼이 비활성화되고 상세주소 입력이 막힙니다.
          </p>
        </Card>
      </div>

      <!-- Props -->
      <div class="mb-16">
        <Heading level="h2" class="mb-6">Props</Heading>
        <Card variant="outlined" padding="lg">
          <div class="overflow-x-auto">
            <table
              class="text-krds-body-md w-full text-left"
              border="1"
              cellpadding="8"
              cellspacing="0"
            >
              <thead>
                <tr class="bg-krds-gray-5">
                  <th>Prop</th>
                  <th>타입</th>
                  <th>필수</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody class="text-krds-gray-70">
                <tr>
                  <td><code>zpcdName</code></td>
                  <td>string</td>
                  <td>O</td>
                  <td>우편번호 폼 필드 이름</td>
                </tr>
                <tr>
                  <td><code>addrName</code></td>
                  <td>string</td>
                  <td>O</td>
                  <td>주소 폼 필드 이름 (대표 필드)</td>
                </tr>
                <tr>
                  <td><code>dtlAddrName</code></td>
                  <td>string</td>
                  <td>O</td>
                  <td>상세주소 폼 필드 이름</td>
                </tr>
                <tr>
                  <td><code>latName</code></td>
                  <td>string</td>
                  <td>O</td>
                  <td>위도 폼 필드 이름</td>
                </tr>
                <tr>
                  <td><code>lngName</code></td>
                  <td>string</td>
                  <td>O</td>
                  <td>경도 폼 필드 이름</td>
                </tr>
                <tr>
                  <td><code>readonly</code></td>
                  <td>boolean</td>
                  <td>X</td>
                  <td>읽기 전용 모드 (주소검색/상세입력 비활성화)</td>
                </tr>
                <tr>
                  <td><code>class</code></td>
                  <td>string</td>
                  <td>X</td>
                  <td>추가 CSS 클래스</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Container>
  </div>
</template>
