/**
 * Add Player
 */
export const ADD_PLAYER = 'ADD_PLAYER'

export const addPlayer = (x, y) => (dispatch, getState) => {
  const team = getState().players.team
  dispatch({
    type: ADD_PLAYER,
    team,
    player: {
      team,
      x: x || 0,
      y: y || 0,
    },
  })
}
/**
 * Toggle Flag
 */
export const TOGGLE_FLAG = 'TOGGLE_FLAG'

export const toggleFlag = (flag) => ({
  type: TOGGLE_FLAG,
  flag,
})

export const switchFlag = (flagA, flagB) => (dispatch, getState) => {
  const state = getState()

  dispatch({
    type: TOGGLE_FLAG,
    flag: flagA,
  })

  if (state.flags[flagB] === true) {
    dispatch({
      type: TOGGLE_FLAG,
      flag: flagB,
    })
  }
}
/**
 * Toggle Team
 */
export const TOGGLE_TEAM = 'TOGGLE_TEAM'

export const toggleTeam = () => ({
  type: TOGGLE_TEAM,
})
/** Change Team Color */
export const CHANGE_TEAM_COLOR = 'CHANGE_TEAM_COLOR'

export const changeTeamColor = (team, color) => ({
  type: CHANGE_TEAM_COLOR,
  team,
  color,
})
