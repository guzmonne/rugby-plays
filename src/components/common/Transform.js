import '../../_styles/Transform.css'
import React from 'react'
import T from 'prop-types'
import cn from 'classnames'

const OFFSET = 1

class Transform extends React.Component {
  state = {
    ready: false
  }

  componentDidMount = () => {
    this.setState({ready: true})
  }

  boundingBox = () => {
    if (!this.svg) return
    const {scale} = this.props
    const bbox = this.svg.getBBox()
    const x = bbox.x * scale
    const y = bbox.y * scale
    const width = bbox.width * scale
    const height = bbox.height * scale
    return (
      <g className={'tools'}>
        <rect
          x={x - OFFSET}
          y={y - OFFSET}
          width={width + 2 * OFFSET}
          height={height + 2 * OFFSET}
        />
        <g>
          <circle cx={x - OFFSET} cy={y - OFFSET} r={0.5}/>
          <circle cx={x - OFFSET} cy={y + height + OFFSET} r={0.5}/>
          <circle cx={x + width + OFFSET} cy={y + height + OFFSET} r={0.5}/>
          <circle cx={x + width + OFFSET} cy={y - OFFSET} r={0.5}/>
        </g>
      </g>
    )
  }

  render = () => {
    const {ready} = this.state
    const {className, x, y, rotate, scale, selected, children} = this.props
    
    return (
      <g
        onClick={this.props.onClick}
        className={cn('Transform', className)}
        transform={`translate(${x}, ${y}) rotate(${rotate})`}
        onMouseEnter={this.toggleHovering}
        onMouseLeave={this.toggleHovering}>
        {ready && selected && this.boundingBox()}
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
