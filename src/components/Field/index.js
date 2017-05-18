import '../../_styles/Field.css'
import React from 'react'
import T from 'prop-types'
import {onlyUpdateForPropTypes} from 'recompose'
import uniqueId from 'lodash/uniqueId.js'
import {IPlayer} from '../common/Player.js'
import Posts from './Posts.js'
import Stripes from './Stripes.js'
import Lines from './Lines.js'
import Outline from './Outline.js'
import TeamAPlayer from './TeamAPlayer.js'
import TeamBPlayer from './TeamBPlayer.js'

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

  render = () => {
    const {svg, pt} = this.state
    const {
      onDragPlayer,
      selectedPlayer,
      deselectPlayer,
    } = this.props
    return (
      <svg className="Field" 
        viewBox="0 0 90 130" 
        preserveAspectRatio="none"
        ref={(svg) => this.svg = svg}
        onClick={deselectPlayer}
      >
        <Stripes />
        <Outline onClick={(e) => (
          this.props.onAddPlayer(e, svg, pt)
        )}
        />
        <Lines />
        <Posts />
        <g className="aPlayers">
        {this.props.aPlayers.map(player => (
          <TeamAPlayer key={uniqueId('player')}
            bodyFill={this.props.teamAColor}
            draggable={selectedPlayer === player.id}
            onDrag={(e) => onDragPlayer(e, svg, pt, player.id, 'a')}
            onClick={() => this.props.selectPlayer(player.id)}
            selected={selectedPlayer === player.id}
            {...player}
          />
        ))}
        </g>
        <g className="bPlayers">
        {this.props.bPlayers.map(player => (
          <TeamBPlayer key={uniqueId('player')}
            bodyFill={this.props.teamBColor}
            draggable={selectedPlayer === player.id}
            onDrag={(e) => onDragPlayer(e, svg, pt, player.id, 'b')}
            onClick={() => this.props.selectPlayer(player.id)}
            selected={this.props.selectedPlayer === player.id}
            {...player}
          />
        ))}
        </g>
      </svg>
    )
  }
}

Field.propTypes = {
  teamAColor: T.string,
  teamBColor: T.string,
  selectedPlayer: T.string,
  aPlayers: T.arrayOf(T.shape(IPlayer)),
  bPlayers: T.arrayOf(T.shape(IPlayer)),
  onDragPlayer: T.func,
  selectPlayer: T.func,
  deselectPlayer: T.func,
}

Field.defaultProps = {
  aPlayers: [],
  bPlayers: [],
}

export default onlyUpdateForPropTypes(Field)
