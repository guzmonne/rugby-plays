import React from "react"
import T from "prop-types"
import {onlyUpdateForPropTypes} from 'recompose'

const Stripes = ({fill}) => (
  <g className="stripes">
    <path fill={fill} d="M5,5 L7.5,5 L7.5,125 L5,125z"/>
    <path fill={fill} d="M12.5,5 L17.5,5 L17.5,125 L12.5,125z"/>
    <path fill={fill} d="M22.5,5 L27.5,5 L27.5,125 L22.5,125z"/>
    <path fill={fill} d="M32.5,5 L37.5,5 L37.5,125 L32.5,125z"/>
    <path fill={fill} d="M42.5,5 L47.5,5 L47.5,125 L42.5,125z"/>
    <path fill={fill} d="M52.5,5 L57.5,5 L57.5,125 L52.5,125z"/>
    <path fill={fill} d="M62.5,5 L67.5,5 L67.5,125 L62.5,125z"/>
    <path fill={fill} d="M72.5,5 L77.5,5 L77.5,125 L72.5,125z"/>
    <path fill={fill} d="M82.5,5 L85,5 L85,125 L82.5,125z"/>
  </g>
)

Stripes.propTypes = {
  fill: T.string,
}

Stripes.defaultProps = {
  fill: '#71ab41',
}

const PureStripes = onlyUpdateForPropTypes(Stripes)

PureStripes.displayName = 'PureStripes'

export default PureStripes
