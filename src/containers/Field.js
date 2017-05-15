import React from 'react'
import {connect} from 'react-redux'
import {addPlayer, selectPlayer} from '../store/actions.js'
import Component from '../components/Field/index.js'

class Field extends React.Component {
  onAddPlayer = (e, svg, pt) => {
    if (this.props.isAddingPlayers === false) {
      return
    }
    pt.x = e.clientX
    pt.y = e.clientY
    // The cursor point, translated into svg coordinates.
    const {x, y} = pt.matrixTransform(svg.getScreenCTM().inverse())
    this.props.addPlayer(x, y)
  }

  render = () => (
    <Component {...this.props} {...this} />
  )
}

export default connect(
  (state) => ({
    selectedPlayer: state.players.selected,
    aPlayers: state.players.a,
    bPlayers: state.players.b,
    teamAColor: state.players.teamAColor,
    teamBColor: state.players.teamBColor,
    isAddingPlayers: state.flags.isAddingPlayers,
  }), (dispatch) => ({
    addPlayer: (...args) =>  dispatch(addPlayer(...args)),
    selectPlayer: (...args) => dispatch(selectPlayer(...args)),
  })
)(Field)
