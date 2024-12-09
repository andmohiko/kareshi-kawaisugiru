import { useMediaQuery } from '@mantine/hooks'
import styles from './style.module.css'

import { Kareshi } from '~/entities/Kareshi'
import { FullScreenLayout } from '~/components/Layouts/FullScreenLayout'

type Props = {
  kareshi: Kareshi
}

export const KareshiContainer = ({ kareshi }: Props): React.ReactNode => {
  const isUsePortrait = useMediaQuery('(max-width: 600px)')
  const isUseSquare = useMediaQuery('(max-width: 950px)')

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
        <h1 className={styles.name}>{kareshi.kareshiName}</h1>
      </div>
    </FullScreenLayout>
  )
}
