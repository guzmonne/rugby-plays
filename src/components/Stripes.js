import React from "react"
import T from "prop-types"

const Stripes = ({fill}) => (
  <g className="stripes">
    <path fill={fill} d="M10,5 L15,5 L11.5,125 L5,125z"/>
    <path fill={fill} d="M20,5 L25,5 L23,125 L17,125z"/>
    <path fill={fill} d="M30,5 L35,5 L34,125 L28,125z"/>
    <path fill={fill} d="M40,5 L45,5 L45,125 L39,125z"/>
    <path fill={fill} d="M50,5 L55,5 L56,125 L50,125z"/>
    <path fill={fill} d="M60,5 L65,5 L67,125 L61,125z"/>
    <path fill={fill} d="M70,5 L75,5 L78.5,125 L72,125z"/>
  </g>
)

Stripes.propTypes = {
  fill: T.string,
}

Stripes.defaultProps = {
  fill: '#71ab41',
}

export default Stripes
