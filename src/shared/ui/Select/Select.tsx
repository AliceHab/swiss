import React, { useState } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'

import { Danger } from '../Icons/assets/Danger'

import s from './styles.module.css'
import cn from 'classnames'

type SelectProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
  children?: React.ReactNode
  placeholder: string
  value: string
  onValueChange: (value: string) => void
  error: boolean
}

type SelectItemProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  children?: React.ReactNode
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ children, placeholder, value, onValueChange, error, ...props }, forwardedRef) => {
    const [open, setOpen] = useState(false)

    return (
      <SelectPrimitive.Root
        {...props}
        open={open}
        onOpenChange={setOpen}
        onValueChange={onValueChange}
        value={value}
      >
        <SelectPrimitive.Trigger
          ref={forwardedRef}
          className={cn(s.SelectTrigger, { [s.SelectError]: error })}
          aria-label="Select"
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className={s.SelectIcon}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {error ? <Danger className={s.DangerIcon} /> : ''}
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={s.SelectContent}
            position="popper"
            sideOffset={5}
            style={{ width: '100%' }}
          >
            <SelectPrimitive.ScrollUpButton className={s.SelectScrollButton}>
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className={s.SelectViewport}>
              {children}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className={s.SelectScrollButton}>
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  }
)

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Item {...props} ref={forwardedRef} className={s.SelectItem}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <SelectPrimitive.ItemIndicator className={s.SelectItemIndicator}>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    )
  }
)
