import { Badge } from '@mantine/core'

import { TagUI } from '~/entities'

interface TagButtonProps {
  tag: TagUI
  selectTag: (tag: TagUI) => void
}

export const TagButton = ({
  tag,
  selectTag,
}: TagButtonProps): React.ReactElement => {
  return (
    <button onClick={() => selectTag(tag)} type="button">
      <TagLabel tagLabel={tag.label} isActive={tag.isActive} />
    </button>
  )
}

interface TagLabelProps {
  tagLabel: string
  isActive?: boolean
}

export const TagLabel = ({
  tagLabel,
  isActive = false,
}: TagLabelProps): React.ReactElement => {
  const focusedColor = 'red'
  let tagColor = 'gray'
  switch (tagLabel) {
    case 'てつや':
      tagColor = 'orange'
      break
    case 'しばゆー':
      tagColor = 'yellow'
      break
    case 'りょう':
      tagColor = 'blue'
      break
    case 'としみつ':
      tagColor = 'green'
      break
    case 'ゆめまる':
      tagColor = 'pink'
      break
    case '虫眼鏡':
      tagColor = 'red'
      break
    default:
      tagColor = 'gray'
  }

  return (
    <Badge
      color={isActive ? focusedColor : tagColor}
      variant={isActive ? 'filled' : 'light'}
      radius="sm"
      style={{
        fontSize: 13,
        padding: 4,
      }}
    >
      {tagLabel}
    </Badge>
  )
}
