export const ADD_PLAYER = 'ADD_PLAYER'

const playerOffset = {
  x: 1.35,
  y: 1.5,
}

export const addPlayer = (x, y) => ({
  type: ADD_PLAYER,
  player: {
    x: x ? x - playerOffset.x : 0,
    y: y ? y - playerOffset.y : 0,
  },
})
