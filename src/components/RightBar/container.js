import {connect} from 'react-redux'
import component from './component.js'
import {rightBarSelector} from '../../store/reducers.js'
import {rightBarActions} from '../../store/actions.js'

const RightBarContainer = connect(rightBarSelector, rightBarActions)(component)

RightBarContainer.displayName = 'RightBarContainer'

export default RightBarContainer
