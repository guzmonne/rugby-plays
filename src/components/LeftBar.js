import '../_styles/LeftBar.css';
import React from 'react'
import T from 'prop-types'
import Row from './common/Row.js'
import Button from './common/Button.js'
import Icon from './common/Icon.js'
import SelectTeamRow from './SelectTeamRow.js'

const LeftBar = ({
  team,
  isAddingPlayers,
  toggleTeam,
  toggleAddingPlayers
}) => (
  <div className="LeftBar">
    <SelectTeamRow team={team} onClick={toggleTeam}/>
    <Row justifyContent="space-around">
      <Button active={isAddingPlayers} onClick={toggleAddingPlayers}>
        <Icon type="plus">Jugador</Icon>
      </Button>
    </Row>
  </div> 
)

LeftBar.propTypes = {
  team: T.string.isRequired,
  isAddingPlayers: T.bool.isRequired,
  toggleTeam: T.func.isRequired,
  toggleAddingPlayers: T.func.isRequired,
}

export default LeftBar
