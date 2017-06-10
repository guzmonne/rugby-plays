import '../../_styles/Sliders.css'
import React from 'react'
import T from 'prop-types'
import uniqueId from 'lodash/uniqueId.js'
import {pure} from 'recompose'

const Slider = ({checked, ...props}) => {
  const id = uniqueId('Slider')

  return (
    <span className="Slider">  
      <input type="checkbox" checked={checked} {...props} id={id}/>
      <label htmlFor={id}></label>
    </span>
  )
}

Slider.propTypes = {
  checked: T.bool,
}

Slider.defaultProps = {
  checked: T.bool,
}

export default pure(Slider)
