import cn from 'classnames'

import s from './styles.module.css'

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean
  size?: LoaderSize
  className?: string
}

export const Loader = (props: LoaderProps) => {
  const { loading, size = LoaderSize.m, className } = props

  const isLoad = loading ?? true

  return isLoad ? (
    <div className={className}>
      <div
        className={cn(s.loader, {
          [s.small]: size === LoaderSize.s,
          [s.medium]: size === LoaderSize.m,
          [s.large]: size === LoaderSize.l,
        })}
      />
    </div>
  ) : null
}
