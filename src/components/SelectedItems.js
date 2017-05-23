import React from 'react'
import T from 'prop-types'
import isFunction from 'lodash/isFunction.js'
import {onlyUpdateForKeys} from 'recompose'
import {Player} from '../store/records.js'
import PlayerTransform from './Field/PlayerTransform.js'
import BoundingBox from './common/BoundingBox.js'

const LEFT_BUTTON = 0

class SelectedItems extends React.Component {
  state = {
    svg: undefined,
  }

  componentDidMount() {
    if (this.svg) {
      this.setState({svg: this.svg})
    }
  }

  handleOnMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
    if (isFunction(this.props.onDragPlayerStart)) {
      this.props.onDragPlayerStart(e)
    }
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove = (e) => {
    e.stopPropagation()
    this.props.onDragPlayer(e)
  }

  handleMouseUp = (e) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  notEmpty = () => this.state.svg && this.props.player

  render = () => {
    const {player} = this.props
    return (
      <g className="SelectedItems"
        onClick={e => e.stopPropagation()}
        onMouseDown={this.handleOnMouseDown}>
        <g className="SelectedItems__Container"
          ref={svg => this.svg = svg}>
        {player &&
          <PlayerTransform player={player} />
        }
        </g>
      {this.notEmpty() &&
        <BoundingBox svg={this.state.svg} />
      }
      </g>
    )
  }
}

export const ISelectedItemsProps = {
  player: T.instanceOf(Player),
}

export const ISelectedItemsActions = {
  onDragPlayer: T.func,
  onDragPlayerStart: T.func,
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
