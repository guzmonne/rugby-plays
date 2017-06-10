import T from 'prop-types'
import {List} from 'immutable'

export const ITeamProps = {
  className: T.string,
  players: T.instanceOf(List),
}

const ITeamActions = {
  onSelectPlayer: T.func,
}

export default {
  ...ITeamProps,
  ...ITeamActions,
}
