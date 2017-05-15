import '../../_styles/Button.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const Button = ({
  className,
  children,
  active,
  disabled,
  type,
  onClick,
  ...props
}) => (
  <button className={cn('btn', className, {
    success: type === 'success',
    danger: type === 'danger',
    active: active === true,
    disabled: disabled === true,
  })} {...props} onClick={(...args) => {
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

export default Button
