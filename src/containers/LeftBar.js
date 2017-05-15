import React from 'react'
import {connect} from 'react-redux'
import Component from '../components/LeftBar.js'
import {toggleFlag} from '../store/actions.js'

class LeftBar extends React.Component {
  render = () => (
    <Component {...this.props}/>
  )
}

export default connect((state) => ({
  isAddingPlayers: state.flags.isAddingPlayers,
}), {
  toggleAddingPlayers: () => toggleFlag('isAddingPlayers'),
})(LeftBar)
