import React from 'react'
import T from 'prop-types'
import {List} from 'immutable'
import {connect} from 'react-redux'
import throttle from 'lodash/throttle.js'
import {fieldSelector} from '../store/reducers.js'
import {fieldActions} from '../store/actions.js'
import Field from '../components/Field/index.js'
import Team from './Team.js'
import SelectedItems from './SelectedItems.js'
import mouseToSvgCoordinates from '../utils/mouseToSvgCoordinates.js'

const WIDTH = 90
const HEIGHT = 130

class FieldContainer extends React.Component {
  svg = undefined
  pt = undefined

  shouldComponentUpdate(newProps) {
    return (
      !newProps.aPlayers.equals(this.props.aPlayers) ||
      !newProps.bPlayers.equals(this.props.bPlayers)
    )
  }

  mouseToSvgCoordinates = (e) => {
    if (!this.svg || !this.pt) {
      return {x: e.clientX, y: e.clientY}
    }

    return mouseToSvgCoordinates(e, this.svg, this.pt)
  }

  getDOMNode = ({svg, pt}) => {
    this.svg = svg
    this.pt = pt
  }

  onAddPlayer = (e, svg, pt) => {
    if (this.props.isAddingPlayers === false) {
      return
    }
    const {x, y} = mouseToSvgCoordinates(e, svg, pt)
    this.props.addPlayer(x, y)
  }

  _onRotatePlayer = (e, svg, pt, player) => {
    let {x:mX, y:mY} = mouseToSvgCoordinates(e, svg, pt)
    let angle = player.get('angle')
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
    this.props.updatePlayer(player.get('id'), {angle})
  }

  _onDragPlayer = (e, svg, pt, player) => {
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
    this.props.updatePlayer(player.get('id'), {x: mX, y: mY})
  }

  onDragPlayer = throttle(this._onDragPlayer, 100)

  onRotatePlayer = throttle(this._onRotatePlayer, 100)

  render = () => (
    <Field
      deselectPlayer={this.props.deselectPlayer}
      onAddPlayer={this.onAddPlayer}
      onGetDOMNode={this.getDOMNode}>
      <Team className="TeamA" players={this.props.aPlayers}/>
      <Team className="TeamB" players={this.props.bPlayers}/>
    {this.svg && this.pt &&
      <SelectedItems mouseToSvgCoordinates={this.mouseToSvgCoordinates}/>
    }
    </Field>
  )
}

FieldContainer.propTypes = {
  aPlayers: T.instanceOf(List),
  bPlayers: T.instanceOf(List),
  addPlayer: T.func,
  deselectPlayer: T.func,
  isAddingPlayers: T.bool,
  updatePlayer: T.func,
}

const ConnectedFieldConatiner = connect(
  fieldSelector,
  fieldActions
)(FieldContainer)

ConnectedFieldConatiner.displayName = 'FieldContainer'

export default ConnectedFieldConatiner
