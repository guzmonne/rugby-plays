import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const LEFT_BUTTON = 0
const DRAG_THRESHOLD = 3 // pixels

class Draggable extends React.Component {
  state = {
    mouseDown: false,
    dragging: false,
  }

  component = undefined

  onMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON || !this.component) return
    e.stopPropagation()
    this.addEvents()
    const pageOffset = this.component.getBoundingClientRect()
    this.setState({
      mouseDown: true,
      originX: event.pageX,
      originY: event.pageY,
      elementX: pageOffset.left,
      elementY: pageOffset.top,
    })
  }

  onMouseMove = (e) => {
    const {originX, originY, elementX, elementY, dragging} = this.state
    const deltaX = e.pageX - originX
    const deltaY = e.pageY - originY
    const distance = Math.abs(deltaX) + Math.abs(deltaY)
    // Call onDragStart.
    if (dragging === false && distance > DRAG_THRESHOLD) {
      this.setState({dragging: true})
      this.props.onDragStart()
    }
    // Drag element
    if (dragging === true) {
      this.props.onDrag({
        x: elementX + deltaX + document.body.scrollLeft,
        y: elementY + deltaY + document.body.scrollTop,
      })
    }
  }

  onMouseUp = () => {
    this.removeEvents()
    const state = {mouseDown: false}
    if (this.state.dragging === true) {
      this.props.onDragStop()
      state.dragging = false
    }
    this.setState(state)
  }

  addEvents = () => {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  removeEvents = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  render = () => {
    const {children, ...props} = this.props
    return (
      <g ref={c => this.component = c}>
      {
        React.cloneElement(children, {
          ...props,
          ...{
            onMouseDown: this.onMouseDown,
            className: cn(this.props.className, {
              dragging: this.state.dragging === true,
            })
          }
        })
      }
      </g>
    )
  }
}

Draggable.propTypes = {
  onDragStart: T.func,
  onDragStop: T.func,
  onDrag: T.func,
}

Draggable.defaultProps = {
  onDragStart: () => {},
  onDragStop: () => {},
  onDrag: () => {},
}

export default Draggable
