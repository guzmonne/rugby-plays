import '../../_styles/Draggable.css'
import Perf from 'react-addons-perf'
import React from 'react'
import {Iterable} from 'immutable'
import T from 'prop-types'
import getBoundingBox from '../../utils/getBoundingBox.js'
import BoundingBox from './BoundingBox.js'

const LEFT_BUTTON = 0
const OFFSET = 1

const propTypes = [
  'selected',
  'rotate',
  'scale',
  'x',
  'y',
]

class Draggable extends React.Component {
  state = {
    svg: undefined,
  }

  componentDidUpdate = () => {
    console.log(`updated Draggable`)
  }

  shouldComponentUpdate = (newProps) => {
    const check = propTypes.every((key) => {
      const result = (
        Iterable.isIterable(newProps[key])
        ? newProps[key].equals(this.props[key])
        : newProps[key] === this.props[key]
      )
      return result
    })
    console.log('Draggable', newProps.playerId === newProps.selected || !check)
    return newProps.playerId === newProps.selected || !check
  }

  componentDidMount = () => {
    this.setState({ready: true})
    this.callGetSVG()
  }

  callGetSVG = (svg) => {
    if (this.props.onGetSVG){
      this.props.onGetSVG(svg || this.state.svg)
    }
  }

  onMouseDown = (e) => {
    if (e.button !== LEFT_BUTTON) return
    e.stopPropagation()
    Perf.start()
    this.props.onDragStart()
    this.addEvents()
  }

  onMouseMove = (e) => {
    if (this.props.selected) {
      this.props.onDrag(e)
    }
  }

  onMouseUp = () => {
    this.props.onDragStop()
    Perf.stop()
    Perf.printInclusive()
    Perf.printWasted()
    Perf.printOperations()
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
    if (!this.svg) return
    const {rotate, scale, x, y} = this.props
    const box = getBoundingBox(this.svg, scale, OFFSET)
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
    const {children, ...props} = this.props

    props.onGetSVG = (svg) => {
      if (!this.svg) {
        this.svg = svg
      }
      this.callGetSVG(svg)
    }

    if (props.selected && this.svg) {
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
  rotate: T.number,
  scale: T.number,
  selected: T.oneOfType([T.string, T.bool]),
  x: T.number,
  y: T.number,
}

Draggable.defaultProps = {
  onDragStart: () => {},
  onDragStop: () => {},
  onDrag: () => {},
}

export default Draggable
