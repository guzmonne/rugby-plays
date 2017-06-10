import './_style.css'
import React from 'react'
import {onlyUpdateForKeys} from 'recompose'
import mouseToSvgCoordinates from '../../utils/mouseToSvgCoordinates.js'
import Posts from './components/Posts.js'
import Stripes from './components/Stripes.js'
import Lines from './components/Lines.js'
import Outline from './components/Outline.js'
import Team from '../Team/'
import SelectedItems from '../SelectedItems/'
import propTypes, {IFieldProps} from './interface.js'

class Field extends React.Component {
  svg = undefined
  pt = undefined

  componentDidMount() {
    this.pt = this.svg.createSVGPoint()
  }

  mouseToSvgCoordinates = (e) => {
    if (!this.svg || !this.pt) {
      return {x: e.clientX, y: e.clientY}
    }
    return mouseToSvgCoordinates(e, this.svg, this.pt)
  }

  onAddPlayer = (e, svg, pt) => {
    if (this.props.isAddingPlayers === false) {
      return
    }
    const {x, y} = mouseToSvgCoordinates(e, svg, pt)
    this.props.addPlayer(x, y)
  }

  render = () => {
    const {svg, pt} = this
    const {deselectPlayer} = this.props

    return (
      <svg className="Field" 
        viewBox="0 0 90 130" 
        preserveAspectRatio="none"
        ref={(svg) => this.svg = svg}
        onClick={deselectPlayer}>
        <Stripes />
        <Outline onClick={(e) => this.onAddPlayer(e, svg, pt)} />
        <Lines />
        <Posts />
        <Team className="TeamA" players={this.props.aPlayers}/>
        <Team className="TeamB" players={this.props.bPlayers}/>
      {this.svg && this.pt &&
        <SelectedItems mouseToSvgCoordinates={this.mouseToSvgCoordinates}/>
      }
      </svg>
    )
  }
}

Field.propTypes = propTypes

const PureField = onlyUpdateForKeys(Object.keys(IFieldProps))(Field)

PureField.displayName = 'PureField'

export default PureField