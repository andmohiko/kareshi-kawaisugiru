import { PasswordInput, TextInput } from '@mantine/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import styles from './style.module.css'

import { errorMessage } from '~/utils/errorMessage'
import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import type { SignUpInputType } from '~/features/auth/types'
import { signUpSchema } from '~/features/auth/types'
import { useSignUp } from '~/features/auth/hooks/useSignUp'
import { useToast } from '~/hooks/useToast'
import { useLoadingContext } from '~/providers/LoadingProvider'

export const SignUpForm = (): React.ReactNode => {
  const { showErrorToast, showSuccessToast } = useToast()
  const { signUp } = useSignUp()
  const { startLoading, stopLoading } = useLoadingContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submit = async (data: SignUpInputType) => {
    try {
      startLoading()
      await signUp({
        email: data.email,
        password: data.password,
      })
      showSuccessToast('ユーザーを登録しました')
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
          label="メールアドレス"
          w="100%"
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput
          label="パスワード"
          w="100%"
          {...register('password')}
          error={errors.password?.message}
        />
      </FlexBox>
      <FlexBox gap={16} align="stretch">
        <BasicButton type="submit" loading={isSubmitting} fullWidth>
          新規登録
        </BasicButton>
        <BasicButton href="/i/login" importance="tertiary" fullWidth>
          ログインはこちら
        </BasicButton>
      </FlexBox>
    </form>
  )
}
