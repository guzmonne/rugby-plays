import React from 'react'
import Transform from '../common/Transform.js'
import Player from '../common/Player.js'

const OFFSET_X = -2
const OFFSET_Y = -2

const TeamBPlayer = ({x, y, ...props}) => (
  <Transform x={x - OFFSET_X} y={y - OFFSET_Y} rotate={180} scale={0.03}>
    <Player {...props} />
  </Transform>
)

export default TeamBPlayer
