import './_style.css'
import React from 'react'
import {pure} from 'recompose'
import propTypes from './interface.js'

const anchorFromPoints = (a, b) => {
  let x, y
  if (b.x < a.x) {
    x = b.x
    y = b.y < a.y ? b.y : a.y
  } else {
    x = a.x
    y = b.y < a.y ? b.y : a.y
  }
  return {x, y}
}

class SelectBox extends React.Component {
  render() {
    const {a, b, isSelectingItems} = this.props

    if (isSelectingItems === false) {
      return <none/>
    }

    const width = Math.abs(a.x - b.x)
    const height = Math.abs(a.y - b.y)
    const {x, y} = anchorFromPoints(a, b)
    
    return (
      <rect className="SelectBox"
        x={x}
        y={y}
        width={width}
        height={height}
      />
    )
  }
}

SelectBox.propTypes = propTypes

const PureSelectBox = pure(SelectBox)

PureSelectBox.displayName = 'PureSelectBox'

export default PureSelectBox
