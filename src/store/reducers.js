import {combineReducers} from 'redux'
import * as ActionTypes from './actions.js'

const players = (state={
  list: [],
}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PLAYER: return {
      ...state,
      list: state.list.concat(action.player),
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
