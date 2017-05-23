import '../../_styles/BoundingBox.css'
import React from 'react'
import T from 'prop-types'

class BoundingBox extends React.Component {
  renderBoundingBox = () => {
    if (!this.props.svg) return <none />
    const {svg, offset} = this.props
    let {x, y, width, height} = svg.getBBox()
    x -= offset
    y -= offset
    width += 2 * offset
    height += 2 * offset
    return (
      <g>
        <rect className="BoundingBox__Rect"
          x={x}
          y={y}
          width={width}
          height={height}
        />
        <g className="BoundingBox__Circles">
          <circle cx={x} cy={y} r={0.5}/>
          <circle cx={x} cy={y + height} r={0.5}/>
          <circle cx={x + width} cy={y + height} r={0.5}/>
          <circle cx={x + width} cy={y} r={0.5}/>
        </g>
      </g>
    )
  }

  render = () => {
    const {svg} = this.props 
    
    return (
      <g className="BoundingBox" ref={svg => this.svg = svg}>
        {svg && this.renderBoundingBox()}
      </g>
    )
  }
}

BoundingBox.propTypes = {
  svg: T.element,
  offset: T.number,
}

BoundingBox.defaultProps = {
  offset: 1,
}

export default BoundingBox
