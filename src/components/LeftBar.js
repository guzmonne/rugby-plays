import '../_styles/LeftBar.css';
import React from 'react'
import T from 'prop-types'
import Row from './common/Row.js'
import Button from './common/ButtonDark.js'
import Icon from './common/Icon.js'
import SelectTeamRow, {
  ISelectTeamRowState,
  ISelectTeamRowActions
} from './SelectTeamRow.js'
import {onlyUpdateForPropTypes} from 'recompose'

const LeftBar = ({
  selectTeamRowState,
  selectTeamRowActions,
  isAddingPlayers,
  canRemovePlayers,
  toggleTeam,
  toggleAddingPlayers,
  toggleRemovingPlayers,
  removeSelectedPlayer,
}) => (
  <div className="LeftBar">
    <h1>#RugbyPlay</h1>
    <SelectTeamRow {...selectTeamRowState} {...selectTeamRowActions}/>
    <Row className="PlayersRow" 
      justifyContent="space-between" 
      alignItems="center">
      <span>Jugadores</span>
      <span>
        <Button type="success"
          active={isAddingPlayers}
          onClick={toggleAddingPlayers}>
          <Icon type="plus" />
        </Button>
        <Button type="danger" 
          disabled={!canRemovePlayers}
          onClick={removeSelectedPlayer}>
          <Icon type="cross"/>
        </Button>
      </span>
    </Row>
  </div> 
)

LeftBar.displayName = 'LeftBar'

LeftBar.propTypes = {
  selectTeamRowState: T.shape(ISelectTeamRowState),
  selectTeamRowActions: T.shape(ISelectTeamRowActions),
  isAddingPlayers: T.bool.isRequired,
  toggleAddingPlayers: T.func.isRequired,
}

export default onlyUpdateForPropTypes(LeftBar)
