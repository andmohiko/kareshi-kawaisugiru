import { LoadingOverlay, Image, CloseButton, Overlay } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
// eslint-disable-next-line import/no-named-as-default
import ReactCrop from 'react-image-crop'

import styles from './style.module.css'
import { useCropImageInput, type FileObject } from './useCropImageInput'

import { FlexBox } from '~/components/Base/FlexBox'
import { ActionModal } from '~/components/Modals/ActionModal'
import { useEffect, useRef, useState } from 'react'

type Props = {
  value: FileObject | undefined
  onChange: (file: FileObject | undefined) => void
  error: string | undefined
  label: React.ReactNode
  description?: React.ReactNode
  storagePath: string
  ratioWidth?: number
  ratioHeight?: number
}

export const FileInputWithCropper = ({
  value,
  onChange,
  error,
  label,
  description,
  storagePath,
  ratioWidth = 16,
  ratioHeight = 9,
}: Props): React.ReactElement => {
  const [
    { file, uncroppedImageUrl, selectedImageRef, crop },
    { onSelectImage, remove, onCrop, onChangeCrop, closeCropper },
    { isOpenCropper, isDisabled, isLoading },
  ] = useCropImageInput(storagePath, value, onChange, ratioWidth, ratioHeight)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth() // 初期設定
    window.addEventListener('resize', updateWidth) // リサイズイベントを監視

    return () => {
      window.removeEventListener('resize', updateWidth) // クリーンアップ
    }
  }, [])

  const calculatedHeight = (containerWidth * ratioHeight) / ratioWidth

  return (
    <div ref={containerRef} className={styles.fileInputWithCropper}>
      <div className={styles.texts}>
        <p className={styles.title}>{label}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {file ? (
        <ImagePreview file={file} onRemove={remove} />
      ) : (
        <>
          <Dropzone
            onDrop={onSelectImage}
            onReject={() => {
              notifications.show({
                title: 'ファイルのアップロードに失敗しました',
                message: '',
                icon: <BiErrorCircle />,
                withCloseButton: true,
                autoClose: 8000,
                color: 'red',
              })
            }}
            maxSize={100 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            className={styles.dropzone}
            style={{
              height: calculatedHeight,
            }}
            disabled={isDisabled || isLoading}
          >
            <FlexBox gap={16} justify="center">
              <Dropzone.Accept>
                <AiOutlineUpload color="#777" size={50} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <RxCross1 color="#777" size={50} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <MdOutlineAddPhotoAlternate color="#777" size={50} />
              </Dropzone.Idle>
            </FlexBox>
            {isDisabled && <Overlay color="#fff" opacity={0.7} />}
            {isLoading && <LoadingOverlay visible />}
          </Dropzone>
          {error && <span className={styles.error}>{error}</span>}

          {uncroppedImageUrl && (
            <ActionModal
              isOpen={isOpenCropper}
              onClose={closeCropper}
              onSave={onCrop}
              title="画像を編集"
            >
              <ReactCrop
                crop={crop}
                onChange={(c) => onChangeCrop(c)}
                aspect={ratioWidth / ratioHeight}
                keepSelection={true}
              >
                <img
                  src={uncroppedImageUrl}
                  ref={selectedImageRef}
                  alt=""
                  style={{
                    height: 'auto',
                    maxHeight: '75vh',
                    maxWidth: '100%',
                  }}
                />
              </ReactCrop>
            </ActionModal>
          )}
        </>
      )}
    </div>
  )
}

type ImagePreviewProps = {
  file: FileObject
  onRemove: () => void
}

export const ImagePreview = ({
  file,
  onRemove,
}: ImagePreviewProps): React.ReactElement => (
  <div className={styles.imagePreview}>
    <Image src={file} alt="" className={styles.image} />
    <CloseButton
      size="xl"
      variant="subtle"
      pos="absolute"
      top={-2}
      right={-2}
      color="gray"
      onClick={onRemove}
    />
  </div>
)
