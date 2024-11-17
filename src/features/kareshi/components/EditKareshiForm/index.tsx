import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'

import styles from './style.module.css'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { useLoadingContext } from '~/providers/LoadingProvider'
import type { LoginInputType } from '~/features/auth/types'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'
import { useSaveKareshi } from '~/features/kareshi/hooks/useSaveKareshi'
import {
  EditKareshiInputType,
  editKareshiSchema,
} from '~/features/kareshi/types'

export const EditKareshiForm = (): React.ReactNode => {
  const { startLoading, stopLoading } = useLoadingContext()
  const { showErrorToast } = useToast()
  const { createKareshi } = useSaveKareshi()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditKareshiInputType>({
    resolver: zodResolver(editKareshiSchema),
    defaultValues: {
      landscapeImageUrl: null,
      name: null,
      portraitImageUrl: null,
      squareImageUrl: null,
    },
  })

  const submit = async (data: EditKareshiInputType) => {
    try {
      startLoading()
      await createKareshi(data)
    } catch (e) {
      showErrorToast(errorMessage(e))
    } finally {
      stopLoading()
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.loginForm}>
      <FlexBox gap={32}>
        <TextInput
          label="普段なんて呼んでる？"
          w="100%"
          {...register('name')}
          error={errors.name?.message}
        />
      </FlexBox>
      <FlexBox gap={16} align="stretch">
        <BasicButton type="submit" loading={isSubmitting} fullWidth>
          保存
        </BasicButton>
      </FlexBox>
    </form>
  )
}
