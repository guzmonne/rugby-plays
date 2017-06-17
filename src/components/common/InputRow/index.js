import React from 'react'
import T from 'prop-types'
import {pure} from 'recompose'
import Input, {IInput} from '../Input/'
import Row from '../Row/'

const InputRow = ({className, input, thin}) => (
  <Row className="className" 
    justifyContent="space-between" 
    alignItems="center"
    thin={thin}>
    <Input {...input} />
  </Row>
)

InputRow.propTypes = {
  className: T.string,
  thin: T.bool,
  input: T.shape(IInput),
}

InputRow.defaultProps = {
  className: 'InputRow',
  thin: true,
}

const PureInputRow = pure(InputRow)

PureInputRow.displayName = 'PureInputRow'

export default PureInputRow
