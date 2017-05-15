import '../../_styles/Slider.css'
import React from 'react'
import T from 'prop-types'
import uniqueId from 'lodash/uniqueId.js'

const Slider = ({checked, ...props}) => {
  const id = uniqueId('Slider')

  return (
    <span className="SliderContainer">
      <div className="Slider">  
        <input type="checkbox" checked={checked} {...props} id={id}/>
        <label htmlFor={id}></label>
      </div>
    </span>
  )
}

Slider.propTypes = {
  checked: T.bool,
}

Slider.defaultProps = {
  checked: T.bool,
}

export default Slider
