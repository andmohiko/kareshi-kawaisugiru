import { Button } from '@mantine/core'
import { IconBrandTwitter } from '@tabler/icons'
import { increment } from 'firebase/firestore'

import { Scene } from '~/entities'
import { useUpdateScene } from '~/hooks/useScenes'
import { serverTimestamp } from '~/lib/firebase'

type Props = {
  scene: Scene
}

const hashtags = ['東海スクショDB', '東海オンエア']

export const TweetButton = ({ scene }: Props) => {
  const updateScene = useUpdateScene()
  const shareUrl = `https://tokai-db.vercel.app/scenes/${scene.sceneId}`

  const createShareUrl = (url: string): string => {
    const shareUrl = new URL('http://twitter.com/share')
    const urlParams = [
      ['url', url],
      ['hashtags', hashtags.join(',')],
    ]
    const params = new URLSearchParams(urlParams)
    shareUrl.search = params.toString()
    return shareUrl.toString()
  }

  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      href={createShareUrl(shareUrl)}
      onClick={() => {
        updateScene(scene.sceneId, {
          shares: increment(1),
          updatedAt: serverTimestamp,
        })
      }}
      leftIcon={<IconBrandTwitter size={15} />}
      styles={(theme) => ({
        root: {
          backgroundColor: '#00acee',
          border: 0,
          fontSize: 12,
          height: 28,
          paddingLeft: 10,
          paddingRight: 10,
          width: 100,

          '&:hover': {
            backgroundColor: theme.fn.darken('#00acee', 0.05),
          },
        },

        leftIcon: {
          marginRight: 6,
        },
      })}
    >
      ツイート
    </Button>
  )
}
