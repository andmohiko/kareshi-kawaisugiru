import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack, TextInput, Title } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

// import { useCreateTag } from '~/hooks/useTags'
// import { serverTimestamp } from '~/lib/firebase'

const AddTagSchema = z.object({
  label: z.string().min(1, { message: 'タグを入力してください' }),
})

type AddTagType = z.infer<typeof AddTagSchema>

export const AddTagForm = () => {
  // const createTag = useCreateTag()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddTagType>({ resolver: zodResolver(AddTagSchema) })

  const onSubmit: SubmitHandler<AddTagType> = (data) => {
    console.log('submit', {
      ...data,
    })
    // createTag({
    //   createdAt: serverTimestamp,
    //   label: data.label,
    //   scenesCount: 0,
    //   updatedAt: serverTimestamp,
    // })
  }

  return (
    <Stack spacing="xl">
      <Title order={2}>タグを追加する</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="タグ"
            placeholder="文理対決"
            error={errors.label?.message}
            {...register('label')}
          />
          <Button type="submit" loading={isSubmitting}>
            作成する
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
