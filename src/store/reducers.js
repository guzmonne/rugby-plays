import {combineReducers} from 'redux-immutable'
import {createStructuredSelector} from 'reselect'
import {
  Players,
  Flags,
  Entities,
} from './records.js'
import * as ActionTypes from './actions.js'

const entities = (state=new Entities(), action) => {

  if (action.hasOwnProperty('entity') === false) {
    return state
  }

  if (/^ADD_/.test(action.type) === true) return (
    state.updateIn([action.entity], (entity) => (
      entity.set(action.model.id, action.model)
    ))
  )

  if (/^REMOVE_/.test(action.type) === true) return (
    state.updateIn([action.entity], list => (
      list.delete(list.findIndex(model => model === action.model))
    ))
  )

  if (/^UPDATE_/.test(action.type) === true) return (
    state.updateIn([action.entity], (entity) => (
      entity.set(action.id, (
        Object
        .keys(action.update)
        .reduce((acc, key) => (
          acc.set(key, action.update[key])
        ), entity.get(action.id)))
      )
    ))
  )

  return state
}

const players = (state=new Players(), action) => {
  switch (action.type) {
    case ActionTypes.DESELECT_PLAYER:
      return state.set('selected', undefined)
    case ActionTypes.SELECT_PLAYER:
      return state.set('selected', action.playerId)
    case ActionTypes.CHANGE_TEAM_COLOR:
      return state.set(`team${action.team.toUpperCase()}Color`, action.color)
    case ActionTypes.TOGGLE_TEAM:
      return state.set('team', state.get('team') === 'a' ? 'b' : 'a')
    case ActionTypes.ADD_PLAYER:
      return state.updateIn([action.model.team], (list) => (
        list.push(action.model.id)
      ))
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
const playersSelectedSelector = state => state.getIn(['players', 'selected'])
const playersASelector = state => {
  const ids = state.getIn(['players', 'a'])
  return ids.map(id => state.getIn(['entities', 'players', id]))
}
const playersBSelector = state => {
  const ids = state.getIn(['players', 'b'])
  return ids.map(id => state.getIn(['entities', 'players', id]))
}
const playersTeamAColorSelector = state => (
  state.getIn(['players', 'teamAColor'])
)
const playersTeamBColorSelector = state => (
  state.getIn(['players', 'teamBColor'])
)
const playersTeamSelector = state => state.getIn(['players', 'team'])
const flagsIsAddingPlayerSelector = state => (
  state.getIn(['flags', 'isAddingPlayers'])
)
const flagsIsOpenTeamAColorPicker = state => (
  state.getIn(['flags', 'isOpenTeamAColorPicker'])
)
const flagsIsOpenTeamBColorPicker = state => (
  state.getIn(['flags', 'isOpenTeamBColorPicker'])
)
const flagsIsAddingPlayers = state => state.getIn(['flags', 'isAddingPlayers'])
const flagsCanRemovePlayers = state => (
  state.getIn(['players', 'selected']) !== undefined
)

export const leftBarSelector = createStructuredSelector({
  selectTeamRowState: createStructuredSelector({
    team: playersTeamSelector,
    teamAColor: playersTeamAColorSelector,
    teamBColor: playersTeamBColorSelector,
    isOpenTeamAColorPicker: flagsIsOpenTeamAColorPicker,
    isOpenTeamBColorPicker: flagsIsOpenTeamBColorPicker,
  }),
  isAddingPlayers: flagsIsAddingPlayers,
  canRemovePlayers: flagsCanRemovePlayers,
})

export const fieldSelector = createStructuredSelector({
  selectedPlayer: playersSelectedSelector,
  aPlayers: playersASelector,
  bPlayers: playersBSelector,
  teamAColor: playersTeamAColorSelector,
  teamBColor: playersTeamBColorSelector,
  isAddingPlayers: flagsIsAddingPlayerSelector,
})
