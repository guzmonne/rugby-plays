import './_style.css'
import React from 'react'
import T from 'prop-types'
import {pure} from 'recompose'

const OFFSET = 1

const BoundingBox = ({x, y, width, height, angle}) => {
  const x0 = x + width / 2
  const y0 = y + height / 2

  return (
    <g className="BoundingBox" transform={`rotate(${angle}, ${x0}, ${y0})`}>
      <rect className="BoundingBox__Rect"
        x={x - OFFSET}
        y={y - OFFSET}
        width={width + 2 * OFFSET}
        height={height + 2 * OFFSET}
      />
    </g>
  )
}

BoundingBox.propTypes = {
  x: T.number,
  y: T.number,
  width: T.number,
  height: T.number,
  angle: T.number,
}

BoundingBox.defaultProps = {
  offset: 0,
}

const PureBoundingBox = pure(BoundingBox)

PureBoundingBox.displayName = 'PureBoundingBox'

export default PureBoundingBox
