import React from "react"
import T from "prop-types"
import {onlyUpdateForPropTypes} from 'recompose'

const Lines = ({stroke}) => (
  <g className="lines" style={{stroke}}>
    <g className="ingoal">
      <path className="line"
        d="M5,15 L85,15z"
      />
      <path className="line"
        d="M5,115 L85,115z"
      />
    </g>
    <g className="twenty-two">
      <path className="line"
        d="M5,37 L85,37z"
      />
      <path className="line"
        d="M5,93 L85,93"
      />
    </g>
    <g className="middle-lines">
      <path className="dashed-line"
        d="M5,55 L85,55z"
      />
      <path className="line"
        d="M5,65 L85,65z"
      />
      <path className="dashed-line"
        d="M5,75 L85,75z"
      />
    </g>
    <g className="five-meters">
      <path className="dashed-line"
        d="M5,20 L85,20z"
      />
      <path className="dashed-line"
        d="M10,15 L10,115z"
      />
      <path className="dashed-line"
        d="M80,15 L80,115z"
      />
      <path className="dashed-line"
        d="M5,110 L85,110z"
      />
    </g>
  </g>
)

Lines.propTypes = {
  stroke: T.string,
}

Lines.defaultProps = {
  stroke: '#fff',
}

const PureLines = onlyUpdateForPropTypes(Lines)

PureLines.displayName = 'PureLines'

export default PureLines
