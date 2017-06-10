import './_style.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'
import {pure} from 'recompose'

const Button = ({
  className,
  children,
  active,
  disabled,
  type,
  onClick,
  ...props
}) => (
  <button 
      className={cn('Button', className, {
      success: type === 'success',
      danger: type === 'danger',
      active: active === true,
      disabled: disabled === true,
    })}
    disabled={disabled}
    {...props}
    onClick={(...args) => {
      if (disabled === true) return
      onClick(...args)
    }}>
    {children}
  </button>
)

Button.propTypes = {
  className: T.string,
  disabled: T.bool,
  active: T.bool,
  onClick: T.func,
  type: T.oneOf(['success', 'danger']),
}

Button.defaultTypes = {
  type: 'success',
}

const PureButton = pure(Button)

PureButton.displayName = 'PureButton'

export default PureButton
