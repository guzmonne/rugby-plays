import '../../_styles/Draggable.css'
import React from 'react'
import T from 'prop-types'
import {onlyUpdateForPropTypes} from 'recompose'
import getBoundingBox from '../../utils/getBoundingBox.js'
import BoundingBox from './BoundingBox.js'

const LEFT_BUTTON = 0
const OFFSET = 1

class Draggable extends React.Component {
  state = {
    svg: undefined,
  }

  componentDidMount = () => {
    this.setState({ready: true})
    this.callGetSVG()
  }

  callGetSVG = (svg) => {
    if (this.props.getSVG){
      this.props.getSVG(svg || this.state.svg)
    }
  }

  onMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
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

  addEvents = () => {
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)
  }

  removeEvents = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }

  renderBoundingBox = (children, props) => {
    if (!this.state.svg) return
    const {rotate, scale, x, y} = this.props
    const box = getBoundingBox(this.state.svg, scale, OFFSET)
    box.x = x + box.x
    box.y = y + box.y
    props.onMouseDown = this.onMouseDown
    return (
      <g className="Draggable">
        <BoundingBox {...box} 
          onMouseDown={this.onMouseDown}
          transform={`rotate(${
            rotate
          }, ${
            box.x + box.width/2
          }, ${
            box.y + box.height/2
          })`}
        />
        {React.cloneElement(children, props)}
      </g>
    )
  }

  render = () => {
    const {children, draggable, ...props} = this.props
    
    if (!this.state.svg) {
      props.getSVG = svg => {
        this.setState({svg})
        this.callGetSVG(svg)
      }
    }

    if (this.state.svg && draggable) {
      return this.renderBoundingBox(children, props)
    }

    return (
      <g className="Draggable">
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
}

export default onlyUpdateForPropTypes(Draggable)
