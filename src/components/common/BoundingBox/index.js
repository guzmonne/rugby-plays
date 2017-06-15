import './_style.css'
import React from 'react'
import T from 'prop-types'
import {pure} from 'recompose'

const BoundingBox = ({x, y, width, height, offset}) => {
  x -= offset
  y -= offset
  width += 2 * offset
  height += 2 * offset

  console.log(x, y, width, height)

  return (
    <g className="BoundingBox">
      <rect className="BoundingBox__Rect"
        x={x}
        y={y}
        width={width}
        height={height}
      />
    </g>
  )
}

BoundingBox.propTypes = {
  x: T.number,
  y: T.number,
  width: T.number,
  height: T.number,
  offset: T.number,
}

BoundingBox.defaultProps = {
  offset: 1,
}

const PureBoundingBox = pure(BoundingBox)

PureBoundingBox.displayName = 'PureBoundingBox'

export default PureBoundingBox
