import { RemoveScroll } from 'react-remove-scroll'
import { RingProgress } from '@mantine/core'
import styles from './style.module.css'

type Props = {
  value: number
}

export const SubmitLoading: React.FC<Props> = ({ value }) => {
  return (
    <RemoveScroll>
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner}>
            <RingProgress
              size={110}
              thickness={8}
              roundCaps
              sections={[{ value, color: 'var(--color-base-black)' }]}
              rootColor="var(--color-base-gray)"
            />
            <img
              src="/images/logo-round.png"
              alt="彼氏がかわいすぎる.com"
              className={styles.logo}
            />
          </div>
          <p className={styles.grading}>彼氏ページを作成中 {value}%</p>
        </div>
      </div>
    </RemoveScroll>
  )
}
