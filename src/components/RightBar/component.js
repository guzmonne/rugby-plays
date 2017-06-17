import './_style.css';
import React from 'react'
import {pure} from 'recompose'
import propTypes from './interface.js'
import SelectedItemsBox from '../SelectedItemsBox/'

const RightBar = ({areSelectedItems}) => (
  <div className="RightBar">
  {areSelectedItems ? <SelectedItemsBox /> : <none />}
  </div>
)

RightBar.propTypes = propTypes

const PureRightBar = pure(RightBar)

PureRightBar.displayName = 'PureRightBar'

export default PureRightBar
