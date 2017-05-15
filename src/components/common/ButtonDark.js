import '../../_styles/ButtonDark.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const ButtonDark = ({
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

ButtonDark.propTypes = {
  className: T.string,
  disabled: T.bool,
  active: T.bool,
  onClick: T.func,
  type: T.oneOf(['success', 'danger']),
}

ButtonDark.defaultTypes = {
  type: 'success',
}

export default ButtonDark
