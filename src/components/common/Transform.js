import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const Transform = ({x, y, scale, rotate, className, children}) => (
  <g className={cn('Transform', className)}
     transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${scale})`}>
    {children}
  </g>
)

Transform.propTypes = {
  className: T.string,
  x: T.oneOfType([T.string, T.number]),
  y: T.oneOfType([T.string, T.number]),
  scale: T.oneOfType([T.string, T.number]),
  rotate: T.oneOfType([T.string, T.number]),
}

Transform.defaultProps = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
}

export default Transform
