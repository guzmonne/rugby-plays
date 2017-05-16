import React from 'react'
import Transform from '../components/common/Transform.js'
import Player from '../components/common/Player.js'

const teamPlayer = (offsetX, offsetY, rotate=0) => ({
  x,
  y,
  onClick,
  selected,
  ...props
}) => (
  <Transform 
    selected={selected}
    onClick={onClick}
    x={x - offsetX} 
    y={y - offsetY} 
    rotate={rotate} 
    scale={0.03}>
    <Player {...props} />
  </Transform>
)

export default teamPlayer
