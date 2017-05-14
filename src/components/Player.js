import React from "react"
import T from "prop-types"

const Player = ({neckFill, bodyFill, bodyStroke}) => (
  <svg 
    width="100%"
    height="100%"
    viewBox="0 0 147 92"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinecap: 'round',
      strokeLinejoint: 'round',
      strokeMilterLimit: 1.5,
    }}>
    <path 
      d="M113.207,78.66l6.2,0l0,-45.136l27.048,0l0,47.754l-8.599,10.093l-126.659,0l-10.697,-10.093l0,-47.754l27.047,0l0,45.136l6.201,0l0,-30.574l39.729,0l39.73,0l0,30.574Z" 
      style={{
        fill: bodyFill,
        stroke: bodyStroke,
        strokeWidth: '1px',
      }}
    />
    <g>
      <path 
        d="M89.686,52.527c0,-7.466 -6.062,-13.527 -13.527,-13.527l-5.363,0c-7.466,0 -13.527,6.061 -13.527,13.527l0,6.47c0,7.466 6.061,13.527 13.527,13.527l5.363,0c7.465,0 13.527,-6.061 13.527,-13.527l0,-6.47Z" style={{fill: neckFill}}
      />
      <path 
        d="M99.411,21.643c0,-11.945 -9.698,-21.643 -21.644,-21.643l-8.58,0c-11.945,0 -21.643,9.698 -21.643,21.643l0,23.762c0,11.945 9.698,21.644 21.643,21.644l8.58,0c11.946,0 21.644,-9.699 21.644,-21.644l0,-23.762Z"
      />
    </g>
  </svg>
)

Player.propTypes = {
  neckFill: T.string,
  bodyFill: T.string,
  bodyStroke: T.string,
}

Player.defaultProps = {
  neckFill: '#7200ff',
  bodyFill: '#fff',
  bodyStroke: '#000',
}

export default Player
