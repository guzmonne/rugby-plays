import './_style.css'
import React from 'react'
import T from 'prop-types'
import {compose, pure, withHandlers} from 'recompose'

const Input = ({label, type, value, step, onChange}) => (
  <div className="Input">
    <label className="Input__label">{label}</label>
    <input className="Input__input"
      type={type}
      value={value}
      onChange={onChange}
      step={step}
    />
  </div>
)

export const IInput = {
  step: T.oneOfType([T.string, T.number]),
  label: T.string,
  type: T.string,
  value: T.any,
  onChange: T.func.isRequired,
}

Input.propTypes = IInput

Input.defaultProps = {
  step: 1,
  label: '',
  value: '',
  type: 'text',
  onChange: () => {},
}

const PureInput = compose(
  pure,
  withHandlers({
    onChange: ({onChange}) => (e) => onChange(e),
  })
)(Input)

PureInput.displayName = 'PureInput'

export default PureInput
