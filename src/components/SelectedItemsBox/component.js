import React from 'react'
import {compose, withHandlers, withProps, onlyUpdateForKeys} from 'recompose'
import propTypes, {ISelectedItemsBoxProps} from './interface.js'
import Row from '../common/Row/'
import InputRow from '../common/InputRow/'

const SelectedItemsBox = ({item, title, onChangeFactory}) => {
  return (
    <div className="SelectedItemsBox">
      <Row className="SelectedItemsBox__title" 
        justifyContent="center" 
        alignItems="center">
        <h3 className="SelectedItemsBox__title">
        {title
        ? title
        : `Jugador #${item.id} - Team ${item.team.toUpperCase()}`
        }
        </h3>
      </Row>
      <InputRow 
        className="SelectedItemsBox__x"
        input={{
          label: "X",
          type: "number",
          step: 0.5,
          value: item.x ? +item.x.toFixed(4) : item.x,
          onChange: onChangeFactory('x'),
        }}
      />
      <InputRow 
        className="SelectedItemsBox__y"
        input={{
          label: "Y",
          type: "number",
          value: item.y ? +item.y.toFixed(4) : item.y,
          onChange: onChangeFactory('y'),
        }}
      />
      <InputRow 
        className="SelectedItemsBox__angle"
        input={{
          label: "Ángulo",
          type: "number",
          value: item.angle ? +item.angle.toFixed(0) : item.angle,
          onChange: onChangeFactory('angle'),
        }}
      />
      <InputRow 
        className="SelectedItemsBox__scale"
        input={{
          step: 0.01,
          label: "Escala",
          type: "number",
          value: item.scale ? +item.scale.toFixed(4) : item.scale,
          onChange: onChangeFactory('scale'),
        }}
      />
    </div>
  )
}

SelectedItemsBox.propTypes = propTypes

const itemsHasSameValue = (collection, key) => (
  collection.every((item, i) => (
    i === 0 
    ? true 
    : collection.get(i - 1)[key] === item[key]
  ))
)

const PureSelectedItemsBox = compose(
  onlyUpdateForKeys(Object.keys(ISelectedItemsBoxProps)),
  withProps(({items}) => {
    if (items.size === 0) {
      return {
        item: {title: 'Vacío'}
      }
    }
    if (items.size === 1) {
      return { item: items.get(0) }
    }
    const x = Math.min(...items.map(item => item.x).toArray())
    const y = Math.min(...items.map(item => item.y).toArray())
    return {
      item: {
        x,
        y,
        angle: itemsHasSameValue(items, 'angle') ? items.get(0).angle : '',
        scale: itemsHasSameValue(items, 'scale') ? items.get(0).scale : '',
      },
      title: 'Varios elementos',
    }
  }),
  withHandlers({
    onChangeFactory: ({items, updatePlayer}) => (key) => (e) => {
      e.preventDefault()
      if (items.size > 1 && (key === 'x' || key === 'y')) {
        const p = Math.min(...items.map(item => item[key]).toArray())
        const difference = p - +e.target.value
        items.forEach(item => {
          updatePlayer(item.id, {
            [key]: item[key] - difference,
          })
        })
      } else {
        items.forEach(item => {
          updatePlayer(item.id, {
            [key]: +e.target.value,
          })
        })
      }
    }
  })
)(SelectedItemsBox)

PureSelectedItemsBox.displayName = 'PureSelectedItemsBox'

export default PureSelectedItemsBox
