import {combineReducers} from 'redux'
import * as ActionTypes from './actions.js'

const players = (state={
  selected: undefined,
  a: [{
    id: "teamaplayer3",
    team: "a",
    x: 38.604312896728516,
    y: 74.5626220703125,
  }],
  b: [],
  team: 'a',
  teamAColor: '#fff',
  teamBColor: '#999',
}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PLAYER:
      return {
        ...state,
        [action.team]: action.updatedTeam,
      }
    case ActionTypes.DESELECT_PLAYER:
      return {
        ...state,
        selected: undefined,
      }
    case ActionTypes.SELECT_PLAYER:
      return {
        ...state,
        selected: action.playerId,
      }
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
  isOpenTeamAColorPicker: false,
  isOpenTeamBColorPicker: false,
  isPlayerDraggable: false,
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
