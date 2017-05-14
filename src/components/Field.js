import '../_styles/Field.css'
import React from 'react'
import Player from './Player.js'
import Posts from './Posts.js'
import Stripes from './Stripes.js'
import Lines from './Lines.js'

const Field = () => (
  <svg className="Field" viewBox="0 0 90 130" preserveAspectRatio="none">
    <Stripes /> 
    <Lines />
    <Posts />
    <g className="players">
      <Player bodyFill="steelblue" x={42} y={60}/>
      <Player bodyFill="steelblue" x={45} y={60}/>
      <Player bodyFill="steelblue" x={48} y={60}/>
      <Player bodyFill="steelblue" x={43.6} y={62.5}/>
      <Player bodyFill="steelblue" x={46.5} y={62.5}/>
      <Player bodyFill="steelblue" x={40.5} y={62}/>
      <Player bodyFill="steelblue" x={49.5} y={62}/>
      <Player bodyFill="steelblue" x={45} y={65}/>
    </g>
  </svg>
)

export default Field
