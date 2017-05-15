import '../_styles/LeftBar.css';
import React from 'react'
import T from 'prop-types'
import Row from './common/Row.js'
import Button from './common/ButtonDark.js'
import Icon from './common/Icon.js'
import SelectTeamRow from './SelectTeamRow.js'

const LeftBar = ({
  team,
  isAddingPlayers,
  isRemovingPlayers,
  toggleTeam,
  toggleAddingPlayers,
  toggleRemovingPlayers,
}) => (
  <div className="LeftBar">
    <SelectTeamRow team={team} onClick={toggleTeam}/>
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
          active={isRemovingPlayers} 
          onClick={toggleRemovingPlayers}>
          <Icon type="cross"/>
        </Button>
      </span>
    </Row>
  </div> 
)

LeftBar.propTypes = {
  team: T.string.isRequired,
  isAddingPlayers: T.bool.isRequired,
  isRemovingPlayers: T.bool.isRequired,
  toggleTeam: T.func.isRequired,
  toggleAddingPlayers: T.func.isRequired,
  toggleRemovingPlayers: T.func.isRequired,
}

export default LeftBar
