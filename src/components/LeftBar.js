import '../_styles/LeftBar.css';
import React from 'react'
import Row from './common/Row.js'
import Button from './common/Button.js'
import Icon from './common/Icon.js'

const LeftBar = ({isAddingPlayers, toggleAddingPlayers}) => (
  <div className="LeftBar">
    <Row>
      <Button active={isAddingPlayers} onClick={toggleAddingPlayers}>
        <Icon type="plus">Jugador</Icon>
      </Button>
    </Row>
  </div> 
)

LeftBar.propTypes = {
  
}

LeftBar.defaultProps = {
  
}

export default LeftBar
