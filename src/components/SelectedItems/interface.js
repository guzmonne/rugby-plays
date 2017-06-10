import T from 'prop-types'
import {Player} from '../../store/records.js'

export const ISelectedItemsProps = {
  player: T.instanceOf(Player),
}

export const ISelectedItemsActions = {
  mouseToSvgCoordinates: T.func.isRequired,
  updatePlayer: T.func.isRequired,
}

export default {
  ...ISelectedItemsProps,
  ...ISelectedItemsActions,
}
