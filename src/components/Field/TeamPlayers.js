import React from 'react'
import {Iterable} from 'immutable'
import TeamAPlayer from './TeamPlayer.js'
import uniqueId from 'lodash/uniqueId.js'
import {onlyUpdateForKeys} from 'recompose'

const propTypes = [
  'className',
  'players',
  'selectedPlayer',
  'bodyFill'
]

class TeamPlayers extends React.Component {
  shouldComponentUpdate = (newProps) => {
    const check = propTypes.every((key) => (
      Iterable.isIterable(newProps[key])
      ? newProps[key].equals(this.props[key])
      : newProps[key] === this.props[key]
    ))
    console.log(this.props.className, !check)
    return !check
  }

  render = () => {
    const {
      className,
      players,
      selectedPlayer,
      bodyFill,
      onSelectPlayer,
      onDragPlayer,
      onRotatePlayer,
    } = this.props

    return (
      <g className={className}>
      {players.map(player => (
        <TeamAPlayer key={uniqueId('player')}
          playerId={player.id}
          selected={selectedPlayer}
          bodyFill={bodyFill}
          onRotate={e => onRotatePlayer(e, player)}
          onDrag={e => onDragPlayer(e, player)}
          onClick={e => onSelectPlayer(e, player)}
          player={player}
        />
      ))}
      </g>
    )
  }
}

const PureTeamPlayers = onlyUpdateForKeys([
  'className',
  'players',
  'selectedPlayer',
  'bodyFill'
])(TeamPlayers)

export default TeamPlayers
