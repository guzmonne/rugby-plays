import React from 'react'
import {connect} from 'react-redux'
import {leftBarSelector} from '../store/reducers.js'
import {leftBarActions} from '../store/actions.js'
import Component from '../components/LeftBar.js'

class LeftBar extends React.Component {
  render = () => (
    <Component {...this.props}/>
  )
}

const ConnectedLeftBar = connect(leftBarSelector, leftBarActions)(LeftBar)

export default ConnectedLeftBar 
