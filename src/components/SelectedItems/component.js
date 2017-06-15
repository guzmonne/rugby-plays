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
import Transform from '../common/Transform/'
import Player from '../common/Player/'
import BoundingBox from '../common/BoundingBox/'
import RotateHandler from '../common/RotateHandler/'
import propTypes, {ISelectedItemsProps} from './interface.js'

const LEFT_BUTTON = 0
const WIDTH = 90
const HEIGHT = 130
const FPS = 24

class SelectedItems extends React.Component {
  xDiff = 0
  yDiff = 0

  defaultBox = {x: 0, y:0, width: 0, height: 0}

  state = {
    angle: 0,
    length: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    svg: undefined,
    x0: undefined,
    y0: undefined,
    cx: undefined,
    cy: undefined,
  }

  componentDidUpdate(prevProps) {
    if (!this.props.players.equals(prevProps.players)) {
      console.log('Different players')
      const {x, y, width, height} = this.svg.getBBox()
      this.setState({x, y, width, height})
    }
  }

  componentWillReceiveProps({players:nextPlayers}) {
    const {players:prevPlayers} = this.props
    if (nextPlayers !== prevPlayers) {
      this.setHandlerAngle(nextPlayers)
    }
  }

  calculateHandlerAngle = (players) => players.reduce((acc, player) => (
    acc + player.angle
  ), 0) / players.size

  setHandlerAngle = (players) => {
    this.setState({
      angle: this.calculateHandlerAngle(players)
    })
  }

  calculateRotateHandlerLength = () => {
    const {width, height} = this.svg.getBBox()
    return Math.max(width, height)
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
    const {x, y} = this.props.mouseToSvgCoordinates(e)
    const {cx, cy} = this.state
    let {angle} = this.state
    const a = Math.abs(cy - y) // Cateto opuesto
    const b = Math.abs(cx - x) // Cateto adyacente
    const alpha = Math.atan(a / b) * 180 / Math.PI // Angulo tangente
    if (x === cx) {
      angle = y < cy ? 0 : 180
    } else if (y === cy) {
      angle = x < cx ? 270 : 90
    } else if (x < cx) {
      angle = y < cy ? 270 + alpha : 270 - alpha
    } else if (x > cx) {
      angle = y < cy ? 90 - alpha : alpha + 90
    }
    this.setState(() => ({
      angle,
      length: Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)),
    }))
    this.props.players.forEach(player => (
      this.props.updatePlayer(player.id, {angle})
    ))
  }

  throttledOnRotate = throttle(this.onRotate, 1000 / FPS)

  handleRotateMouseMove = (e) => {
    e.stopPropagation()
    this.throttledOnRotate(e)
  }

  handleRotateMouseUp = (e) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', this.handleRotateMouseMove)
    document.removeEventListener('mouseup', this.handleRotateMouseUp)
    this.setState({
      length: this.calculateRotateHandlerLength()
    })
  }

  handleDragOnMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
    document.addEventListener('mousemove', this.handleDragMouseMove)
    document.addEventListener('mouseup', this.handleDragMouseUp)
    const {x:x0, y:y0} = this.props.mouseToSvgCoordinates(e)
    this.x0 = x0
    this.y0 = y0
  }

  onDrag = (e) => {
    const {players, mouseToSvgCoordinates} = this.props
    const {x0, y0} = this
    const {x:x1, y:y1} = mouseToSvgCoordinates(e)
    let xDiff = x1 - x0
    let yDiff = y1 - y0
    players.forEach(player => {
      let x = player.x + xDiff
      let y = player.y + yDiff
      if (x < 0)      {x = 0}
      if (x > WIDTH)  {x = WIDTH}
      if (y < 0)      {y = 0}
      if (y > HEIGHT) {y = HEIGHT}
      this.props.updatePlayer(player.id, {x, y})
    })
    this.x0 += xDiff
    this.y0 += yDiff
  }

  throttledOnDrag = throttle(this.onDrag, 1000 / FPS)

  handleDragMouseMove = (e) => {
    e.stopPropagation()
    this.throttledOnDrag(e)
  }

  handleDragMouseUp = (e) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', this.handleDragMouseMove)
    document.removeEventListener('mouseup', this.handleDragMouseUp)
    this.xDiff = 0
    this.yDiff = 0
  }

  shouldShowTools = () => (
    this.svg && 
    this.props.players &&
    this.props.players.size > 0
  )

  render = () => {
    const {length, angle, x, y, width, height} = this.state
    const {players} = this.props

    return (
      <g className="SelectedItems" onClick={e => e.stopPropagation()}>
        <g className="SelectedItems__Container"
          ref={svg => !this.svg && (this.svg = svg)}>
        {players.size > 0 && players.map(player => (
          <Transform key={player.id}
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
        ))}
        </g>
      {this.shouldShowTools() &&
        <g className="SelectedItems__Tools">
          <g className="SelectedItems__Tools__RotateHandler"
            onMouseDown={this.handleRotateOnMouseDown}>
            <RotateHandler 
              x={x}
              y={y}
              width={width}
              height={height}
              angle={angle} 
              length={length}
            />
          </g>
          <g className="SelectedItems__Tools__BoundingBox"
            onMouseDown={this.handleDragOnMouseDown}>
            <BoundingBox
              x={x}
              y={y}
              width={width}
              height={height}
            />
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
