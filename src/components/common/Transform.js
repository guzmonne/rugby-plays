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

  render = () => {
    const {className, x, y, rotate:r, scale, onMouseDown, children} = this.props

    let x0 = 0
    let y0 = 0

    if (this.svg) {
      const box = getBoundingBox(this.svg, scale)
      x0 = box.x + box.width / 2
      y0 = box.y + box.height / 2 
    }
    
    return (
      <g className={cn('Transform', className)}
        ref={svg => this.svg = svg}
        onMouseDown={e => {
          e.stopPropagation()
          onMouseDown(e)
        }}
        onClick={(e) => {
          e.stopPropagation()
          this.props.onClick(e)
        }}
        transform={
          `translate(${x}, ${y}) rotate(${r}, ${x0}, ${y0}) scale(${scale})`
        }>
        {children}
      </g>
    )
  }
}

Transform.propTypes = {
  className: T.string,
  selected: T.bool,
  onClick: T.func,
  onMouseDown: T.func,
  getSVG: T.func,
  x: T.oneOfType([T.string, T.number]),
  y: T.oneOfType([T.string, T.number]),
  scale: T.oneOfType([T.string, T.number]),
  rotate: T.oneOfType([T.string, T.number]),
}

Transform.defaultProps = {
  onClick: () => {},
  onMouseDown: () => {},
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  selected: false,
}

export default onlyUpdateForPropTypes(Transform)
