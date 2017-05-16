import '../../_styles/Transform.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'
//import throttle from 'lodash/throttle.js'

const OFFSET = 1

class Transform extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount = () => {
    this.setState({ready: true})
  }
  
  getBoundingBox = () => {
    const {scale} = this.props
    const bbox = this.svg.getBBox()
    const x = bbox.x * scale - OFFSET
    const y = bbox.y * scale - OFFSET
    const width = bbox.width * scale + 2 * OFFSET
    const height = bbox.height * scale + 2 * OFFSET
    return {x, y, width, height}
  }

  renderBoundingBox = () => {
    if (!this.svg) return
    const {x, y, width, height} = this.getBoundingBox()
    return (
      <g className={'tools'}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
        />
        <g>
          <circle cx={x} cy={y} r={0.5}/>
          <circle cx={x} cy={y + height} r={0.5}/>
          <circle cx={x + width} cy={y + height} r={0.5}/>
          <circle cx={x + width} cy={y} r={0.5}/>
        </g>
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
        {ready && selected && this.renderBoundingBox()}
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

export default Transform
