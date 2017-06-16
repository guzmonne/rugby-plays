import T from 'prop-types'
import {List} from 'immutable'

export const ITeamProps = {
  /** Component className ('Transport value always present.') */
  className: T.string,
  /** Immutable list of players. */
  players: T.instanceOf(List),
}

const ITeamActions = {
  /** Action to call when a player is selected. */
  onSelectPlayer: T.func,
}

export default {
  ...ITeamProps,
  ...ITeamActions,
}
