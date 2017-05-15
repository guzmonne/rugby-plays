import {combineReducers} from 'redux'
import * as ActionTypes from './actions.js'

const players = (state={
  a: [],
  b: [],
  team: 'a',
  teamAColor: '#fff',
  teamBColor: '#999',
}, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_TEAM_COLOR:
      return {
        ...state,
        [`team${(action.team || 'a').toUpperCase()}Color`]: action.color,
      }
    case ActionTypes.TOGGLE_TEAM:
      return {
        ...state,
        team: state.team === 'a' ? 'b' : 'a',
      }
    case ActionTypes.ADD_PLAYER: 
      if (!action.team || state[action.team].length === 15 ) {
        return state
      }
      return {
        ...state,
        [action.team]: state[action.team].concat(action.player),
      }
    default: return state
  }
}

const flags = (state={
  isAddingPlayers: false,
  isRemovingPlayers: false,
  isOpenTeamAColorPicker: false,
  isOpenTeamBColorPicker: false,
}, action) => {
  if (
    action.type !== ActionTypes.TOGGLE_FLAG ||
    !action.flag || 
    !state.hasOwnProperty(action.flag)
  ) {
    return state
  }
  return {
    ...state,
    [action.flag]: !state[action.flag],
  }
}

/**
 * Export main reducer.
 */
export default combineReducers({
	players,
  flags,
})
