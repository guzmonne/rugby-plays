import '../../_styles/Row.css'
import React from 'react'
import T from 'prop-types'

const Row = ({className, children, alignItems, justifyContent, ...props}) => (
  <div className={className}
    style={{
      ...(justifyContent ? {justifyContent} : {}),
      ...(alignItems ? {alignItems} : {}),
    }}
    {...props}>
    {children}
  </div>
)

Row.propTypes = {
  className: T.string,
  alignItems: T.string,
  justifyContent: T.string,
}

Row.defaultProps = {
  className: 'row',
}

export default Row
