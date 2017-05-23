import React from 'react'
import {connect} from 'react-redux'
import {leftBarSelector} from '../store/reducers.js'
import {leftBarActions} from '../store/actions.js'
import LeftBar from '../components/LeftBar.js'

class LeftBarContainer extends React.Component {
  render = () => (
    <LeftBar {...this.props}/>
  )
}

const ConnectedLeftBar = (
  connect(leftBarSelector, leftBarActions)(LeftBarContainer)
)

export default ConnectedLeftBar
