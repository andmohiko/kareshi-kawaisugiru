import { FlexBox } from '~/components/Base/FlexBox'
import { BaseLayout } from '~/components/Layouts/BaseLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { LoginForm } from '~/features/auth/components/LoginForm'

export const LoginContainer = (): React.ReactNode => {
  return (
    <BaseLayout>
      <FlexBox gap={64} justify="flex-start" pt={64} px={16}>
        <TitleText>ログイン</TitleText>
        <LoginForm />
      </FlexBox>
    </BaseLayout>
  )
}
