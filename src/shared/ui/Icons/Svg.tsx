import cn from 'classnames'
import type { SVGProps } from 'react'
import s from './styles.module.css'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'type' | 'viewBox'> {}

export const Svg = ({ className, children, ...props }: IconProps) => {
  return (
    <svg
      aria-hidden
      className={cn(s.icon, className)}
      focusable="false"
      viewBox="0 0 18 18"
      {...props}
    >
      {children}
    </svg>
  )
}
