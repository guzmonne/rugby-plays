import React from 'react'
import T from 'prop-types'

const Outline = ({onClick}) => (
  <g className="outline" 
    onClick={onClick}
  >
    <path className="line" 
      d="M10,5 L80,5 L85,125 L5,125z"
    />
  </g>
)

Outline.propTypes = {
  onClick: T.func,
}

Outline.defaultProps = {
  onClick: () => {},
}

export default Outline
