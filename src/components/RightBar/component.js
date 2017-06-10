import './_style.css';
import React from 'react'
import {onlyUpdateForKeys} from 'recompose'
import propTypes, {IRightBarProps} from './interface.js'

const RightBar = () => (
  <div className="RightBar"></div>
)

RightBar.propTypes = propTypes

const PureRightBar = onlyUpdateForKeys(Object.keys(IRightBarProps))(RightBar)

PureRightBar.displayName = 'PureRightBar'

export default PureRightBar
