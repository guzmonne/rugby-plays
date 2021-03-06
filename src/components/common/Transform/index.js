import './_style.css'
import React from 'react'
import T from 'prop-types'
import {onlyUpdateForKeys} from 'recompose'

class Transform extends React.Component {
  state = {
    svg: null
  }

  componentDidMount() {
    this.setState({svg: this.svg})
  }

  transform = () => {
    const {x, y, angle, scale} = this.props
    const transformArray = [
      `translate(${x}, ${y})`,
      `scale(${scale})`
    ]

    if (this.svg) {
      const box = this.svg.getBBox()
      transformArray.push(
        `rotate(${angle}${
          box ? `, ${box.x + box.width / 2}, ${box.y + box.height / 2}`: ''
        })`
      )
    }

    return transformArray.join(' ')
  }
  
  render = () => (
    <g className="Transform" 
      transform={this.transform()}
      onClick={this.props.onClick}
      ref={svg => this.svg = svg}>
      {this.props.children} 
    </g>
  )
}

Transform.propTypes = {
  onClick: T.func,
  x: T.number,
  y: T.number,
  angle: T.number,
  scale: T.number,
  // This prop is a hack to improve the performance of the app.
  forceUpdate: T.any,
}

Transform.defaultProps = {
  onClick: () => {},
}

const PureTransform = onlyUpdateForKeys([
  'x',
  'y',
  'angle',
  'scale',
  'forceUpdate',
])(Transform)

PureTransform.displayName = 'PureTransform'

export default PureTransform
