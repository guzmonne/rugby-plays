import './_style.css'
import React from 'react'
import T from 'prop-types'
import ChromePicker from 'react-color'
import {pure} from 'recompose'

const ColorPicker = ({open, color, onClick, onClose, onColorChange}) => (
  <span className="ColorPicker">
    <button className="swatch" 
      onClick={onClick}
      style={{backgroundColor: color}} />
    {open &&
      <div className="popover">
        <div className="cover" onClick={onClose}></div>
        <ChromePicker color={color} onChangeComplete={(color) => onColorChange(color.hex)} />
      </div>
    }
  </span>
)

ColorPicker.propTypes = {
  open: T.bool,
  color: T.string,
  onClick: T.func,
  onClose: T.func,
  onColorChange: T.func,
}

ColorPicker.defaultProps = {
  color: '#fff',
}

const PureColorPicker = pure(ColorPicker)

PureColorPicker.displayName = 'PureColorPicker'

export default PureColorPicker
