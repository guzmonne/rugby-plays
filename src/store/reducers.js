import {combineReducers} from 'redux'
import * as ActionTypes from './actions.js'

const players = (state={
  a: [],
  b: [],
  team: 'a',
}, action) => {
  switch (action.type) {
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
