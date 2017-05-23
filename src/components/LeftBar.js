import '../_styles/LeftBar.css';
import React from 'react'
import T from 'prop-types'
import Row from './common/Row.js'
import Button from './common/ButtonDark.js'
import Icon from './common/Icon.js'
import {onlyUpdateForKeys} from 'recompose'

const LeftBar = ({
  children,
  isAddingPlayers,
  canRemovePlayers,
  toggleAddingPlayers,
  removeSelectedPlayer,
}) => (
  <div className="LeftBar">
    <h1>#RugbyPlay</h1>
    {children}
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

export const ILeftBarProps = {
  isAddingPlayers: T.bool.isRequired,
  canRemovePlayers: T.bool.isRequired,
}

export const ILeftBarActions = {
  toggleAddingPlayers: T.func.isRequired,
  removeSelectedPlayer: T.func.isRequired,
}

export const ILeftBar = {
  ...ILeftBarProps,
  ...ILeftBarActions
}

LeftBar.propTypes = ILeftBar

const PureLeftBar = onlyUpdateForKeys(
  Object.keys(ILeftBarProps)
)(LeftBar)

PureLeftBar.displayName = 'LeftBar'

export default PureLeftBar
