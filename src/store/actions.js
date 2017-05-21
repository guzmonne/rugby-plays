import uniqueId from 'lodash/uniqueId.js'
/**
 * Add Player
 */
export const ADD_PLAYER = 'ADD_PLAYER'

export const addPlayer = (x, y) => (dispatch, getState) => {
  const state = getState().get('players')
  const team = state.get('team')
  const list = state.get(team)
  // If we already have 15 players we return nothing.
  if (list.size === 15) return
  const angle = team === 'a' ? 0 : 180
  const id = uniqueId(`team${team}player`)
  dispatch({
    type: ADD_PLAYER,
    team,
    id,
    entity: 'players',
    model: {
      id,
      team,
      angle,
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

  if (state.getIn(['flags', flagB]) === true) {
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

  if (state.getIn(['flags', 'isAddingPlayers']) === true) return

  const currentPlayerId = state.getIn(['players', 'selected'])
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

export const updatePlayer = (index, team, update) => (dispatch) => {
  dispatch({
    type: UPDATE_PLAYER,
    index,
    team,
    update,
  })
}
/**
 * Remove Player
 */
export const REMOVE_SELECTED_PLAYER = 'REMOVE_PLAYER'

export const removeSelectedPlayer = () => (dispatch, getState) => {
  const state = getState()
  const id = state.getIn(['players', 'selected'])
  const model = state.getIn(['entities', 'players']).find(player => (
    player.id === id
  ))
  dispatch({
    type: REMOVE_SELECTED_PLAYER,
    entity: 'players',
    model,
  })
}
/**
 * Helpers
 * 
const wrapDispatch = (actions) => (dispatch) => (
  actions.reduce((acc, action) => ({
    ...acc,
    [action.name]: (...args) => dispatch(action(...args)),
  }), {})
)
*/
/**
 * Container actions
 */
export const fieldActions = (dispatch) => ({
  addPlayer:(...args) => dispatch(addPlayer(...args)),
  updatePlayer:(...args) => dispatch(updatePlayer(...args)),
  deselectPlayer:(...args) => dispatch(deselectPlayer(...args)),
  selectPlayer: (...args) => dispatch(selectPlayer(...args)),
})

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
  removeSelectedPlayer: (...args) => dispatch(removeSelectedPlayer(...args)),
})
