import '../../_styles/Row.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const Row = ({className, children, alignItems, justifyContent, ...props}) => (
  <div className={cn('row', className)}
    style={{
      ...(justifyContent ? {justifyContent} : {}),
      ...(alignItems ? {alignItems} : {}),
    }}
    {...props}>
    {children}
  </div>
)

Row.propTypes = {
  alignItems: T.string,
  justifyContent: T.string,
}

export default Row
