import {combineReducers} from 'redux-immutable'
import {Map as map, List as list} from 'immutable'
import * as ActionTypes from './actions.js'

const playersDefaultState = map({
  selected: undefined,
  a: list([
    map({
      id: "teamaplayer3",
      team: "a",
      x: 38.604312896728516,
      y: 74.5626220703125,
    })
  ]),
  b: list(),
  team: 'a',
  teamAColor: '#fff',
  teamBColor: '#989',
})

const players = (state=playersDefaultState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PLAYER:
      return state.updateIn([action.team], list => (
        list.set(action.index, list.get(action.index).merge(map(action.update)))
      ))
    case ActionTypes.DESELECT_PLAYER:
      return state.set('selected', undefined)
    case ActionTypes.SELECT_PLAYER:
      return state.set('selected', action.playerId)
    case ActionTypes.CHANGE_TEAM_COLOR:
      return state.set(`team${action.team.toUpperCase()}Color`, action.color)
    case ActionTypes.TOGGLE_TEAM:
      return state.set('team', state.get('team') === 'a' ? 'b' : 'a')
    case ActionTypes.ADD_PLAYER:
      if (!action.team || state.get(action.team).size === 15 ) {
        return state
      }
      return state.updateIn([action.team], list => (
        list.push(map(action.player))
      ))
    default: return state
  }
}

const defaultFlagsState = map({
  isAddingPlayers: false,
  isOpenTeamAColorPicker: false,
  isOpenTeamBColorPicker: false,
  isPlayerDraggable: false,
})

const flags = (state=defaultFlagsState, action) => {
  if (
    action.type !== ActionTypes.TOGGLE_FLAG ||
    !action.flag || 
    !state.has(action.flag)
  ) {
    return state
  }
  return state.set(action.flag, !state.get(action.flag))
}

/**
 * Export main reducer.
 */
export default combineReducers({
	players,
  flags,
})
/**
 * Export mapStateToProps functions
 */
export const fieldProps = (state) => ({
  selectedPlayer: state.getIn(['players', 'selected']),
  aPlayers: state.getIn(['players', 'a']),
  bPlayers: state.getIn(['players', 'b']),
  teamAColor: state.getIn(['players', 'teamAColor']),
  teamBColor: state.getIn(['players', 'teamBColor']),
  isAddingPlayers: state.getIn(['flags', 'isAddingPlayers']),
})

export const leftBarProps = (state) => ({
  selectTeamRowState: {
    team: state.getIn(['players', 'team']),
    teamAColor: state.getIn(['players', 'teamAColor']),
    teamBColor: state.getIn(['players', 'teamBColor']),
    isOpenTeamAColorPicker: state.getIn(['flags', 'isOpenTeamAColorPicker']),
    isOpenTeamBColorPicker: state.getIn(['flags', 'isOpenTeamBColorPicker']),
  },
  isAddingPlayers: state.getIn(['flags', 'isAddingPlayers']),
})
