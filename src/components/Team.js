import React from 'react'
import T from 'prop-types'
import {List} from 'immutable'
import {onlyUpdateForKeys} from 'recompose'
import PlayerTransform from './Field/PlayerTransform.js'

const Team = ({className, onSelectPlayer, players}) => (
  <g className={className}>
  {players.map(player => (
    <PlayerTransform
      key={player.id}
      onClick={e => {
        e.stopPropagation()
        onSelectPlayer(player.id)
      }}
      player={player} />
  ))}
  </g>
)

Team.propTypes = {
  onSelectPlayer: T.func,
  className: T.string,
  players: T.instanceOf(List),
}

export default onlyUpdateForKeys(['className', 'players'])(Team)
