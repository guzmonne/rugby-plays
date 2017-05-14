import React from 'react'
import {connect} from 'react-redux'
import {addPlayer} from '../store/actions.js'
import Component from '../components/Field.js'

class Field extends React.Component {
  onAddPlayer = (e, svg, pt) => {
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
    players: state.players.list,
  }), {
    addPlayer,
  }
)(Field)
