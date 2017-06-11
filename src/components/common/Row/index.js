import './_style.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const Row = ({
  className,
  alignItems,
  justifyContent,
  thin,
  children,
  ...props
}) => (
  <div className={cn('Row', className)}
    style={{
      ...(justifyContent ? {justifyContent} : {}),
      ...(alignItems ? {alignItems} : {}),
      ...(thin ? {minHeight: '1.2em'} : {})
    }}
    {...props}>
    {children}
  </div>
)

Row.propTypes = {
  className: T.string,
  thin: T.bool,
  alignItems: T.string,
  justifyContent: T.string,
}

export default Row
