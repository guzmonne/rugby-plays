import React from 'react'
import {onlyUpdateForKeys} from 'recompose'
import propTypes, {ITeamProps} from './interface.js'
import Transform from '../common/Transform.js'
import Player from '../common/Player.js'

const Team = ({className, onSelectPlayer, players}) => (
  <g className={className}>
  {players.map(player => (
    <Transform key={player.id}
      onClick={e => {
        e.stopPropagation()
        onSelectPlayer(player.id)
      }}
      x={player.x}
      y={player.y}
      scale={player.scale}
      angle={player.angle}>
      <Player 
        bodyFill={player.bodyFill}
        neckFill={player.neckFill}
        headFill={player.headFill}
        bodyStroke={player.bodyStroke}
      />
    </Transform>
  ))}
  </g>
)

Team.propTypes = propTypes

const PureTeam = onlyUpdateForKeys(Object.keys(ITeamProps))(Team)

PureTeam.displayName = 'PureTeam'

export default PureTeam
