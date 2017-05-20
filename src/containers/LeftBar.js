import React from 'react'
import {connect} from 'react-redux'
import toJS from '../hoc/toJS.js'
import {leftBarProps} from '../store/reducers.js'
import {leftBarActions} from '../store/actions.js'
import Component from '../components/LeftBar.js'

class LeftBar extends React.Component {
  render = () => (
    <Component {...this.props}/>
  )
}

const ConnectedLeftBar = connect(leftBarProps, leftBarActions)(toJS(LeftBar))

export default ConnectedLeftBar 
