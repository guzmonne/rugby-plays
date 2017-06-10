/**
 * For the moment this component is not doing what its name implies. For now it
 * can only handle a single selected player, but in the future the idea is for
 * it to handle a selection of more than one element (players, gears, etc.)
 * 
 * This is why the names used inside the component might seem out of place.
 */
import React from 'react'
import throttle from 'lodash/throttle.js'
import {onlyUpdateForKeys} from 'recompose'
import Transform from '../common/Transform.js'
import Player from '../common/Player.js'
import BoundingBox from '../common/BoundingBox.js'
import RotateHandler from '../common/RotateHandler.js'
import propTypes, {ISelectedItemsProps} from './interface.js'

const LEFT_BUTTON = 0
const WIDTH = 90
const HEIGHT = 130

class SelectedItems extends React.Component {
  state = {
    length: 0,
    svg: undefined,
    rotating: false,
    x0: undefined,
    y0: undefined,
    cx: undefined,
    cy: undefined,
  }

  componentDidMount() {
    if (this.svg) {
      this.setState({svg: this.svg})
    }
  }

  handleRotateOnMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
    document.addEventListener('mousemove', this.handleRotateMouseMove)
    document.addEventListener('mouseup', this.handleRotateMouseUp)
    const {x:cx, y:cy} = this.svg.getBBox()
    this.setState(() => ({cx, cy, rotating: true}))
  }

  onRotate = (e) => {
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
    this.setState(() => ({
      length: Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
    }))
    this.props.updatePlayer(player.id, {angle})
  }

  throttledOnRotate = throttle(this.onRotate, 16)

  handleRotateMouseMove = (e) => {
    e.stopPropagation()
    this.throttledOnRotate(e)
  }

  handleRotateMouseUp = (e) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', this.handleRotateMouseMove)
    document.removeEventListener('mouseup', this.handleRotateMouseUp)
    this.setState(() => ({length: 0, rotating: false}))
  }

  handleDragOnMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
    document.addEventListener('mousemove', this.handleDragMouseMove)
    document.addEventListener('mouseup', this.handleDragMouseUp)
    const {x, y} = this.props.mouseToSvgCoordinates(e)
    const {player} = this.props
    this.setState(() => ({
      x0: Math.sign(player.x - x) * Math.abs(player.x - x),
      y0: Math.sign(player.y - y) * Math.abs(player.y - y),
    }))
  }

  onDrag = (e) => {
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

  throttledOnDrag = throttle(this.onDrag, 16)

  handleDragMouseMove = (e) => {
    e.stopPropagation()
    this.throttledOnDrag(e)
  }

  handleDragMouseUp = (e) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', this.handleDragMouseMove)
    document.removeEventListener('mouseup', this.handleDragMouseUp)
  }

  shouldShowTools = () => (
    this.state.svg && 
    this.props.player
  )

  render = () => {
    const {rotating, svg, length} = this.state
    const {player} = this.props
    return (
      <g className="SelectedItems" onClick={e => e.stopPropagation()}>
        <g className="SelectedItems__Container"
          ref={svg => this.svg = svg}>
        {player &&
          <Transform
            x={player.x}
            y={player.y}
            forceUpdate={player}
            scale={player.scale}
            angle={player.angle}>
            <Player 
              bodyFill={player.bodyFill}
              neckFill={player.neckFill}
              headFill={player.headFill}
              bodyStroke={player.bodyStroke}
            />
          </Transform>
        }
        </g>
      {this.shouldShowTools() &&
        <g className="SelectedItems__Tools">
          <g className="SelectedItems__Tools__RotateHandler"
            onMouseDown={this.handleRotateOnMouseDown}>
            <RotateHandler 
              svg={svg}
              angle={player.angle} 
              length={rotating ? length : 0}
            />
          </g>
          <g className="SelectedItems__Tools__BoundingBox"
            onMouseDown={this.handleDragOnMouseDown}>
            <BoundingBox svg={svg} />
          </g>
        </g>
      }
      </g>
    )
  }
}

SelectedItems.propTypes = propTypes

const PureSelectedItems = onlyUpdateForKeys(
  Object.keys(ISelectedItemsProps)
)(SelectedItems)

PureSelectedItems.displayName = 'PureSelectedItems'

export default PureSelectedItems
