import {Record, Map as ImmutableMap, List} from 'immutable'

export const Player = Record({
  angle: 0,
  id: undefined,
  team: "a",
  x: 0,
  y: 0,
}, 'Player')

export const Entities = Record({
  players: ImmutableMap({
    a1: new Player({
      id: "a1",
      angle: 0,
      team: "a",
      x: 38.604312896728516,
      y: 74.5626220703125,
    }),
    b1: new Player({
      id: "b1",
      angle: 180,
      team: "b",
      x: 18.604312896728516,
      y: 24.5626220703125,
    })
  }),
}, 'Entities')

export const Flags = Record({
  isAddingPlayers: false,
  isOpenTeamAColorPicker: false,
  isOpenTeamBColorPicker: false,
  isPlayerDraggable: false,
}, 'Flags')

export const Players = Record({
  selected: undefined,
  a: List(['a1']),
  b: List(['b1']),
  team: 'a',
  teamAColor: '#fff',
  teamBColor: '#989',
}, 'Players')
