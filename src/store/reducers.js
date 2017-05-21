import {combineReducers} from 'redux-immutable'
import {
  Players,
  Flags,
  Entities,
} from './records.js'
import * as ActionTypes from './actions.js'

const entities = (state=new Entities(), action) => {
  if (action.type.match(/$ADD_/) === true && action.model && action.entity) {
    state.get(action.entity).push(action.model)
  }

  if (action.type.match(/$REMOVE_/) === true && action.entity && action.model) {
    state.updateIn([action.entity], list => (
      list.delete(list.findIndex(model => model === action.model))
    ))
  }

  return state
}

const players = (state=new Players(), action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PLAYER:
      return (
        state.updateIn([action.team], list => (
          list.set(
            action.index,
            Object.keys(action.update).reduce((acc, key) => (
              acc.set(key, action.update[key])
            ), list.get(action.index))
          )
        ))
      )
    case ActionTypes.DESELECT_PLAYER:
      return state.set('selected', undefined)
    case ActionTypes.SELECT_PLAYER:
      return state.set('selected', action.playerId)
    case ActionTypes.CHANGE_TEAM_COLOR:
      return state.set(`team${action.team.toUpperCase()}Color`, action.color)
    case ActionTypes.TOGGLE_TEAM:
      return state.set('team', state.get('team') === 'a' ? 'b' : 'a')
    case ActionTypes.ADD_PLAYER:
      return state.updateIn([action.team], (list) => list.push(action.id))
    case ActionTypes.REMOVE_PLAYER:
      return (
        state.updateIn([action.model.team], list => (
          list.delete(list.findIndex(id => action.model.id))
        ))
        .set('selected', undefined)
      )
    default: return state
  }
}

const flags = (state=new Flags(), action) => {
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
  entities,
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
  canRemovePlayers: state.getIn(['players', 'selected']) !== undefined,
})
