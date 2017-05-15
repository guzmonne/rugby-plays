import '../../_styles/Row.css'
import React from 'react'
import T from 'prop-types'

const Row = ({className, children, ...props}) => (
  <div className={className} {...props}>{children}</div>
)

Row.propTypes = {
  className: T.string,
}

Row.defaultProps = {
  className: 'row',
}

export default Row
