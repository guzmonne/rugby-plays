import React from 'react'
import T from 'prop-types'
import throttle from 'lodash/throttle.js'

const LEFT_BUTTON = 0

class Draggable extends React.Component {
  onMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    this.props.onDragStart()
    this.addEvents()
  }

  onMouseMove = (e) => {
    if (this.props.draggable) {
      this.props.onDrag(e)
    }
  }

  onMouseUp = () => {
    this.props.onDragStop()
    this.removeEvents()
  }

  throttledOnMouseMove = throttle(this.onMouseMove, 10)

  addEvents = () => {
    document.addEventListener('mousemove', this.throttledOnMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  removeEvents = () => {
    document.removeEventListener('mousemove', this.throttledOnMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  render = () => {
    const {children, ...props} = this.props
    return (
      <g className="draggable"
        onMouseDown={this.onMouseDown}>
         {React.cloneElement(children, props)}
      </g>
    )
  }
}

Draggable.propTypes = {
  onDragStart: T.func,
  onDragStop: T.func,
  onDrag: T.func,
  draggable: T.bool,
}

Draggable.defaultProps = {
  onDragStart: () => {},
  onDragStop: () => {},
  onDrag: () => {},
  draggable: false,
}

export default Draggable
