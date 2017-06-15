import {Record, Map as ImmutableMap, List} from 'immutable'
import range from 'lodash/range.js'

export const Player = Record({
  id: undefined,
  angle: 0,
  scale: 0.09,
  team: "a",
  x: 0,
  y: 0,
  number: 1,
  neckFill: '#000',
  bodyFill: '#fff',
  headFill: '#000',
  bodyStroke: '#000',
}, 'Player')

const players = (team, bodyFill) => range(0, 12).reduce((acc, index) => (
  acc.set(`${team}${index}`, new Player({
    id: `${team}${index}`,
    //angle: 0,
    angle: Math.random() * 360,
    team,
    x: 5 + Math.random() * 80,
    y: 5 + Math.random() * 120,
    number: index + 1,
    bodyFill,
  }))
), ImmutableMap({}))

const playersId = (team) => (
  List(range(0, 12).map(index => `${team}${index}`))
)

export const Entities = Record({
  players: players('a', '#B02F2F').merge(players('b', '#345AD2')),
}, 'Entities')

export const Flags = Record({
  isAddingPlayers: false,
  isOpenTeamAColorPicker: false,
  isOpenTeamBColorPicker: false,
  isPlayerDraggable: false,
  isSelectingItems: true,
}, 'Flags')

export const Players = Record({
  selected: List(),
  a: playersId('a'),
  b: playersId('b'),
  team: 'a',
  teamAColor: '#B02F2F',
  teamBColor: '#345AD2',
}, 'Players')
