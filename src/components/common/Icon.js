import '../../_styles/Icon.css'
import React from 'react'
import T from 'prop-types'
import {Plus} from './Icons.js'

const icons = {
  'plus': <Plus />
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

export default Icon
