import './_style.css';
import React from 'react'
import {onlyUpdateForKeys} from 'recompose'
import Row from '../common/Row/'
import Button from '../common/Button/'
import Icon from '../common/Icon/'
import SelectTeamRow from '../SelectTeamRow/'
import propTypes, {ILeftBarProps} from './interface.js'


const LeftBar = ({
  children,
  isAddingPlayers,
  canRemovePlayers,
  toggleAddingPlayers,
  removeSelectedPlayer,
}) => (
  <div className="LeftBar">
    <h1>#RugbyPlay</h1>
    <SelectTeamRow />
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

LeftBar.propTypes = propTypes

const PureLeftBar = onlyUpdateForKeys(
  Object.keys(ILeftBarProps)
)(LeftBar)

PureLeftBar.displayName = 'PureLeftBar'

export default PureLeftBar
