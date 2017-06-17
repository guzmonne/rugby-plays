/**
 * For the moment this component is not doing what its name implies. For now it
 * can only handle a single selected player, but in the future the idea is for
 * it to handle a selection of more than one element (players, gears, etc.)
 * 
 * This is why the names used inside the component might seem out of place.
 */
import React from 'react'
import {onlyUpdateForKeys} from 'recompose'
import Transform from '../common/Transform/'
import Player from '../common/Player/'
import RotateHandler from '../RotateHandler/'
import DraggingBox from '../DraggingBox/'
import propTypes, {ISelectedItemsProps} from './interface.js'

const WIDTH = 90
const HEIGHT = 130

class SelectedItems extends React.Component {
  state = {
    svg: undefined,
    cx: undefined,
    cy: undefined,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }

  componentDidUpdate(prevProps) {
    if (!this.props.players.equals(prevProps.players)) {
      const {x, y, width, height} = this.svg.getBBox()
      this.setState({
        x,
        y,
        width,
        height,
        xDiff: 0,
        yDiff: 0,
      })
    }
  }

  onRotateUpdate = (angle) => {
    this.props.players.forEach(player => (
      this.props.updatePlayer(player.id, {angle})
    ))
  }

  onDragUpdate = (xDiff, yDiff) => {
    this.props.players.forEach(player => {
      let x = player.x + xDiff
      let y = player.y + yDiff
      if (x < 0)      {x = 0}
      if (x > WIDTH)  {x = WIDTH}
      if (y < 0)      {y = 0}
      if (y > HEIGHT) {y = HEIGHT}
      this.props.updatePlayer(player.id, {x, y})
    })
  }

  getBoundingBoxCenter = () => {
    if (!this.svg) return {cx: 0, cy: 0}
    const {x, y, width, height} = this.svg.getBBox()
    return {
      cx: x + width / 2,
      cy: y + height / 2,
    }
  }

  shouldShowTools = () => (
    this.svg && 
    this.props.players &&
    this.props.players.size > 0
  )

  render = () => {
    const {cx, cy} = this.getBoundingBoxCenter()
    const {x, y, width, height} = this.state
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
        {players.size === 1 &&
          <RotateHandler
            onUpdate={this.onRotateUpdate}
            mouseToSvgCoordinates={this.props.mouseToSvgCoordinates}
            angle={players.get(0).angle}
            cx={cx}
            cy={cy}
            x={x}
            y={y}
            width={width}
            height={height}
          />
        }  
          <DraggingBox
            onUpdate={this.onDragUpdate}
            mouseToSvgCoordinates={this.props.mouseToSvgCoordinates}
            x={x}
            y={y}
            width={width}
            height={height}
          />
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
