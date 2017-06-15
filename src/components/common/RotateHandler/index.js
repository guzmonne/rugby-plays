import './_style.css'
import React from 'react'
import T from 'prop-types'
import {pure} from 'recompose'

const ROTATING_RADIUS = 3

const RotateHandler = ({
  x,
  y,
  width,
  height,
  angle,
  length,
  rotating,
}) => {
  const x0 = x + width / 2
  const y0 = y + height / 2
  const y1 = y - length
  return (
    <g className="RotateHandler"
      transform={`rotate(${angle}, ${x0}, ${y0})`}>
      <path d={`M${x0},${y0} ${x0},${y1}Z`} />
      <circle cx={x0} cy={y1} r={0.5}/>
      <circle className="transparent"
        cx={x0}
        cy={y1}
        r={rotating ? ROTATING_RADIUS * 10 : ROTATING_RADIUS }/>
    </g>
  )
}

RotateHandler.propTypes = {
  x: T.number,
  y: T.number,
  width: T.number,
  height: T.number,
  angle: T.number,
  length: T.number,
  rotating: T.bool,
}

RotateHandler.defaultProps = {
  angle: 0,
  length: 3,
}

const PureRotateHandler = pure(RotateHandler)

PureRotateHandler.displayName = 'PureRotateHandler'

export default PureRotateHandler
