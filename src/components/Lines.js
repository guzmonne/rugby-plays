import React from "react"
import T from "prop-types"

const Lines = ({stroke}) => (
  <g className="lines" style={{stroke}}>
    <g className="ingoal">
      <path className="line"
        d="M9.58,15 L80.42,15z"
      />
      <path className="line"
        d="M5.292,113 L84.292,113z"
      />
    </g>
    <g className="twenty-two">
      <path className="line"
        d="M8.66,32 L81.33,32z"
      />
      <path className="line"
        d="M6.16,94 L83.83,94"
      />
    </g>
    <g className="middle-lines">
      <path className="dashed-line"
        d="M7.92,50 L82.08,50z"
      />
      <path className="line"
        d="M7.5,60 L82.5,60z"
      />
      <path className="dashed-line"
        d="M7.08,70.5 L82.92,70.5z"
      />
    </g>
    <g className="five-meters">
      <path className="dashed-line"
        d="M9.17,20 L80.83,20z"
      />
      <path className="dashed-line"
        d="M15,15 L11.392,113z"
      />
      <path className="dashed-line"
        d="M75,15 L78.592,113z"
      />
      <path className="dashed-line"
        d="M5.541,107 L84.458,107z"
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

export default Lines
