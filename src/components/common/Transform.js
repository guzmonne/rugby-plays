import React from 'react'
import T from 'prop-types'
import {onlyUpdateForKeys} from 'recompose'

class Transform extends React.Component {
  componentDidMount() {
    console.log('transform mounted')
  }

  componentDidUpdate() {
    console.log('transform updated')
  }
  
  transform = () => {
    const {x, y, angle, scale} = this.props
    return [
      `translate(${x}, ${y})`,
      `rotate(${angle})`,
      `scale(${scale})`
    ].join(' ')
  }
  
  render = () => (
    <g transform={this.transform()}
      onClick={this.props.onClick}>
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
}

Transform.defaultProps = {
  onClick: () => {},
}

export default onlyUpdateForKeys(['x', 'y', 'angle', 'scale'])(Transform)
