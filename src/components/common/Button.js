import '../../_styles/Button.css'
import React from 'react'
import cn from 'classnames'

const Button = ({className, children, active, ...props}) => (
  <button className={cn('btn', className, {
    active: active === true,
  })} {...props}>
    {children}
  </button>
)

export default Button
