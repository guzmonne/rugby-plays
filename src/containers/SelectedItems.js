import React from 'react'
import T from 'prop-types'
import {connect} from 'react-redux'
import {Player} from '../store/records.js'
import SelectedItems from '../components/SelectedItems.js'
import {selectedItemsSelector} from '../store/reducers.js'

class SelectedItemsContainer extends React.Component {
  render = () => (
    <SelectedItems player={this.props.player}/>
  )
}

SelectedItemsContainer.propTypes = {
  player: T.instanceOf(Player),
}

export default connect(selectedItemsSelector, {})(SelectedItemsContainer)
