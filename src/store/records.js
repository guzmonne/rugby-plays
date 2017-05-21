import {Record, List} from 'immutable'

export const Entities = Record({
  players: List([]),
}, 'Entities')

export const Player = Record({
  angle: 0,
  id: undefined,
  team: "a",
  x: 0,
  y: 0,
}, 'Player')

export const Flags = Record({
  isAddingPlayers: false,
  isOpenTeamAColorPicker: false,
  isOpenTeamBColorPicker: false,
  isPlayerDraggable: false,
}, 'Flags')

export const Players = Record({
  selected: undefined,
  a: List([
    new Player({
      angle: 0,
      id: "a1",
      team: "a",
      x: 38.604312896728516,
      y: 74.5626220703125,
    })
  ]),
  b: List([
    new Player({
      angle: 180,
      id: "b2",
      team: "b",
      x: 18.604312896728516,
      y: 24.5626220703125,
    })
  ]),
  team: 'a',
  teamAColor: '#fff',
  teamBColor: '#989',
}, 'Players')
