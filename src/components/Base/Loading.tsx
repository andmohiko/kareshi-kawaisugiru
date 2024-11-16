import Image from 'next/image'

import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  size?: number
}

export const LoadingAnimation = ({ size = 80 }: Props): React.ReactElement => (
  <Image src="/images/svg/tail-spin.svg" height={size} width={size} alt="" />
)

export const LoadingContentOverlay = (): React.ReactNode => (
  <FlexBox
    height="100%"
    width="100%"
    style={{
      backdropFilter: 'blur(2px)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}
  >
    <div
      style={{
        marginBottom: 100,
      }}
    >
      <LoadingAnimation />
    </div>
  </FlexBox>
)

export const LoadingOverlay = (): React.ReactElement => (
  <FlexBox
    height="100vh"
    width="100vw"
    style={{
      backdropFilter: 'blur(3px)',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1000,
    }}
  >
    <LoadingAnimation />
  </FlexBox>
)
