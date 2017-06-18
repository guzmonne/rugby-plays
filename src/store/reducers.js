import {combineReducers} from 'redux-immutable'
import {List} from 'immutable'
import {createSelector, createStructuredSelector} from 'reselect'
import {
  Players,
  Flags,
  Entities,
} from './records.js'
import * as ActionTypes from './actions.js'
/**
 * Redux entities reducer.
 * @param {Immutable Record} state Current entities state.
 * @param {Redux Action} action Redux action object.
 * @return {Redux Action}The next entities state.
 */
const entities = (state=new Entities(), action) => {
  // Only move forward if the action has an entity value.
  if (action.hasOwnProperty('entity') === false) {
    return state
  }
  // General ADD action
  if (/^ADD_/.test(action.type) === true) return (
    state.updateIn([action.entity], (entity) => (
      entity.set(action.model.id, action.model)
    ))
  )
  // General UPDATE action
  if (/^UPDATE_/.test(action.type) === true) return (
    state.updateIn([action.entity], (entity) => (
      entity.merge(action.update)
    ))
  )
  // Default state
  return state
}
/**
 * Redux players reducer.
 * @param {Immutable Record} state Current players state.
 * @param {Redux Action} action Redux action object.
 * @return {Redux Action}The next players state.
 */
const players = (state=new Players(), action) => {
  switch (action.type) {
    case ActionTypes.DESELECT_PLAYER:
      return state.set('selected', List())
    case ActionTypes.SELECT_PLAYER:
      return state.set('selected', List([action.playerId]))
    case ActionTypes.SELECT_PLAYERS_BETWEEN_POINTS:
      return state.set('selected', action.players)
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
          list.delete(list.findIndex(id => id === action.model.id))
        )).set('selected', undefined)
      )
    default: return state
  }
}
/**
 * Redux flags reducer.
 * @param {Immutable Record} state Current flags state.
 * @param {Redux Action} action Redux action object.
 * @return {Redux Action}The next flags state.
 */
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
 * SELECTORS
 */
const playersEntities = (state) => state.getIn(['entities', 'players'])

const playersSelectedSelector = state => state.getIn(['players', 'selected'])

const playersTeamAIdsSelector = state => state.getIn(['players', 'a'])

const playersTeamBIdsSelector = state => state.getIn(['players', 'b'])

const idsToPlayers = (selected, ids, players) => (
  ids
  .filter(id => !selected.includes(id))
  .map(id => players.get(id))
)

const playersTeamAColorSelector = state => (
  state.getIn(['players', 'teamAColor'])
)

const playersTeamBColorSelector = state => (
  state.getIn(['players', 'teamBColor'])
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

const selectedPlayers = createSelector([
  playersSelectedSelector,
  playersEntities,
], (selected, players) => (
  selected.map(id => players.get(id))
))

const flagsAreSelectedItems = createSelector([
  selectedPlayers,
], (selected) => (
  selected.size > 0
))

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

const flagsIsAddingPlayers = state => (
  state.getIn(['flags', 'isAddingPlayers'])
)

const flagsCanRemovePlayers = state => (
  state.getIn(['players', 'selected']).size === 0
)

const flagsIsSelectingItemsSelector = state => (
  state.getIn(['flags', 'isSelectingItems'])
)

export const selectTeamRowSelector = createStructuredSelector({
  team: playersTeamSelector,
  teamAColor: playersTeamAColorSelector,
  teamBColor: playersTeamBColorSelector,
  isOpenTeamAColorPicker: flagsIsOpenTeamAColorPicker,
  isOpenTeamBColorPicker: flagsIsOpenTeamBColorPicker,
})

export const leftBarSelector = createStructuredSelector({
  isAddingPlayers: flagsIsAddingPlayers,
  canRemovePlayers: flagsCanRemovePlayers,
})

export const rightBarSelector = createStructuredSelector({
  areSelectedItems: flagsAreSelectedItems,
})

export const fieldSelector = createStructuredSelector({
  isAddingPlayers: flagsIsAddingPlayerSelector,
  aPlayers: playersASelector,
  bPlayers: playersBSelector,
})

export const selectedItemsSelector = createStructuredSelector({
  players: selectedPlayers,
})

export const selectBoxSelector = createStructuredSelector({
  isSelectingItems: flagsIsSelectingItemsSelector,
})

export const selectedItemsBoxSelector = createStructuredSelector({
  items: selectedPlayers,
})
