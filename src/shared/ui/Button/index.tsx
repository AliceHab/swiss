import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import cn from 'classnames'
import s from './styles.module.css'

export type ButtonProps = PropsWithChildren<{
  loading?: boolean
  variant?: 'default' | 'light' | 'green'
  size?: 'medium' | 'small' | 'xs'
}> &
  ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  const {
    loading,
    className,
    children,
    disabled,
    variant = 'default',
    size = 'medium',
    ...other
  } = props
  return (
    <button
      className={cn(className, s.button, 'button', {
        [s.button_disabled]: loading || disabled,
        [s.button_load]: loading,
        [s.button_light]: variant === 'light',
        [s.button_green]: variant === 'green',
        [s.button_medium]: size === 'medium',
        [s.button_small]: size === 'small',
        [s.button_xs]: size === 'xs',
      })}
      disabled={disabled || loading}
      {...other}
    >
      {children}
    </button>
  )
}
