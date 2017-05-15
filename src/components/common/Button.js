import '../../_styles/Button.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const Button = ({className, children, active, type, ...props}) => (
  <button className={cn('btn', className, {
    success: type === 'success',
    danger: type === 'danger',
    active: active === true,
  })} {...props}>
    {children}
  </button>
)

Button.propTypes = {
  active: T.bool,
  type: T.oneOf(['success', 'danger']),
}

Button.defaultTypes = {
  type: 'success',
}

export default Button
