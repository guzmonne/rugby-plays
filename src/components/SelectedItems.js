import React from 'react'
import T from 'prop-types'
import {Player} from '../store/records.js'
import PlayerTransform from './Field/PlayerTransform.js'
import BoundingBox from './common/BoundingBox.js'

class SelectedItems extends React.Component {
  notEmpty = () => this.svg && this.props.player

  render = () => {
    const {player} = this.props
    return (
      <g className="SelectedItems">
        <g className="SelectedItems__Container"
          ref={svg => this.svg = svg}>
        {player &&
          <PlayerTransform player={player} />
        }
        </g>
      {this.notEmpty() &&
        <BoundingBox svg={this.svg} />
      }
      </g>
    )
  }
}

SelectedItems.propTypes = {
  player: T.instanceOf(Player)
}

export default SelectedItems
