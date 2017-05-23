import React from 'react'
import throttle from 'lodash/throttle.js'
import {connect} from 'react-redux'
import {onlyUpdateForKeys} from 'recompose'
import SelectedItems, {
  ISelectedItems,
  ISelectedItemsProps,
} from '../components/SelectedItems.js'
import {selectedItemsSelector} from '../store/reducers.js'
import {selectedItemsActions} from '../store/actions.js'

const WIDTH = 90
const HEIGHT = 130

class SelectedItemsContainer extends React.Component {
  state = {
    x0: undefined,
    y0: undefined,
    length: 0,
  }

  shouldComponentUpdate(newProps) {
    return (newProps.player !== this.props.player)
  }

  setRotateCenter = (e, {x:cx, y:cy}) => {
    this.setState({cx, cy})
  }

  resetRotateHandlerLength = (e) => {
    console.log('resetRotateHandlerLength')
    this.setState(() => ({length: 0}))
  }

  setOffsetDragPoint = (e) => {
    const {x, y} = this.props.mouseToSvgCoordinates(e)
    const {player} = this.props
    this.setState({
      x0: Math.sign(player.x - x) * Math.abs(player.x - x),
      y0: Math.sign(player.y - y) * Math.abs(player.y - y),
    })
  }

  unthrottledOnRotatePlayer = (e) => {
    const {player} = this.props
    if (!player) return
    let angle = player.angle
    const {x, y} = this.props.mouseToSvgCoordinates(e)
    const {cx, cy} = this.state
    const a = Math.abs(cy - y) // Cateto opuesto
    const b = Math.abs(cx - x) // Cateto adyacente
    const alpha = Math.atan(a / b) * 180 / Math.PI // Angulo tangente
    if (x === cx) {
      angle = y < cy ? 0 : 180
    } else if (y === cy) {
      angle = x < cx ? -90 : 90
    } else if (x < cx) {
      angle = y < cy ? alpha - 90 : -alpha - 90
    } else if (x > cx) {
      angle = y < cy ? 90 - alpha : alpha + 90
    }
    this.setState({
      length: Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
    })
    this.props.updatePlayer(player.id, {angle})
  }

  unthrottledOnDragPlayer = (e) => {
    const {player} = this.props
    if (!player) return
    let {x:mX, y:mY} = this.props.mouseToSvgCoordinates(e)
    const {x0, y0} = this.state
    // Move new coordinates to main point
    mX += x0
    mY += y0
    // Limits
    if (mX < 0)      {mX = 0}
    if (mX > WIDTH)  {mX = WIDTH}
    if (mY < 0)      {mY = 0}
    if (mY > HEIGHT) {mY = HEIGHT}
    // Update
    this.props.updatePlayer(player.id, {x: mX, y: mY})
  }

  onRotatePlayer = throttle(this.unthrottledOnRotatePlayer, 16)

  onDragPlayer = throttle(this.unthrottledOnDragPlayer, 16)

  render = () => (
    <SelectedItems 
      player={this.props.player}
      length={this.state.length}
      onRotatePlayerStart={this.setRotateCenter}
      onRotatePlayer={this.onRotatePlayer}
      onRotatePlayerStop={this.resetRotateHandlerLength}
      onDragPlayerStart={this.setOffsetDragPoint}
      onDragPlayer={this.onDragPlayer}
    />
  )
}

SelectedItemsContainer.propTypes = ISelectedItems

const ConnectedSelectedItemsContainer = connect(
  selectedItemsSelector,
  selectedItemsActions
)(onlyUpdateForKeys(Object.keys(ISelectedItemsProps))(SelectedItemsContainer))

ConnectedSelectedItemsContainer.displayName = 'SelectedItemsContainer'

export default ConnectedSelectedItemsContainer
