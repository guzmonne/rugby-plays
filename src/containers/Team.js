import React from 'react'
import T from 'prop-types'
import {connect} from 'react-redux'
import {List} from 'immutable'
import Team from '../components/Team.js'
import {teamActions} from '../store/actions.js'

class TeamContainer extends React.Component {
  render = () => (
    <Team className={this.props.className}
      players={this.props.players}
      onSelectPlayer={this.props.selectPlayer}
    />
  )
}

TeamContainer.propTypes = {
  className: T.string,
  players: T.instanceOf(List),
  selectPlayer: T.func,
}

export default connect(() => ({}), teamActions)(TeamContainer)
