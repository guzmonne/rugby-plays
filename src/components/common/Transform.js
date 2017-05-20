import '../../_styles/Transform.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'
import {onlyUpdateForPropTypes} from 'recompose'
import getBoundingBox from '../../utils/getBoundingBox.js'

class Transform extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount = () => {
    this.setState({ready: true})
    if (this.props.getSVG){
      this.props.getSVG(this.svg)
    }
  }

  renderRotateHandler = () => {
    if (!this.svg) return
    const {scale} = this.props
    const {x, y, width, height} = getBoundingBox(this.svg, scale, 1)
    const x0 = x + width/2
    const y0 = y + height/2
    const y1 = y - height
    return (
      <g className="rotate-handler">
        <path d={`M${x0},${y0} ${x0},${y1}Z`} />
        <circle cx={x0} cy={y1} r={0.5}/>
        <circle className="transparent" cx={x0} cy={y1} r={1.5}/>
      </g>
    )
  }

  render = () => {
    const {ready} = this.state
    const {className, x, y, rotate, scale, selected, children} = this.props
    
    return (
      <g
        onClick={(e) => {
          e.stopPropagation()
          this.props.onClick(e)
        }}
        className={cn('Transform', className)}
        transform={`translate(${x}, ${y}) rotate(${rotate})`}>
        {ready && selected && this.renderRotateHandler()}
        <g ref={svg => this.svg = svg}
          className="children" 
          transform={`scale(${scale})`}>
          {children}
        </g>
      </g>
    )
  }
}

Transform.propTypes = {
  className: T.string,
  selected: T.bool,
  onClick: T.func,
  getSVG: T.func,
  x: T.oneOfType([T.string, T.number]),
  y: T.oneOfType([T.string, T.number]),
  scale: T.oneOfType([T.string, T.number]),
  rotate: T.oneOfType([T.string, T.number]),
}

Transform.defaultProps = {
  onClick: () => {},
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  selected: false,
}

export default onlyUpdateForPropTypes(Transform)
