import React from 'react'
import T from 'prop-types'

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
  onMouseDown: T.func,
  transform: T.string,
}

BoundingBox.defaultProps = {
  x: 0,
  y: 0,
  width: 32,
  height: 32,
  onMouseDown: () => {},
}

export default BoundingBox
