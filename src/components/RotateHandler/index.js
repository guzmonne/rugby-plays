import React from 'react'
import throttle from 'lodash/throttle.js'
import {onlyUpdateForKeys} from 'recompose'
import Handler from '../common/Handler/'
import IRotateHandler, {
  IRotateHandlerProps,
  IRotateHandlerActions
} from './interface.js'

const LEFT_BUTTON = 0
const FPS = 24

class RotateHandler extends React.Component {
  state = {
    angle: 0,
    rotating: false,
  }

  componentDidMount() {
    this.setState({angle: this.props.angle})
  }

  componentWillReceiveProps({angle}) {
    if (angle !== this.props.angle) {
      this.setState({angle})
    }
  }

  onMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
    this.setState({rotating: true})
  }

  onRotate = (e) => {
    const {x, y} = this.props.mouseToSvgCoordinates(e)
    const {cx, cy} = this.props
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
    this.setState({angle})
  }

  onMouseMove = (e) => {
    e.stopPropagation()
    this.throttledOnRotate(e)
  }

  onMouseUp = (e) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
    this.props.onUpdate(this.state.angle)    
    this.setState({rotating: false})
  }

  throttledOnRotate = throttle(this.onRotate, 1000 / FPS)

  render() {
    const {x, y, width, height} = this.props
    const {angle, rotating} = this.state
    return (
      <g className="SelectedItems__Tools__Handler"
        onMouseDown={this.onMouseDown}>
        <Handler 
          x={x}
          y={y}
          width={width}
          height={height}
          angle={angle}
          rotating={rotating}
        />
      </g>
    )
  }
}

RotateHandler.propTypes = IRotateHandler

const PureRotateHandler = onlyUpdateForKeys(
  Object.keys(IRotateHandlerProps)
)(RotateHandler)

PureRotateHandler.displayName = 'PureRotateHandler'

export default PureRotateHandler

export {
  IRotateHandler,
  IRotateHandlerProps,
  IRotateHandlerActions
}
