import React from 'react'
import {connect} from 'react-redux'
import {onlyUpdateForKeys} from 'recompose'
import {leftBarSelector} from '../store/reducers.js'
import {leftBarActions} from '../store/actions.js'
import LeftBar, {
  ILeftBar,
  ILeftBarProps
} from '../components/LeftBar.js'
import SelectTeamRow from './SelectTeamRow.js'

class LeftBarContainer extends React.Component {
  render = () => (
    <LeftBar 
      isAddingPlayers={this.props.isAddingPlayers}
      canRemovePlayers={this.props.canRemovePlayers}
      toggleAddingPlayers={this.props.toggleAddingPlayers}
      removeSelectedPlayer={this.props.removeSelectedPlayer}>
      <SelectTeamRow />
    </LeftBar>
  )
}

LeftBarContainer.propTypes = ILeftBar

const ConnectedLeftBarContainer = (
  connect(leftBarSelector, leftBarActions)(
    onlyUpdateForKeys(Object.keys(ILeftBarProps))(LeftBarContainer)
  )
)

ConnectedLeftBarContainer.displayName = 'LeftBarContainer'

export default ConnectedLeftBarContainer
