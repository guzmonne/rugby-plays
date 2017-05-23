import React from 'react'
import T from 'prop-types'
import {Player as PlayerRecord} from '../../store/records.js'
import {onlyUpdateForKeys} from 'recompose'
import Transform from '../common/Transform.js'
import Player from '../common/Player.js'

const PlayerTransform = ({player, onClick}) => (
  <Transform key={player.id}
    onClick={onClick}
    x={player.x}
    y={player.y}
    scale={0.08}
    angle={player.angle}>
    <Player 
      bodyFill={player.bodyFill}
      neckFill={player.neckFill}
      headFill={player.headFill}
      bodyStroke={player.bodyStroke}
    />
  </Transform>
)

PlayerTransform.propTypes = {
  player: T.instanceOf(PlayerRecord),
  onClick: T.func,
}

export default onlyUpdateForKeys(['player'])(PlayerTransform)
