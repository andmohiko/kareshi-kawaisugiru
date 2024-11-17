import { LoadingOverlay as MantineLoadingOverlay } from '@mantine/core'
import type { FC } from 'react'
// REF: https://v6.mantine.dev/changelog/6-0-0/#other-breaking-changes
import { RemoveScroll } from 'react-remove-scroll'

type Props = {
  visible?: boolean
}
export const LoadingOverlay: FC<Props> = ({ visible }) => {
  return visible ? (
    <RemoveScroll>
      <MantineLoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2, fixed: true }}
        // overlayProps.fixed を 指定しても fixed にならないため
        style={{
          position: 'fixed',
        }}
      />
    </RemoveScroll>
  ) : null
}
