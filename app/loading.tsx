import { Loader } from '@/src/shared/ui/Loader'

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Loader size="l" />
    </div>
  )
}
