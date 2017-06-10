import React from 'react'
import {onlyUpdateForKeys} from 'recompose'
import Slider from '../common/SliderThin.js'
import Row from '../common/Row.js'
import ColorPicker from '../common/ColorPicker.js'
import propTypes, {ISelectTeamRowProps} from './interface.js'

const SelectTeamRow = ({
  team,
  onClick,
  teamAColor,
  teamBColor,
  isOpenTeamAColorPicker,
  isOpenTeamBColorPicker,
  onChangeColor,
  toggleTeamAColorPicker,
  toggleTeamBColorPicker,
}) => (
  <Row justifyContent="space-between" alignItems="center">
    <span>Equipo A</span>
    <span>
      <ColorPicker 
        open={isOpenTeamAColorPicker}
        color={teamAColor}
        onClick={toggleTeamAColorPicker}
        onClose={toggleTeamAColorPicker}
        onColorChange={color => onChangeColor('a', color)}
      />
    </span>
    <Slider checked={team === 'b'} onChange={onClick}/>
    <span>
      <ColorPicker 
        open={isOpenTeamBColorPicker}
        color={teamBColor}
        onClick={toggleTeamBColorPicker}
        onClose={toggleTeamBColorPicker}
        onColorChange={color => onChangeColor('b', color)}
      />
    </span>
    <span>Equipo B</span>
  </Row>
)

SelectTeamRow.propTypes = propTypes

SelectTeamRow.defaultProps = {
  team: 'a',
}

const PureSelectTeamRow = onlyUpdateForKeys(
  Object.keys(ISelectTeamRowProps)
)(SelectTeamRow)

PureSelectTeamRow.displayName = 'PureSelectTeamRow'

export default PureSelectTeamRow
