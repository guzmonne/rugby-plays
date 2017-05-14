import {combineReducers} from 'redux'
import * as ActionTypes from './actions.js'

const players = (state={list: []}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PLAYER: return {
      ...state,
      list: state.list.concat(action.player),
    }
    default: return state
  }
}

/**
 * Export main reducer.
 */
export default combineReducers({
	players
})
