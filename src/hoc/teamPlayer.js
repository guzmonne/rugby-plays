import React from 'react'
import Draggable from '../components/common/Draggable.js'
import Transform from '../components/common/Transform.js'
import Player from '../components/common/Player.js'

const teamPlayer = (offsetX, offsetY, rotate=0) => ({x, y, ...props}) => (
  <Draggable {...props}>
    <Transform {...props}
      x={x - offsetX} 
      y={y - offsetY} 
      rotate={rotate} 
      scale={0.03}>
      <Player {...props} />
    </Transform>
  </Draggable>
)

export default teamPlayer
