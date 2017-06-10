import {connect} from 'react-redux'
import component from './component.js'
import {leftBarSelector} from '../../store/reducers.js'
import {leftBarActions} from '../../store/actions.js'

const LeftBarContainer = connect(leftBarSelector, leftBarActions)(component)

LeftBarContainer.displayName = 'LeftBarContainer'

export default LeftBarContainer
