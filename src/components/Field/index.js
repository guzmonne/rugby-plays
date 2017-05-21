import '../../_styles/Field.css'
import React from 'react'
import T from 'prop-types'
import uniqueId from 'lodash/uniqueId.js'
import Posts from './Posts.js'
import Stripes from './Stripes.js'
import Lines from './Lines.js'
import Outline from './Outline.js'
import TeamAPlayer from './TeamAPlayer.js'
import TeamBPlayer from './TeamBPlayer.js'
import {onlyUpdateForPropTypes} from 'recompose'

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
      teamAColor,
      teamBColor,
      onDragPlayer,
      onRotatePlayer,
      selectedPlayer,
      selectPlayer,
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
        {this.props.aPlayers.map((player, index) => (
          <TeamAPlayer key={uniqueId('player')}
            bodyFill={teamAColor}
            draggable={selectedPlayer === player.get('id')}
            rotatable={selectedPlayer === player.get('id')}
            onRotate={(e) => onRotatePlayer(e, svg, pt, player)}
            onDrag={(e) => onDragPlayer(e, svg, pt, player)}
            onClick={() => selectPlayer(player.get('id'))}
            selected={selectedPlayer === player.get('id')}
            player={player}
          />
        ))}
        </g>
        <g className="bPlayers">
        {this.props.bPlayers.map((player, index) => (
          <TeamBPlayer key={uniqueId('player')}
            bodyFill={teamBColor}
            draggable={selectedPlayer === player.get('id')}
            rotatable={selectedPlayer === player.get('id')}
            onRotate={(e) => onRotatePlayer(e, svg, pt, player)}
            onDrag={(e) => onDragPlayer(e, svg, pt, player)}
            onClick={() => selectPlayer(player.get('id'))}
            selected={selectedPlayer === player.get('id')}
            player={player}
          />
        ))}
        </g>
      </svg>
    )
  }
}

Field.displayName = 'Field'

Field.propTypes = {
  teamAColor: T.string,
  teamBColor: T.string,
  selectedPlayer: T.string,
  aPlayers: T.object,
  bPlayers: T.object,
  onDragPlayer: T.func,
  onRotatePlayer: T.func,
  selectPlayer: T.func,
  deselectPlayer: T.func,
}

Field.defaultProps = {
  aPlayers: [],
  bPlayers: [],
}

export default onlyUpdateForPropTypes(Field)
