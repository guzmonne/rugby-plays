import T from 'prop-types'
import {Player} from '../../store/records.js'

export const ISelectedItemsBoxProps = {
  player: T.instanceOf(Player)
}

export const ISelectedItemsBoxActions = {
  updatePlayer: T.func,
  onChangeFactory: T.func,
}

export const ISelectedItemsBox = {
  ...ISelectedItemsBoxProps,
  ...ISelectedItemsBoxActions
}

export default ISelectedItemsBox
