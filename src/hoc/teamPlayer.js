import React from 'react'
import Draggable from '../components/common/Draggable.js'
import Transform from '../components/common/Transform.js'
import Player from '../components/common/Player.js'

const teamPlayer = (offsetX, offsetY, rotate=0) => (
  class TeamPlayer extends React.Component {
    shouldComponentUpdate = (newProps) => {
      console.log(newProps, this.props)
      return true
    }

    render = () => {
      const {x, y, ...props} = this.props
      return (
        <Draggable {...props}>
          <Transform {...props}
            x={x - offsetX} 
            y={y - offsetY} 
            rotate={rotate} 
            scale={0.03}>
            <Player {...props} />
          </Transform>
        </Draggable>
      )
    }
  }
)

export default teamPlayer
