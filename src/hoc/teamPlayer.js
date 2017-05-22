import React from 'react'
import Draggable from '../components/common/Draggable.js'
import Rotatable from '../components/common/Rotatable.js'
import Transform from '../components/common/Transform.js'
import Player from '../components/common/Player.js'
import {onlyUpdateForKeys} from 'recompose'

const teamPlayer = (offsetX, offsetY) => {
  class TeamPlayer extends React.Component {
    shouldComponentUpdate(newProps) {
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
      props.x = x - offsetX
      props.y = y - offsetY
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

  const PureTeamPlayer = onlyUpdateForKeys([
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
  ])(TeamPlayer)

  return TeamPlayer
}

export default teamPlayer
