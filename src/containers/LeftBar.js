import React from 'react'
import {connect} from 'react-redux'
import {leftBarProps} from '../store/reducers.js'
import {leftBarActions} from '../store/actions.js'
import Component from '../components/LeftBar.js'

class LeftBar extends React.Component {
  render = () => (
    <Component {...this.props}/>
  )
}

export default (
  connect(leftBarProps, leftBarActions)(LeftBar)
)
