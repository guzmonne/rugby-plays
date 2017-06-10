import {Map} from 'immutable'
import uniqueId from 'lodash/uniqueId.js'
import {Player} from './records.js'
/**
 * Add Player
 */
export const ADD_PLAYER = 'ADD_PLAYER'

export const addPlayer = (x, y) => (dispatch, getState) => {
  const state = getState().get('players')
  const team = state.get('team')
  const list = state.get(team)
  const bodyFill = state.get('team' + team.toUpperCase() + 'Color')
  // If we already have 15 players we return nothing.
  if (list.size === 15) return
  const angle = team === 'a' ? 0 : 180
  const id = uniqueId(`team${team}player`)
  dispatch({
    type: ADD_PLAYER,
    entity: 'players',
    model: new Player({id, team, angle, x, y, bodyFill}),
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

export const updatePlayer = (id, update) => (dispatch, getState) => {
  const state = getState().getIn(['entities', 'players'])
  const player = Object.keys(update).reduce((acc, key) => (
    acc.set(key, update[key])
  ), state.get(id))
  dispatch({
    type: UPDATE_PLAYER,
    entity: 'players',
    update: Map({
      [id]: player,
    })
  })
}
/**
 * Remove Player
 */
export const REMOVE_PLAYER = 'REMOVE_PLAYER'

export const removeSelectedPlayer = () => (dispatch, getState) => {
  const state = getState()
  const id = state.getIn(['players', 'selected'])
  const model = state.getIn(['entities', 'players']).find(player => (
    player.id === id
  ))
  dispatch({
    type: REMOVE_PLAYER,
    entity: 'players',
    model,
  })
}
/** Change Team Color */
export const CHANGE_TEAM_COLOR = 'CHANGE_TEAM_COLOR'

export const changeTeamColor = (team, color) => (dispatch, getState) => {
  const state = getState().getIn(['entities', 'players'])
  const update = state.reduce((acc, player, id) => (
    player.team === team
    ? acc.set(id, player.set('bodyFill', color))
    : acc.set(id, player)
  ), Map({}))
  dispatch({
    type: UPDATE_PLAYER,
    entity: 'players',
    update
  })
  dispatch({
    type: CHANGE_TEAM_COLOR,
    team,
    color,
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
export const fieldActions = {
  addPlayer,
  updatePlayer,
  deselectPlayer,
}

export const leftBarActions = (dispatch) => ({
  toggleAddingPlayers: () => {
    dispatch(deselectPlayer())
    dispatch(switchFlag('isAddingPlayers', 'isRemovingPlayers'))
  },
  removeSelectedPlayer: (...args) => dispatch(removeSelectedPlayer(...args)),
})

export const teamActions = {
  onSelectPlayer: selectPlayer,
}

export const selectTeamRowActions = (dispatch) => ({
  onClick: (...args) => dispatch(toggleTeam(...args)),
  onChangeColor: (...args) => dispatch(changeTeamColor(...args)),
  toggleTeamAColorPicker: () => (
    dispatch(toggleFlag('isOpenTeamAColorPicker'))
  ),
  toggleTeamBColorPicker: () => (
    dispatch(toggleFlag('isOpenTeamBColorPicker'))
  ),
})

export const selectedItemsActions = {
  updatePlayer,
}
