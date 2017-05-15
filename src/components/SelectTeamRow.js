import React from 'react'
import T from 'prop-types'
import Slider from './common/Slider.js'
import Row from './common/Row.js'
import ColorPicker from './common/ColorPicker.js'

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

export const ISelectTeamRowState = {
  team: T.string,
  teamAColor: T.string,
  teamBColor: T.string,
  isOpenTeamAColorPicker: T.bool,
  isOpenTeamBColorPicker: T.bool,
}

export const ISelectTeamRowActions = {
  onClick: T.func.isRequired,
  onChangeColor: T.func.isRequired,
  toggleTeamAColorPicker: T.func.isRequired,
  toggleTeamBColorPicker: T.func.isRequired,
}

export const ISelectTeamRow = {
  ...ISelectTeamRowState,
  ...ISelectTeamRowActions,
}

SelectTeamRow.propTypes = ISelectTeamRow

SelectTeamRow.defaultProps = {
  team: 'a',
}

export default SelectTeamRow
