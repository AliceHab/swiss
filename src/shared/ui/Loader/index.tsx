import cn from 'classnames'

import s from './styles.module.css'

export type LoaderSize = 's' | 'm' | 'l'

export type LoaderProps = {
  loading?: boolean
  size?: LoaderSize
  className?: string
}

export const Loader = (props: LoaderProps) => {
  const { loading, size = 'm', className } = props

  const isLoad = loading ?? true

  return isLoad ? (
    <div className={className}>
      <div
        className={cn(s.loader, {
          [s.small]: size === 's',
          [s.medium]: size === 'm',
          [s.large]: size === 'l',
        })}
      />
    </div>
  ) : null
}
