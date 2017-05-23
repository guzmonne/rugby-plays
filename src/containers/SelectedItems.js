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
  }

  shouldComponentUpdate(newProps) {
    return (newProps.player !== this.props.player)
  }

  setOffsetDragPoint = (e) => {
    console.log('setOffsetDragPoint')
    const {x, y} = this.props.mouseToSvgCoordinates(e)
    const {player} = this.props
    this.setState({
      x0: Math.sign(player.x - x) * Math.abs(player.x - x),
      y0: Math.sign(player.y - y) * Math.abs(player.y - y),
    })
  }

  unthrottledOnDragPlayer = (e) => {
    const {player} = this.props
    let {x:mX, y:mY} = this.props.mouseToSvgCoordinates(e)
    const {x0, y0} = this.state
    console.log(x0, y0)
    // Move new coordinates to main point
    mX += x0
    mY += y0
    // Limits
    if (mX < 0)      {mX = 0}
    if (mX > WIDTH)  {mX = WIDTH}
    if (mY < 0)      {mY = 0}
    if (mY > HEIGHT) {mY = HEIGHT}
    // Update
    this.props.updatePlayer(player.get('id'), {x: mX, y: mY})
  }

  onDragPlayer = throttle(this.unthrottledOnDragPlayer, 16)

  render = () => (
    <SelectedItems 
      player={this.props.player}
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
