import './_style.css';
import React from 'react'
import {onlyUpdateForKeys, withHandlers, compose} from 'recompose'
import propTypes, {IRightBarProps} from './interface.js'
import Row from '../common/Row/'

const RightBar = ({player, onChangeFactory}) => (
  player
  ? (
    <div className="RightBar">  
      <Row className="PlayersRow__title" 
        justifyContent="center" 
        alignItems="center">
        <h3 className="PlayersRow__title">
          Jugador #{player.id} - Team {player.team.toUpperCase()}
        </h3>
      </Row>
      <Row className="PlayersRow__x" 
        justifyContent="space-between" 
        alignItems="center"
        thin={true}>
        <div className="Control">
          <label className="Control__label">X</label>
          <input className="Control__input"
            type="number"
            value={+player.x.toFixed(4)}
            onChange={onChangeFactory('x')}
          />
        </div>
      </Row>
      <Row className="PlayersRow__y" 
        justifyContent="space-between" 
        alignItems="center"
        thin={true}>
        <div className="Control">
          <label className="Control__label">Y</label>
          <input className="Control__input"
            type="number"
            value={+player.y.toFixed(4)}
            onChange={onChangeFactory('y')}
          />
        </div>
      </Row>
      <Row className="PlayersRow__angle" 
        justifyContent="space-between" 
        alignItems="center"
        thin={true}>
        <div className="Control">
          <label className="Control__label">Ángulo</label>
          <input className="Control__input"
            type="number"
            value={+player.angle.toFixed(0)}
            onChange={onChangeFactory('angle')}
          />
        </div>
      </Row>
      <Row className="PlayersRow__scale" 
        justifyContent="space-between" 
        alignItems="center"
        thin={true}>
        <div className="Control">
          <label className="Control__label">Escala</label>
          <input className="Control__input"
            type="number"
            value={+player.scale.toFixed(4)}
            onChange={onChangeFactory('scale')}
            step="0.01"
          />
        </div>
      </Row>
    </div>
  )
  : (
    <div className="RightBar"></div>
  )
)

RightBar.propTypes = propTypes

const PureRightBar = compose(
  onlyUpdateForKeys(Object.keys(IRightBarProps)),
  withHandlers({
    onChangeFactory: ({player, updatePlayer}) => (key) => (e) => {
      e.preventDefault()
      updatePlayer(player.id, {
        [key]: +e.target.value,
      })
    }
  })
)(RightBar)

PureRightBar.displayName = 'PureRightBar'

export default PureRightBar
