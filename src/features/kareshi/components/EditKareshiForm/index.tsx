import { zodResolver } from '@hookform/resolvers/zod'
import { TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'

import styles from './style.module.css'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { useLoadingContext } from '~/providers/LoadingProvider'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'
import { useSaveKareshi } from '~/features/kareshi/hooks/useSaveKareshi'
import {
  EditKareshiInputType,
  editKareshiSchema,
} from '~/features/kareshi/types'
import { FileInputWithCropper } from '~/components/Inputs/FileInputWithCropper'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { Kareshi } from '~/entities/Kareshi'

type Props = {
  kareshi: Kareshi | null
}

export const EditKareshiForm = ({ kareshi }: Props): React.ReactNode => {
  const { startLoading, stopLoading } = useLoadingContext()
  const { showErrorToast } = useToast()
  const { createKareshi } = useSaveKareshi()
  const { uid } = useFirebaseAuthContext()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditKareshiInputType>({
    resolver: zodResolver(editKareshiSchema),
    defaultValues: {
      landscapeImageUrl: kareshi?.landscapeImageUrl
        ? kareshi.landscapeImageUrl
        : undefined,
      name: kareshi ? kareshi.name : '',
      portraitImageUrl: kareshi?.portraitImageUrl
        ? kareshi.portraitImageUrl
        : undefined,
      squareImageUrl: kareshi?.squareImageUrl
        ? kareshi.squareImageUrl
        : undefined,
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
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      <FlexBox gap={32}>
        <Controller
          name="landscapeImageUrl"
          control={control}
          render={({ field }) => (
            <FileInputWithCropper
              label="彼氏の写真（横）"
              value={field.value}
              onChange={field.onChange}
              error={errors.landscapeImageUrl?.message}
              storagePath={uid ? `/images/users/${uid}` : `/images/noUid`}
            />
          )}
        />
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
