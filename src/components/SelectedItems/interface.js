import T from 'prop-types'
import {List} from 'immutable'

export const ISelectedItemsProps = {
  players: T.instanceOf(List),
}

export const ISelectedItemsActions = {
  mouseToSvgCoordinates: T.func.isRequired,
  updatePlayer: T.func.isRequired,
}

export default {
  ...ISelectedItemsProps,
  ...ISelectedItemsActions,
}
