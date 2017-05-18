import '../../_styles/Icon.css'
import React from 'react'
import T from 'prop-types'
import {Plus, Cross} from './Icons.js'
import {onlyUpdateForPropTypes} from 'recompose'

const icons = {
  'plus': <Plus />,
  'cross': <Cross />,
}

const icon= (type) => {
  const i = icons[type]
  return i || <Plus />
}

const Icon = ({type, children}) => (
  <div className="IconContainer">
    {icon(type)}<span>{children}</span>
  </div>
)

Icon.propTypes = {
  type: T.string,
}

Icon.defaultProps = {
  type: 'plus'
}

export default onlyUpdateForPropTypes(Icon)
