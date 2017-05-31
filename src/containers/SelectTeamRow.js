import React from 'react'
import {connect} from 'react-redux'
import {onlyUpdateForKeys} from 'recompose'
import 
  SelectTeamRow, {
  ISelectTeamRow,
  ISelectTeamRowProps,
} from '../components/SelectTeamRow.js'
import {selectTeamRowSelector} from '../store/reducers.js'
import {selectTeamRowActions} from '../store/actions.js'

class SelectTeamRowContainer extends React.Component {
  render = () => (
    <SelectTeamRow 
      team={this.props.team}
      teamAColor={this.props.teamAColor}
      teamBColor={this.props.teamBColor}
      isOpenTeamAColorPicker={this.props.isOpenTeamAColorPicker}
      isOpenTeamBColorPicker={this.props.isOpenTeamBColorPicker}
      onClick={this.props.onClick}
      onChangeColor={this.props.onChangeColor}
      toggleTeamAColorPicker={this.props.toggleTeamAColorPicker}
      toggleTeamBColorPicker={this.props.toggleTeamBColorPicker}
    />
  )
}

SelectTeamRowContainer.propTypes = ISelectTeamRow

const PureSelectTeamRowContainer = (
  onlyUpdateForKeys(
    Object.keys(ISelectTeamRowProps)
  )(SelectTeamRowContainer)
)

PureSelectTeamRowContainer.displayName = 'PureSelectTeamRowContainer'

const ConnectedSelectTeamRowContiner = connect(
  selectTeamRowSelector,
  selectTeamRowActions
)(PureSelectTeamRowContainer)

ConnectedSelectTeamRowContiner.displayName = 'SelectTeamRowContainer'

export default ConnectedSelectTeamRowContiner
