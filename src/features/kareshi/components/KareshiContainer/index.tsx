import { useMediaQuery } from '@mantine/hooks'
import styles from './style.module.css'

import { Kareshi } from '~/entities/Kareshi'
import { FullScreenLayout } from '~/components/Layouts/FullScreenLayout'
import Image from 'next/image'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLinkSharp } from 'react-icons/io5'
import { CopyButton } from '~/components/Buttons/CopyButton'
import { ShareButton } from '~/components/Buttons/ShareButton'

type Props = {
  kareshi: Kareshi
}

export const KareshiContainer = ({ kareshi }: Props): React.ReactNode => {
  const isUsePortrait = useMediaQuery('(max-width: 600px)')
  const isUseSquare = useMediaQuery('(max-width: 950px)')

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${kareshi.username}`

  const kareshiImageUrl = () => {
    // 画面が縦のときはなるべく縦の画像を使う
    if (isUsePortrait) {
      if (kareshi.portraitImageUrl) {
        return kareshi.portraitImageUrl
      }
      if (kareshi.squareImageUrl) {
        return kareshi.squareImageUrl
      }
      return kareshi.portraitImageUrl ?? ''
    }
    // 画面が正方形のときはなるべく正方形の画像を使う
    if (isUseSquare) {
      if (kareshi.squareImageUrl) {
        return kareshi.squareImageUrl
      }
      return kareshi.landscapeImageUrl ?? ''
    }
    return kareshi.landscapeImageUrl ?? ''
  }

  return (
    <FullScreenLayout>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${kareshiImageUrl()})`,
        }}
      >
        <div className={styles.footer}>
          <div className={styles.info}>
            <h1 className={styles.name}>{kareshi.kareshiName}</h1>
          </div>
          <Image
            src="/images/logo-white.webp"
            width={979}
            height={565}
            alt="彼氏がかわいすぎる.com"
            className={styles.logo}
          />
          <div className={styles.actions}>
            <ShareButton
              shareUrl={shareUrl}
              width="175px"
              leftSection={<FaXTwitter />}
            >
              ポストで共有
            </ShareButton>
            <CopyButton
              copyText={shareUrl}
              width="175px"
              leftSection={<IoLinkSharp />}
              importance="secondary"
            >
              リンクをコピー
            </CopyButton>
          </div>
        </div>
      </div>
    </FullScreenLayout>
  )
}
