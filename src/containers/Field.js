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

  _onRotatePlayer = (e, svg, pt, index, player) => {
    let {x:mX, y:mY} = mouseToSvgCoordinates(e, svg, pt)
    let angle = player.get('angle')
    const team = player.get('team')
    const x = player.get('x')
    const y = player.get('y')
    const a = Math.abs(y - mY)
    const b = Math.abs(x - mX)
    const alpha = Math.atan(a / b) * 180 / Math.PI
    if (mX === x) {
      angle = mY < y ? 0 : 180
    } else if (mY === y) {
      angle = mX < x ? -90 : 90
    } else if (mX < x) {
      angle = mY < y ? alpha - 90 : -alpha - 90
    } else if (mX > x) {
      angle = mY < y ? 90 - alpha : alpha + 90
    }
    this.props.updatePlayer(index, team, {angle})
  }

  _onDragPlayer = (e, svg, pt, index, player) => {
    let {x:mX, y:mY} = mouseToSvgCoordinates(e, svg, pt)
    const x = player.get('x')
    const y = player.get('y')
    // Check if its a new drag
    if (!this.x || x !== this.x){
      this.x = x
      this.x0 = mX
    }
    if (!this.y || y !== this.y){
      this.y = y
      this.y0 = mY
    }
    // Move new coordinates to main point
    mX += Math.sign(this.x - this.x0) * Math.abs(this.x - this.x0)
    mY += Math.sign(this.y - this.y0) * Math.abs(this.y - this.y0)
    // Limits
    if (mX < 0)      {mX = 0}
    if (mX > WIDTH)  {mX = WIDTH}
    if (mY < 0)      {mY = 0}
    if (mY > HEIGHT) {mY = HEIGHT}
    // Update
    this.props.updatePlayer(index, player.get('team'), {x: mX, y: mY})
  }

  onDragPlayer = throttle(this._onDragPlayer, 100)

  onRotatePlayer = throttle(this._onRotatePlayer, 100)

  render = () => (
    <Component {...this.props} {...this} />
  )
}

export default connect(fieldProps, fieldActions)(Field)
