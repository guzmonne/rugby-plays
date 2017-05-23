import {combineReducers} from 'redux-immutable'
import {createSelector, createStructuredSelector} from 'reselect'
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
const playersEntities = (state) => state.getIn(['entities', 'players'])

const playersSelectedSelector = state => state.getIn(['players', 'selected'])

const playersTeamAIdsSelector = state => state.getIn(['players', 'a'])

const playersTeamBIdsSelector = state => state.getIn(['players', 'b'])

const idsToPlayers = (selected, ids, players) => (
  ids
  .filter(id => id !== selected)
  .map(id => players.get(id))
)

const playersASelector = createSelector([
  playersSelectedSelector,
  playersTeamAIdsSelector,
  playersEntities,
], idsToPlayers)

const playersBSelector = createSelector([
  playersSelectedSelector,
  playersTeamBIdsSelector,
  playersEntities,
], idsToPlayers)

const selectedPlayer = createSelector([
  playersSelectedSelector,
  playersEntities,
], (selected, players) => players.get(selected))

/*
const playersASelectorOld = state => {
  const ids = state.getIn(['players', 'a'])
  return (
    ids
    .filter(id => id === state.getIn(['players', 'selected']))
    .map(id => state.getIn(['entities', 'players', id]))
  )
}

const playersBSelectorOld = state => {
  const ids = state.getIn(['players', 'b'])
  return (
    ids
    .filter(id => id === state.getIn(['players', 'selected']))
    .map(id => state.getIn(['entities', 'players', id]))
  )
}
*/

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
  isAddingPlayers: flagsIsAddingPlayerSelector,
  aPlayers: playersASelector,
  bPlayers: playersBSelector,
})

export const selectedItemsSelector = createStructuredSelector({
  player: selectedPlayer,
})
