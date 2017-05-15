import React from 'react'
import {connect} from 'react-redux'
import Component from '../components/LeftBar.js'
import {toggleFlag, toggleTeam} from '../store/actions.js'

class LeftBar extends React.Component {
  render = () => (
    <Component {...this.props}/>
  )
}

export default connect((state) => ({
  team: state.players.team,
  isAddingPlayers: state.flags.isAddingPlayers,
}), {
  toggleTeam,
  toggleAddingPlayers: () => toggleFlag('isAddingPlayers'),
})(LeftBar)
