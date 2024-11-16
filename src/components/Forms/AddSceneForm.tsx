import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Group,
  Image,
  LoadingOverlay,
  MultiSelect,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { showNotification } from '@mantine/notifications'
import {
  IconCheck,
  IconUpload,
  IconPhoto,
  IconX,
  IconHash,
} from '@tabler/icons'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

import { TagUI } from '~/entities'
import { useFileInput } from '~/hooks/useFileInput'
import { useCreateScene } from '~/hooks/useScenes'
import { serverTimestamp } from '~/lib/firebase'

const AddSceneSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  videoName: z.string(),
})

type AddSceneType = z.infer<typeof AddSceneSchema>

type Props = {
  tags: TagUI[]
  onClose: () => void
}

export const AddSceneForm = ({ tags, onClose }: Props) => {
  const createScene = useCreateScene()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AddSceneType>({ resolver: zodResolver(AddSceneSchema) })

  const [fileURL, onChange, loading] = useFileInput('/images/scenes/')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const onSubmit: SubmitHandler<AddSceneType> = (data) => {
    createScene({
      createdAt: serverTimestamp,
      likes: 0,
      screenshotURL: fileURL,
      shares: 0,
      tags: selectedTags,
      title: data.title,
      updatedAt: serverTimestamp,
      userId: null,
      videoName: data.videoName,
    })
    showNotification({
      message: 'スクショを追加しました',
      icon: <IconCheck />,
      radius: 'lg',
    })
    onClose()
  }

  return (
    <Stack spacing="xl">
      <Title order={2}>スクショを追加する</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="lg">
          <Stack>
            <Dropzone
              onDrop={onChange}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={100 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
            >
              {fileURL ? (
                <Image
                  src={fileURL}
                  alt=""
                  height={200}
                  width="auto"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                />
              ) : (
                <Group
                  position="center"
                  spacing="xl"
                  style={{ minHeight: 220, pointerEvents: 'none' }}
                >
                  <Dropzone.Accept>
                    <IconUpload size={50} stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={50} stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto size={50} stroke={1.5} />
                  </Dropzone.Idle>

                  <Text size="xl" inline>
                    画像をアップロードしてください
                  </Text>
                  {loading && <LoadingOverlay visible />}
                </Group>
              )}
            </Dropzone>
            <TextInput
              label="この場面に名前をつけるなら？"
              placeholder="クシシウ〜ウ"
              error={errors.title?.message}
              {...register('title')}
            />
            <TextInput
              label="どの動画？"
              placeholder="文理対決でろ過器作る動画"
              error={errors.videoName?.message}
              {...register('videoName')}
            />
            <Stack
              style={{
                gap: 4,
              }}
            >
              <MultiSelect
                data={tags.map((t) => {
                  return {
                    value: t.label,
                    label: t.label,
                  }
                })}
                searchable
                dropdownPosition="top"
                label="誰が映ってる？"
                icon={<IconHash size={15} />}
                onChange={setSelectedTags}
              />
              <Text
                style={{
                  color: '#888',
                  fontSize: 10,
                }}
              >
                タグの追加希望はお問い合わせからお願いします
              </Text>
            </Stack>
          </Stack>
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={!(fileURL && isValid)}
          >
            作成する
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
