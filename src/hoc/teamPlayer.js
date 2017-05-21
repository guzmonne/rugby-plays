import React from 'react'
import Draggable from '../components/common/Draggable.js'
import Rotatable from '../components/common/Rotatable.js'
import Transform from '../components/common/Transform.js'
import Player from '../components/common/Player.js'

const teamPlayer = (offsetX, offsetY) => {
  const TeamPlayer = ({player, bodyFill, ...props}) => {
    const x = player.get('x')
    const y = player.get('y')
    const angle = player.get('angle')
    props.scale = 0.08
    props.x = x
    props.y = y
    props.rotate = angle
    return (
      <Rotatable {...props}>
        <Draggable {...props}>
          <Transform {...props}>
            <Player 
              neckFill={player.get('neckFill')}
              bodyFill={bodyFill}
              headFill={player.get('headFill')}
              bodyStroke={player.get('bodyStroke')}
            />
          </Transform>
        </Draggable>
      </Rotatable>
    )
  }
  return TeamPlayer
}

export default teamPlayer
