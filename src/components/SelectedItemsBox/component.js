import React from 'react'
import {compose, withHandlers, onlyUpdateForKeys} from 'recompose'
import propTypes, {ISelectedItemsBoxProps} from './interface.js'
import Row from '../common/Row/'
import InputRow from '../common/InputRow/'

const SelectedItemsBox = ({player, onChangeFactory}) => (
  <div className="SelectedItemsBox">
    <Row className="SelectedItemsBox__title" 
      justifyContent="center" 
      alignItems="center">
      <h3 className="SelectedItemsBox__title">
        Jugador #{player.id} - Team {player.team.toUpperCase()}
      </h3>
    </Row>
    <InputRow 
      className="SelectedItemsBox__x"
      input={{
        label: "X",
        type: "number",
        value: +player.x.toFixed(4),
        onChange: onChangeFactory('x'),
      }}
    />
    <InputRow 
      className="SelectedItemsBox__y"
      input={{
        label: "Y",
        type: "number",
        value: +player.y.toFixed(4),
        onChange: onChangeFactory('y'),
      }}
    />
    <InputRow 
      className="SelectedItemsBox__angle"
      input={{
        label: "Ángulo",
        type: "number",
        value: +player.angle.toFixed(0),
        onChange: onChangeFactory('angle'),
      }}
    />
    <InputRow 
      className="SelectedItemsBox__scale"
      input={{
        label: "Escala",
        type: "number",
        value: +player.scale.toFixed(4),
        onChange: onChangeFactory('scale'),
      }}
    />
  </div>
)

SelectedItemsBox.propTypes = propTypes

const PureSelectedItemsBox = compose(
  onlyUpdateForKeys(Object.keys(ISelectedItemsBoxProps)),
  withHandlers({
    onChangeFactory: ({player, updatePlayer}) => (key) => (e) => {
      e.preventDefault()
      updatePlayer(player.id, {
        [key]: +e.target.value,
      })
    }
  })
)(SelectedItemsBox)

PureSelectedItemsBox.displayName = 'PureSelectedItemsBox'

export default PureSelectedItemsBox
