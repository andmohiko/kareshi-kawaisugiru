import { LoadingOverlay } from '~/components/Base/LoadingOverlay'
import { useLoadingContext } from '~/providers/LoadingProvider'

export const Loading = () => {
  const { isLoading } = useLoadingContext()

  return <LoadingOverlay visible={isLoading} />
}
