import React from 'react'
import {connect} from 'react-redux'
import Component from '../components/LeftBar.js'
import {
  toggleFlag,
  switchFlag,
  toggleTeam,
  changeTeamColor
} from '../store/actions.js'

class LeftBar extends React.Component {
  render = () => (
    <Component {...this.props}/>
  )
}

export default connect((state) => ({
  selectTeamRowState: {
    team: state.players.team,
    teamAColor: state.players.teamAColor,
    teamBColor: state.players.teamBColor,
    isOpenTeamAColorPicker: state.flags.isOpenTeamAColorPicker,
    isOpenTeamBColorPicker: state.flags.isOpenTeamBColorPicker,
  },
  isAddingPlayers: state.flags.isAddingPlayers,
}), (dispatch) => ({
  selectTeamRowActions: {
    onClick: (...args) => dispatch(toggleTeam(...args)),
    onChangeColor: (...args) => dispatch(changeTeamColor(...args)),
    toggleTeamAColorPicker: () => (
      dispatch(toggleFlag('isOpenTeamAColorPicker'))
    ),
    toggleTeamBColorPicker: () => (
      dispatch(toggleFlag('isOpenTeamBColorPicker'))
    ),
  },
  toggleAddingPlayers: () => (
    dispatch(switchFlag('isAddingPlayers', 'isRemovingPlayers'))
  ),
}))(LeftBar)
