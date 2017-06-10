import {connect} from 'react-redux'
import component from './component.js'
import {fieldSelector} from '../../store/reducers.js'
import {fieldActions} from '../../store/actions.js'

const FieldContainer = connect(fieldSelector, fieldActions)(component)

FieldContainer.displayName = 'FieldContainer'

export default FieldContainer
