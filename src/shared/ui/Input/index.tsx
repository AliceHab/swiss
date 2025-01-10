import React from 'react'

import cn from 'classnames'
import s from './styles.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'm' | 's'
  error?: boolean
  warning?: boolean
  before?: React.ReactNode
  after?: React.ReactNode
  beforeClassName?: string
  afterClassName?: string
  beforeProps?: React.HTMLAttributes<HTMLDivElement>
  afterProps?: React.HTMLAttributes<HTMLDivElement>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'm',
      error = false,
      warning = false,
      type,
      before,
      after,
      beforeClassName,
      afterClassName,
      beforeProps,
      afterProps,
      children,
      ...props
    },
    ref
  ) => {
    const inputClassNames = cn(className, s.inputBase, {
      [s.inputM]: variant === 'm',
      [s.inputS]: variant === 's',
      [s.inputError]: error,
      [s.inputWarning]: warning,
      [s.inputBefore]: before,
      [s.inputAfter]: after,
    })

    const beforeClassNames = cn(beforeClassName, s.inputAddon, s.left, {
      [s.left]: variant === 'm',
      [s.addonM]: variant === 'm',
      [s.addonS]: variant === 's',
      [s.beforeError]: error,
    })

    const afterClassNames = cn(afterClassName, s.inputAddon, s.right, {
      [s.addonM]: variant === 'm',
      [s.addonS]: variant === 's',
      [s.afterError]: error,
    })

    return (
      <div className={cn(s.inputWrapper, className)}>
        {before && (
          <div className={beforeClassNames} {...beforeProps}>
            {before}
          </div>
        )}
        <input type={type} className={inputClassNames} ref={ref} {...props} />
        {children}
        {after && (
          <div className={afterClassNames} {...afterProps}>
            {after}
          </div>
        )}
      </div>
    )
  }
)
