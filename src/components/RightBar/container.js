import {connect} from 'react-redux'
import component from './component.js'
import {rightBarSelector} from '../../store/reducers.js'

const RightBarContainer = connect(rightBarSelector, {})(component)

RightBarContainer.displayName = 'RightBarContainer'

export default RightBarContainer
