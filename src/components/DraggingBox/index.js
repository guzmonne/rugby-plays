import React from 'react'
import throttle from 'lodash/throttle.js'
import {onlyUpdateForKeys} from 'recompose'
import IDraggingBox, {
  IDraggingBoxProps,
  IDraggingBoxActions
} from './interface.js'
import BoundingBox from '../common/BoundingBox/'

const LEFT_BUTTON = 0
const FPS = 24
const MILLISECONDS = 1000

class DraggingBox extends React.Component {
  state = {
    x: 0,
    y: 0,
    xDiff: 0,
    yDiff: 0,
    dragging: false,
  }

  componentDidMount() {
    this.setState({
      x: this.props.x,
      y: this.props.y,
    })
  }

  componentWillReceiveProps({x, y}) {
    if (x !== this.props.x || y !== this.props.y) {
      this.setState({x, y})
    }
  }

  onMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON || this.state.dragging === true) return
    e.stopPropagation()
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    const {x:x0, y:y0} = this.props.mouseToSvgCoordinates(e)
    this.x0 = x0
    this.y0 = y0
    this.setState({dragging: true})
  }

  onDrag = (e) => {
    // Point of pressure
    const {x0, y0} = this
    // Current mouse point
    const {x:x1, y:y1} = this.props.mouseToSvgCoordinates(e)
    // Difference between center and current mouse point
    const xDiff = x1 - x0
    const yDiff = y1 - y0
    this.setState(({x, y, dragging, xDiff:xDiff0, yDiff:yDiff0}) => {
      if (dragging === false) return
      return {
        x: x + xDiff - xDiff0,
        y: y + yDiff - yDiff0,
        xDiff,
        yDiff,
      }
    })
  }

  onMouseMove = (e) => {
    e.stopPropagation()
    this.throttledOnDrag(e)
  }

  onMouseUp = (e) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    this.setState(({xDiff, yDiff}) => {
      this.props.onUpdate(xDiff, yDiff)
      return {
        xDiff: 0,
        yDiff: 0,
        dragging: false,
      }
    })
  }

  throttledOnDrag = throttle(this.onDrag, MILLISECONDS / FPS)

  render() {
    const {x, y} = this.state
    const {width, height} = this.props
    return (
      <g className="SelectedItems__Tools__BoundingBox"
        onMouseDown={this.onMouseDown}>
        <BoundingBox
          x={x}
          y={y}
          width={width}
          height={height}
          angle={0}
        />
      </g>
    ) 
  }
}

DraggingBox.propTypes = IDraggingBox

const PureDraggingBox = onlyUpdateForKeys(
  Object.keys(IDraggingBoxProps)
)(DraggingBox)

PureDraggingBox.displayName = 'PureDraggingBox'

export default DraggingBox

export {IDraggingBox, IDraggingBoxProps, IDraggingBoxActions}
