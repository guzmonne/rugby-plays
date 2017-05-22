import React from 'react'
import Draggable from '../common/Draggable.js'
import Rotatable from '../common/Rotatable.js'
import Transform from '../common/Transform.js'
import Player from '../common/Player.js'

/*
const propTypes = [
  'rotate',
  'scale',
  'x',
  'y',
  'rotatable',
  'className',
  'playerId',
  'selected',
  'player',
  'bodyFill',
  'selected',
]
*/

class TeamPlayer extends React.Component {
  shouldComponentUpdate(newProps) {
    console.log('TeamPlayer')
    console.log(newProps.selected, this.props.selected)
    return true
  }
  
  componentDidUpdate() {
    console.log(`player ${this.props.player.id} updated`)
  }
  
  render() {
    const {player, bodyFill, selected, playerId, ...props} = this.props
    const x = player.get('x')
    const y = player.get('y')
    const angle = player.get('angle')
    props.scale = 0.08
    props.x = x
    props.y = y
    props.rotate = angle
    return (
      <Rotatable {...props} selected={selected} playerId={playerId}>
        <Draggable {...props} selected={selected} playerId={playerId}>
          <Transform {...props} selected={selected} playerId={playerId}>
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
}

export default TeamPlayer
