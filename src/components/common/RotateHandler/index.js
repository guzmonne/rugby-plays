import './_style.css'
import React from 'react'
import T from 'prop-types'

const RotateHandler = ({svg, angle, length}) => {
  if (!svg) return <none />
  const {x, y, width, height} = svg.getBBox()
  const x0 = x + width / 2
  const y0 = y + height / 2
  const y1 = y - (length === 0 ? 2 * height : length)
  return (
    <g className="RotateHandler"
      transform={`rotate(${angle}, ${x0}, ${y0})`}>
      <path d={`M${x0},${y0} ${x0},${y1}Z`} />
      <circle cx={x0} cy={y1} r={0.5}/>
      <circle className="transparent" cx={x0} cy={y1} r={3}/>
    </g>
  )
}

RotateHandler.propTypes = {
  svg: T.object,
  angle: T.number,
}

RotateHandler.defaultProps = {
  angle: 0,
  length: 3,
}

export default RotateHandler
