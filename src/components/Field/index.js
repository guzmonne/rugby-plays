import '../../_styles/Field.css'
import React from 'react'
import T from 'prop-types'
import Posts from './Posts.js'
import Stripes from './Stripes.js'
import Lines from './Lines.js'
import Outline from './Outline.js'

class Field extends React.Component {
  state = {
    pt: undefined,
    svg: undefined,
  }

  componentDidMount() {
    const state = {
      svg: this.svg,
      pt: this.svg.createSVGPoint(),
    }
    this.setState(state)
    if (this.props.onGetDOMNode) {
      this.props.onGetDOMNode(state)
    }
  }

  render = () => {
    const {svg, pt} = this.state
    const {deselectPlayer, onAddPlayer, children} = this.props

    return (
      <svg className="Field" 
        viewBox="0 0 90 130" 
        preserveAspectRatio="none"
        ref={(svg) => this.svg = svg}
        onClick={deselectPlayer}>
        <Stripes />
        <Outline onClick={(e) => onAddPlayer(e, svg, pt)} />
        <Lines />
        <Posts />
        {children}
      </svg>
    )
  }
}

Field.propTypes = {
  onGetDOMNode: T.func,
  deselectPlayer: T.func,
  onAddPlayer: T.func,
}

export default Field
