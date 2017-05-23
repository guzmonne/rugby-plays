import React from 'react'
import T from 'prop-types'
import isFunction from 'lodash/isFunction.js'
import {onlyUpdateForKeys} from 'recompose'
import {Player} from '../store/records.js'
import PlayerTransform from './Field/PlayerTransform.js'
import BoundingBox from './common/BoundingBox.js'
import RotateHandler from './common/RotateHandler.js'

const LEFT_BUTTON = 0

class SelectedItems extends React.Component {
  state = {
    svg: undefined,
    rotating: false,
  }

  componentDidMount() {
    if (this.svg) {
      this.setState({svg: this.svg})
    }
  }

  handleRotateOnMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
    if (isFunction(this.props.onRotatePlayerStart)){
      const {x, y} = this.svg.getBBox()
      this.props.onRotatePlayerStart(e, {x, y})
    }
    document.addEventListener('mousemove', this.handleRotateMouseMove)
    document.addEventListener('mouseup', this.handleRotateMouseUp)
    this.setState({rotating: true})
  }

  handleRotateMouseMove = (e) => {
    e.stopPropagation()
    this.props.onRotatePlayer(e)
  }

  handleRotateMouseUp = (e) => {
    e.stopPropagation()
    if (isFunction(this.props.onRotatePlayerStop)){
      this.props.onRotatePlayerStop(e)
    }
    document.removeEventListener('mousemove', this.handleRotateMouseMove)
    document.removeEventListener('mouseup', this.handleRotateMouseUp)
    this.setState({rotating: false})
  }

  handleDragOnMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
    if (isFunction(this.props.onDragPlayerStart)) {
      this.props.onDragPlayerStart(e)
    }
    document.addEventListener('mousemove', this.handleDragMouseMove)
    document.addEventListener('mouseup', this.handleDragMouseUp)
  }

  handleDragMouseMove = (e) => {
    e.stopPropagation()
    this.props.onDragPlayer(e)
  }

  handleDragMouseUp = (e) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', this.handleDragMouseMove)
    document.removeEventListener('mouseup', this.handleDragMouseUp)
  }

  notEmpty = () => (
    this.state.svg && 
    this.props.player && 
    this.props.player.angle
  )

  render = () => {
    const {rotating, svg} = this.state
    const {player, length} = this.props
    return (
      <g className="SelectedItems" onClick={e => e.stopPropagation()}>
        <g className="SelectedItems__Container"
          ref={svg => this.svg = svg}>
        {player &&
          <PlayerTransform player={player} />
        }
        </g>
      {this.notEmpty() &&
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

export const ISelectedItemsProps = {
  player: T.instanceOf(Player),
  length: T.number,
}

export const ISelectedItemsActions = {
  onDragPlayer: T.func,
  onDragPlayerStart: T.func,
  onRotatePlayer: T.func,
  onRotatePlayerStart: T.func,
  onRotatePlayerStop: T.func,
}

export const ISelectedItems = {
  ...ISelectedItemsProps,
  ...ISelectedItemsActions,
}

SelectedItems.propTypes = ISelectedItems

const PureSelectedItems = onlyUpdateForKeys(
  Object.keys(ISelectedItemsProps)
)(SelectedItems)

PureSelectedItems.displayName = 'SelectedItems'

export default PureSelectedItems
