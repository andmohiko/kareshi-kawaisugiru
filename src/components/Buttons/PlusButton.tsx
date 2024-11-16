import { ActionIcon } from '@mantine/core'
import { AiOutlinePlus } from 'react-icons/ai'

type Props = {
  onClick: () => void
}

export const PlusButton = ({ onClick }: Props) => {
  return (
    <ActionIcon
      color="blue"
      variant="filled"
      onClick={onClick}
      style={{
        boxShadow: '2px 8px 20px 2px rgba(0, 0, 0, 0.15)',
        borderRadius: '100px',
        height: '64px',
        width: '64px'
      }}
    >
      <AiOutlinePlus size={32} />
    </ActionIcon>
  )
}
