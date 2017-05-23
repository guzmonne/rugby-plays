import React from 'react'
import T from 'prop-types'
import {shouldUpdate} from 'recompose'

const Outline = ({onClick}) => (
  <g className="outline" 
    onClick={onClick}
  >
    <path className="line" 
      d="M5,5 L85,5 L85,125 L5,125z"
    />
  </g>
)

Outline.propTypes = {
  onClick: T.func,
}

Outline.defaultProps = {
  onClick: () => {},
}

export default shouldUpdate(() => true)(Outline)
