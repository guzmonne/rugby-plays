import React from 'react'
import {connect} from 'react-redux'
import {addPlayer, selectPlayer, updatePlayer} from '../store/actions.js'
import Component from '../components/Field/index.js'
import mouseToSvgCoordinates from '../utils/mouseToSvgCoordinates.js'

class Field extends React.Component {
  onAddPlayer = (e, svg, pt) => {
    if (this.props.isAddingPlayers === false) {
      return
    }
    const {x, y} = mouseToSvgCoordinates(e, svg, pt)
    this.props.addPlayer(x, y)
  }

  onUpdatePlayer = (e, svg, pt, id, team) => {
    const {x, y} = mouseToSvgCoordinates(e, svg, pt)
    this.props.updatePlayer(id, team, {x, y})
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
    updatePlayer: (...args) => dispatch(updatePlayer(...args)),
  })
)(Field)
