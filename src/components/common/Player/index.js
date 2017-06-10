import React from "react"
import IPlayer from './interface.js'
import {pure} from 'recompose'

const Player = ({neckFill, bodyFill, headFill, bodyStroke}) => (
  <g className="Player">
    <path 
      d="M24.426,22.021l1.315,0l0,-9.61l5.736,0l0,10.167l-1.823,2.149l-26.859,0l-2.268,-2.149l0,-10.167l5.735,0l0,9.61l1.315,0l0,-6.51l8.425,0l8.424,0l0,6.51Z"
      style={{
        fill: bodyFill,
        stroke: bodyStroke,
        strokeWidth: '1px',
      }}
    />
    <g className="body">
      <path 
        d="M19.439,16.445c0,-1.583 -1.286,-2.868 -2.869,-2.868l-1.137,0c-1.583,0 -2.868,1.285 -2.868,2.868l0,1.401c0,1.583 1.285,2.868 2.868,2.868l1.137,0c1.583,0 2.869,-1.285 2.869,-2.868l0,-1.401Z" style={{fill: neckFill}}
      />
      <path 
        d="M21.501,9.862c0,-2.533 -2.056,-4.589 -4.589,-4.589l-1.82,0c-2.533,0 -4.59,2.056 -4.59,4.589l0,5.097c0,2.533 2.057,4.59 4.59,4.59l1.82,0c2.533,0 4.589,-2.057 4.589,-4.59l0,-5.097Z"
        style={{fill: headFill}}
      />
    </g>
  </g>
)

Player.propTypes = IPlayer

const PurePlayer = pure(Player)

PurePlayer.displayName = 'PurePlayer'

export default PurePlayer
