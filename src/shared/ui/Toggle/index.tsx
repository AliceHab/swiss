import React from 'react'

import { Button } from '../Button'
import { Mars } from '../Icons/assets/Mars'
import { Venus } from '../Icons/assets/Venus'

import cn from 'classnames'
import s from './styles.module.css'

export type ToggleProps = {
  value: 'male' | 'female'
  onChange: (value: 'male' | 'female') => void
  error: boolean
}

export const Toggle = React.forwardRef<HTMLDivElement, ToggleProps>(
  ({ value, onChange, error }, ref) => {
    const handleFemaleClick = () => {
      if (value !== 'female') {
        onChange('female')
      }
    }

    const handleMaleClick = () => {
      if (value !== 'male') {
        onChange('male')
      }
    }

    const toggleClassNames = cn(s.toggle, {
      [s.toggleError]: error,
    })

    return (
      <div className={toggleClassNames} ref={ref}>
        <Button
          onClick={handleFemaleClick}
          variant={value === 'female' ? 'default' : 'light'}
          size="small"
          type="button"
        >
          <Venus color={error ? 'var(--critic-s)' : ''} />
          <span>Женский</span>
        </Button>
        <Button
          onClick={handleMaleClick}
          variant={value === 'male' ? 'default' : 'light'}
          size="small"
          type="button"
        >
          <Mars color={error ? 'var(--critic-s)' : ''} />
          <span>Мужской</span>
        </Button>
      </div>
    )
  }
)
