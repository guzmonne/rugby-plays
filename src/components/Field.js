import '../_styles/Field.css'
import React from 'react'
import T from 'prop-types'
import uniqueId from 'lodash/uniqueId.js'
import Player, {IPlayer} from './Player.js'
import Posts from './Posts.js'
import Stripes from './Stripes.js'
import Lines from './Lines.js'
import Outline from './Outline.js'

class Field extends React.Component {
  state = {
    pt: undefined,
    svg: undefined,
  }

  svg = undefined

  componentDidMount = () => {
    this.setState({
      svg: this.svg,
      pt: this.svg.createSVGPoint()
    })
  }

  render = () => (
    <svg className="Field" 
      viewBox="0 0 90 130" 
      preserveAspectRatio="none"
      ref={(svg) => this.svg = svg}
    >
      <Stripes />
      <Outline onClick={(e) => (
        this.props.onAddPlayer(e, this.state.svg, this.state.pt)
      )}
      />
      <Lines />
      <Posts />
      <g className="aPlayers">
      {this.props.aPlayers.map(player => (
        <Player key={uniqueId('player')} {...player} />
      ))}
      </g>
      <g className="bPlayers">
      {this.props.bPlayers.map(player => (
        <Player key={uniqueId('player')} {...player} />
      ))}
      </g>
    </svg>
  )
}

Field.propTypes = {
  aPlayers: T.arrayOf(T.shape(IPlayer)),
  bPlayers: T.arrayOf(T.shape(IPlayer)),
}

Field.defaultProps = {
  aPlayers: [],
  bPlayers: [],
}

export default Field
