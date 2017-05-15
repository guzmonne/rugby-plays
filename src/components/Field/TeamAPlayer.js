import React from 'react'
import Transform from '../common/Transform.js'
import Player from '../common/Player.js'

const OFFSET_X = 1.35
const OFFSET_Y = 1.5

const TeamAPlayer = ({x, y, onClick, selected, ...props}) => (
  <Transform 
    selected={selected}
    onClick={onClick}
    x={x - OFFSET_X} 
    y={y - OFFSET_Y} 
    rotate={0} 
    scale={0.03}>
    <Player {...props} />
  </Transform>
)

export default TeamAPlayer
