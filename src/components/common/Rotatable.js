import '../../_styles/Rotatable.css'
import React from 'react'
import {Iterable} from 'immutable'
import T from 'prop-types'
import getBoundingBox from '../../utils/getBoundingBox.js'

const LEFT_BUTTON = 0

const propTypes = [
  'playerId',
  'selected',
  'scale',
  'rotate',
  'x',
  'y',
]

class Rotatable extends React.Component {
  state = {
    svg: undefined,
  }

  shouldComponentUpdate = (newProps) => {
    const check = propTypes.every((key) => {
      if (key === 'selected' || key === 'playerId') {
        console.log(newProps[key], this.props[key])
      }
      const result = (
        Iterable.isIterable(newProps[key])
        ? newProps[key].equals(this.props[key])
        : newProps[key] === this.props[key]
      )
      return result
    })
    console.log('Rotatable', !check)
    return !check
  }

  componentDidUpdate = () => {
    console.log(`updated Rotatable`)
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
    this.props.onRotateStart()
    this.addEvents()
  }

  onMouseMove = (e) => {
    if (this.props.selected) {
      this.props.onRotate(e)
    }
  }

  onMouseUp = () => {
    this.props.onRotateStop()
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

  renderRotateHandler = (children, props) => {
    if (!this.state.svg) return
    const {scale, rotate, x, y} = this.props
    const box = getBoundingBox(this.state.svg, scale, 1)
    const x0 = x + box.x + box.width/2
    const y0 = y + box.y + box.height/2
    const y1 = y + box.y - box.height
    return (
      <g className="Rotatable" onMouseDown={this.onMouseDown}>
        <g className="handler"
          transform={`rotate(${rotate}, ${x0}, ${y0})`}>
          <path d={`M${x0},${y0} ${x0},${y1}Z`} />
          <circle cx={x0} cy={y1} r={0.5}/>
          <circle className="transparent" cx={x0} cy={y1} r={1.5}/>
        </g>
        {React.cloneElement(children, props)}
      </g>
    )
  }

  render = () => {
    const {children, selected, ...props} = this.props
    
    if (!this.state.svg) {
      props.onGetSVG = svg => {
        this.setState({svg})
        this.callGetSVG(svg)
      }
    }

    if (this.state.svg && selected) {
      return this.renderRotateHandler(children, props)
    }

    return (
      <g className="Rotatable">
        {React.cloneElement(children, props)}
      </g>
    )
  }
}

Rotatable.propTypes = {
  onRotateStart: T.func,
  onRotateStop: T.func,
  onRotate: T.func,
  selected: T.oneOfType([T.string, T.bool]),
}

Rotatable.defaultProps = {
  onRotateStart: () => {},
  onRotateStop: () => {},
  onRotate: () => {},
}

export default Rotatable
