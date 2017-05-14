import '../_styles/Field.css'
import React from 'react'
import Player from './Player.js'

const Field = () => (
  <svg className="Field" viewBox="0 0 90 130" preserveAspectRatio="none">
    <g className="stripes">
      <path fill="#71ab41" d="M10,5 L15,5 L11.5,125 L5,125z"/>
      <path fill="#71ab41" d="M20,5 L25,5 L23,125 L17,125z"/>
      <path fill="#71ab41" d="M30,5 L35,5 L34,125 L28,125z"/>
      <path fill="#71ab41" d="M40,5 L45,5 L45,125 L39,125z"/>
      <path fill="#71ab41" d="M50,5 L55,5 L56,125 L50,125z"/>
      <path fill="#71ab41" d="M60,5 L65,5 L67,125 L61,125z"/>
      <path fill="#71ab41" d="M70,5 L75,5 L78.5,125 L72,125z"/>
    </g>
    <g className="lines">
      <g className="outline">
        <path className="line" 
          d="M10,5 L80,5 L85,125 L5,125z"
        />
      </g>
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
    <g className="posts">
      <g className="post" transform="translate(41.2, 1.5) scale(0.9)">
        <path className="middle-post" 
          d="M0.4,9 L6.8,9 L6.8,8.6 L0.4,8.6z"
        />
        <path className="left-post" 
          d="M0.4,15 L0.8,15 L0.8,0 L0.4,0z"
        />
        <path className="right-post" 
          d="M6.4,15 L6.8,15 L6.8,0 L6.4,0z"
        />
        <path className="post-base" 
          d="M0,15 L1.2,15 L1.2,10 L0,10z"
        />
        <path className="post-base" 
          d="M6,15 L7.2,15 L7.2,10 L6,10z"
        />
      </g>
      <g className="post" transform="translate(41.2, 99.5) scale(0.9)">
        <path className="middle-post" 
          d="M0.4,9 L6.8,9 L6.8,8.6 L0.4,8.6z"
        />
        <path className="left-post" 
          d="M0.4,15 L0.8,15 L0.8,0 L0.4,0z"
        />
        <path className="right-post" 
          d="M6.4,15 L6.8,15 L6.8,0 L6.4,0z"
        />
        <path className="post-base" 
          d="M0,15 L1.2,15 L1.2,10 L0,10z"
        />
        <path className="post-base" 
          d="M6,15 L7.2,15 L7.2,10 L6,10z"
        />
      </g>
    </g>
    <g className="players">
      <g className="player" transform="translate(42, 60) scale(0.03)">
        <Player bodyFill="steelblue" />
      </g>
      <g className="player" transform="translate(45, 60) scale(0.03)">
        <Player bodyFill="steelblue" />
      </g>
      <g className="player" transform="translate(48, 60) scale(0.03)">
        <Player bodyFill="steelblue" />
      </g>
      <g className="player" transform="translate(43.6, 62.5) scale(0.03)">
        <Player bodyFill="steelblue" />
      </g>
      <g className="player" transform="translate(46.5, 62.5) scale(0.03)">
        <Player bodyFill="steelblue" />
      </g>
      <g className="player" transform="translate(40.5, 62) scale(0.03)">
        <Player bodyFill="steelblue" />
      </g>
      <g className="player" transform="translate(49.5, 62) scale(0.03)">
        <Player bodyFill="steelblue" />
      </g>
      <g className="player" transform="translate(45, 65) scale(0.03)">
        <Player bodyFill="steelblue" />
      </g>
    </g>
  </svg>
)

export default Field
