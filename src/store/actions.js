import uniqueId from 'lodash/uniqueId.js'
/**
 * Add Player
 */
export const ADD_PLAYER = 'ADD_PLAYER'

export const addPlayer = (x, y) => (dispatch, getState) => {
  const team = getState().players.team
  dispatch({
    type: ADD_PLAYER,
    team,
    player: {
      id: uniqueId(`team${team}player`),
      team,
      x: x || 0,
      y: y || 0,
    },
  })
}
/**
 * Toggle Flag
 */
export const TOGGLE_FLAG = 'TOGGLE_FLAG'

export const toggleFlag = (flag) => ({
  type: TOGGLE_FLAG,
  flag,
})

export const switchFlag = (flagA, flagB) => (dispatch, getState) => {
  const state = getState()

  dispatch({
    type: TOGGLE_FLAG,
    flag: flagA,
  })

  if (state.flags[flagB] === true) {
    dispatch({
      type: TOGGLE_FLAG,
      flag: flagB,
    })
  }
}
/**
 * Toggle Team
 */
export const TOGGLE_TEAM = 'TOGGLE_TEAM'

export const toggleTeam = () => ({
  type: TOGGLE_TEAM,
})
/** Change Team Color */
export const CHANGE_TEAM_COLOR = 'CHANGE_TEAM_COLOR'

export const changeTeamColor = (team, color) => ({
  type: CHANGE_TEAM_COLOR,
  team,
  color,
})
/**
 * Select/Deselect Player
 */
export const SELECT_PLAYER = 'SELECT_PLAYER'
export const DESELECT_PLAYER = 'DESELECT_PLAYER'

export const selectPlayer = (playerId) => (dispatch, getState) =>  {
  const state = getState()

  if (state.flags.isAddingPlayers === true) return

  const currentPlayerId = state.players.selected
  dispatch({
    type: SELECT_PLAYER,
    playerId: playerId === currentPlayerId ? undefined : playerId,
  })
}

export const deselectPlayer = () => ({
  type: DESELECT_PLAYER,
})
/**
 * Update Player
 */
export const UPDATE_PLAYER = 'UPDATE_PLAYER'

export const updatePlayer = (index, team, update) => (dispatch, getState) => {
  dispatch({
    type: UPDATE_PLAYER,
    index,
    team,
    update,
  })
} 
/**
 * Helpers
 */
const wrapDispatch = (actions) => (dispatch) => (
  actions.reduce((acc, action) => ({
    ...acc,
    [action.name]: (...args) => dispatch(action(...args)),
  }), {})
)
/**
 * Container actions
 */
export const fieldActions = wrapDispatch([
  addPlayer,
  selectPlayer,
  updatePlayer,
  deselectPlayer,
])

export const leftBarActions = (dispatch) => ({
  selectTeamRowActions: {
    onClick: (...args) => dispatch(toggleTeam(...args)),
    onChangeColor: (...args) => dispatch(changeTeamColor(...args)),
    toggleTeamAColorPicker: () => (
      dispatch(toggleFlag('isOpenTeamAColorPicker'))
    ),
    toggleTeamBColorPicker: () => (
      dispatch(toggleFlag('isOpenTeamBColorPicker'))
    ),
  },
  toggleAddingPlayers: () => {
    dispatch(deselectPlayer())
    dispatch(switchFlag('isAddingPlayers', 'isRemovingPlayers'))
  },
})
