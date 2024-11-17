import styles from './style.module.css'
import { BaseLayout } from '~/components/Layouts/BaseLayout'
import { TitleText } from '~/components/Typography/TitleText'

import { Kareshi } from '~/entities/Kareshi'

type Props = {
  kareshi: Kareshi
}

export const KareshiContainer = ({ kareshi }: Props): React.ReactNode => {
  return (
    <BaseLayout>
      <div className={styles.container}>
        <>
          <TitleText>{kareshi.kareshiName}</TitleText>
          <img
            src={kareshi.landscapeImageUrl ?? ''}
            alt={kareshi.kareshiName ?? ''}
          />
        </>
      </div>
    </BaseLayout>
  )
}
