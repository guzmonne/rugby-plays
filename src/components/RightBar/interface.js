import T from 'prop-types'
import {Player} from '../../store/records.js'

export const IRightBarProps = {
  player: T.instanceOf(Player)
}

export const IRightBarActions = {
  updatePlayer: T.func,
  onChangeFactory: T.func,
}

export const IRightBar = {
  ...IRightBarProps,
  ...IRightBarActions
}

export default IRightBar
