import { FlexBox } from '~/components/Base/FlexBox'
import { BaseLayout } from '~/components/Layouts/BaseLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { SignUpForm } from '~/features/auth/components/SignUpForm'

export const SignUpContainer = (): React.ReactNode => {
  return (
    <BaseLayout>
      <FlexBox gap={64} justify="flex-start" pt={64} px={16}>
        <TitleText>新規登録</TitleText>
        <SignUpForm />
      </FlexBox>
    </BaseLayout>
  )
}
