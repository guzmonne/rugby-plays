import './_style.css'
import React from 'react'
import T from 'prop-types'
import uniqueId from 'lodash/uniqueId.js'
import {pure} from 'recompose'

const SliderThin = ({checked, ...props}) => {
  const id = uniqueId('SliderThin')
    return (
    <span className="SliderThin">  
      <input type="checkbox" id={id} {...props} checked={checked} />
      <label htmlFor={id}></label>
    </span>
  )
}

SliderThin.propTypes = {
  checked: T.bool,
}

export default pure(SliderThin)
