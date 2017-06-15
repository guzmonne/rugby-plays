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
import SelectBox from '../SelectBox/'
import propTypes, {IFieldProps} from './interface.js'

class Field extends React.Component {
  svg = undefined
  pt = undefined

  state = {
    canDrawRect: false,
    selecting: false,
    a: {x: 50, y: 23},
    b: {x: 3, y: 17},
  }

  componentDidMount() {
    this.pt = this.svg.createSVGPoint()
    this.forceUpdate()
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

  handleOnMouseDown = (e) => {
    const {x, y} = mouseToSvgCoordinates(e, this.svg, this.pt)
    this.setState(() => ({
      selecting: true,
      a: {x, y},
      b: {x, y},
    }))
  }

  handleOnMouseMove = (e) => {
    if (this.state.selecting === true && this.state.canDrawRect === false) {
      this.setState(() => ({canDrawRect: true}))
    }
    const {x, y} = mouseToSvgCoordinates(e, this.svg, this.pt)
    this.setState({b: {x, y}})
  }
  
  handleOnMouseUp = (e) => {
    if (this.state.canDrawRect === true && this.state.selecting === true) {
      this.props.selectItemsBetweenPoints(this.state.a, this.state.b)
    }
    this.setState(() => ({selecting: false}))
  }

  handleOnClick = (e) => {
    if (this.state.canDrawRect === true) {
      this.setState(() => ({canDrawRect: false}))
    } else {
      this.props.deselectPlayer()
    }
  }

  render = () => {
    const {svg, pt} = this
    const {selecting, canDrawRect, a, b} = this.state
    return (
      <svg className="Field" 
        viewBox="0 0 90 130" 
        preserveAspectRatio="none"
        ref={(svg) => this.svg = svg}
        onMouseDown={this.handleOnMouseDown}
        onMouseMove={this.handleOnMouseMove}
        onMouseUp={this.handleOnMouseUp}
        onClick={this.handleOnClick}>
        <Stripes />
        <Outline onClick={(e) => this.onAddPlayer(e, svg, pt)} />
        <Lines />
        <Posts />
        <Team className="TeamA" players={this.props.aPlayers}/>
        <Team className="TeamB" players={this.props.bPlayers}/>
      {this.svg && this.pt &&
        <SelectedItems mouseToSvgCoordinates={this.mouseToSvgCoordinates}/>
      }
      {selecting && canDrawRect &&
        <SelectBox a={a} b={b}/>
      }
      </svg>
    )
  }
}

Field.propTypes = propTypes

const PureField = onlyUpdateForKeys(Object.keys(IFieldProps))(Field)

PureField.displayName = 'PureField'

export default PureField
