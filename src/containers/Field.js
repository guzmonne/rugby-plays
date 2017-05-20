import React from 'react'
import {connect} from 'react-redux'
import throttle from 'lodash/throttle.js'
import {fieldProps} from '../store/reducers.js'
import {fieldActions} from '../store/actions.js'
import Component from '../components/Field/index.js'
import mouseToSvgCoordinates from '../utils/mouseToSvgCoordinates.js'

const WIDTH = 90
const HEIGHT = 130

class Field extends React.Component {
  onAddPlayer = (e, svg, pt) => {
    if (this.props.isAddingPlayers === false) {
      return
    }
    const {x, y} = mouseToSvgCoordinates(e, svg, pt)
    this.props.addPlayer(x, y)
  }

  _onDragPlayer = (e, svg, pt, index, team) => {
    let {x, y} = mouseToSvgCoordinates(e, svg, pt)
    if (x < 0)      {x = 0}
    if (x > WIDTH)  {x = WIDTH}
    if (y < 0)      {y = 0}
    if (y > HEIGHT) {y = HEIGHT}
    this.props.updatePlayer(index, team, {x, y})
  }

  onDragPlayer = throttle(this._onDragPlayer, 100)

  render = () => (
    <Component {...this.props} {...this} />
  )
}

export default connect(fieldProps, fieldActions)(Field)
