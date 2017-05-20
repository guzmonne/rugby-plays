import React from 'react'
import Draggable from '../components/common/Draggable.js'
import Transform from '../components/common/Transform.js'
import Player from '../components/common/Player.js'

const teamPlayer = (offsetX, offsetY, rotate=0) => {
  const TeamPlayer = ({player, bodyFill, ...props}) => {
    const x = player.get('x')
    const y = player.get('y')
    return (
      <Draggable {...props}>
        <Transform {...props}
          x={x - offsetX} 
          y={y - offsetY} 
          rotate={rotate} 
          scale={0.03}>
          <Player 
            neckFill={player.get('neckFill')}
            bodyFill={bodyFill}
            headFill={player.get('headFill')}
            bodyStroke={player.get('bodyStroke')}
          />
        </Transform>
      </Draggable>
    )
  }
  return TeamPlayer
}

export default teamPlayer
