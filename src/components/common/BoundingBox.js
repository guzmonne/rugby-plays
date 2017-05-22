import React from 'react'
import T from 'prop-types'
import {onlyUpdateForKeys} from 'recompose'

const BoundingBox = ({x, y, width, height, onMouseDown, transform, children}) => (
  <g className="translate-box" onMouseDown={onMouseDown} transform={transform}>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
    />
    <g>
      <circle cx={x} cy={y} r={0.5}/>
      <circle cx={x} cy={y + height} r={0.5}/>
      <circle cx={x + width} cy={y + height} r={0.5}/>
      <circle cx={x + width} cy={y} r={0.5}/>
    </g>
    {children}
  </g>
)

BoundingBox.propTypes = {
  x: T.number,
  y: T.number,
  width: T.number,
  height: T.number,
  transform: T.string,
  onMouseDown: T.func,
}

BoundingBox.defaultProps = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  onMouseDown: () => {},
}

const PureBoundingBox = (
  onlyUpdateForKeys(['x', 'y', 'width', 'height', 'transform'])(BoundingBox)
)

export default PureBoundingBox
