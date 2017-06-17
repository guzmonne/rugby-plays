import './_style.css'
import React from 'react'
import T from 'prop-types'
import {pure} from 'recompose'

const ROTATING_RADIUS = 3
const OFFSET = 2
const MULTIPLIER = 100
const {sqrt, pow} = Math

const Handler = ({
  x,
  y,
  width,
  height,
  angle,
  rotating,
}) => {
  const x0 = x + width / 2
  const y0 = y + height / 2
  const radius = sqrt(pow(width, 2) + pow(height, 2)) / 2
  const y1 = y0 - radius - OFFSET
  return (
    <g className="Handler"
      transform={`rotate(${angle}, ${x0}, ${y0})`}>
      <path d={`M${x0},${y0} ${x0},${y1}Z`} />
      <circle cx={x0} cy={y1} r={0.5}/>
      <circle className="transparent"
        cx={x0}
        cy={y1}
        r={rotating ? ROTATING_RADIUS * MULTIPLIER : ROTATING_RADIUS }/>
    </g>
  )
}

Handler.propTypes = {
  x: T.number,
  y: T.number,
  width: T.number,
  height: T.number,
  angle: T.number,
  length: T.number,
  rotating: T.bool,
}

Handler.defaultProps = {
  angle: 0,
  length: 3,
}

const PureHandler = pure(Handler)

PureHandler.displayName = 'PureHandler'

export default PureHandler
