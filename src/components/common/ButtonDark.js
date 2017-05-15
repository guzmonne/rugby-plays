import '../../_styles/ButtonDark.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const ButtonDark = ({className, children, active, type, ...props}) => (
  <button className={cn('Button', className, {
    success: type === 'success',
    danger: type === 'danger',
    active: active === true,
  })} {...props}>
    {children}
  </button>
)

ButtonDark.propTypes = {
  active: T.bool,
  type: T.oneOf(['success', 'danger']),
}

ButtonDark.defaultTypes = {
  type: 'success',
}

export default ButtonDark
