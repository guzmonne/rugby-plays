import {Record, Map as ImmutableMap, List} from 'immutable'
import range from 'lodash/range.js'

export const Player = Record({
  id: undefined,
  angle: 0,
  team: "a",
  x: 0,
  y: 0,
}, 'Player')

const players = (team) => range(0, 12).reduce((acc, index) => (
  acc.set(`${team}${index}`, new Player({
    id: `${team}${index}`,
    //angle: 0,
    angle: Math.random() * 180 * (Math.random() > 0.5 ? 1 : -1),
    team,
    x: 5 + Math.random() * 80,
    y: 5 + Math.random() * 120,
  }))
), ImmutableMap({}))

const playersId = (team) => (
  List(range(0, 12).map(index => `${team}${index}`))
)

export const Entities = Record({
  players: players('a').merge(players('b')),
}, 'Entities')

export const Flags = Record({
  isAddingPlayers: false,
  isOpenTeamAColorPicker: false,
  isOpenTeamBColorPicker: false,
  isPlayerDraggable: false,
}, 'Flags')

export const Players = Record({
  selected: undefined,
  a: playersId('a'),
  b: playersId('b'),
  team: 'a',
  teamAColor: '#fff',
  teamBColor: '#989',
}, 'Players')
