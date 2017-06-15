import T from 'prop-types'
import {List} from 'immutable'

export const IFieldProps = {
  aPlayers: T.instanceOf(List),
  bPlayers: T.instanceOf(List),
  isAddingPlayers: T.bool,
}

export const IFieldActions = {
  updatePlayer: T.func,
  deselectPlayer: T.func,
  onAddPlayer: T.func,
  selectItemsBetweenPoints: T.func,
}

export default {
  ...IFieldProps,
  ...IFieldActions,
}
