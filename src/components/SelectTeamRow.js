import React from 'react'
import T from 'prop-types'
import Slider from './common/Slider.js'
import Row from './common/Row.js'

const SelectTeamRow = ({team, onClick}) => (
  <Row justifyContent="space-around" alignItems="center">
    <span>Equipo A</span>
    <Slider checked={team === 'b'} onChange={onClick}/>
    <span>Equipo B</span>
  </Row>
)

SelectTeamRow.propTypes = {
  team: T.string,
  onClick: T.func.isRequired,
}

SelectTeamRow.defaultProps = {
  team: 'a',
}

export default SelectTeamRow
