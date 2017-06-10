import T from 'prop-types'

export const ILeftBarProps = {
  isAddingPlayers: T.bool.isRequired,
  canRemovePlayers: T.bool.isRequired,
}

export const ILeftBarActions = {
  toggleAddingPlayers: T.func.isRequired,
  removeSelectedPlayer: T.func.isRequired,
}

export const ILeftBar = {
  ...ILeftBarProps,
  ...ILeftBarActions
}

export default ILeftBar
