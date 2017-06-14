import {connect} from 'react-redux'
import component from './component.js'
import {selectBoxSelector} from '../../store/reducers.js'
//import {selectBoxActions} from '../../store/actions.js'

const SelectBoxContainer = (
  connect(selectBoxSelector, /*selectBoxActions*/ {})(component)
)

SelectBoxContainer.displayName = 'SelectBoxContainer'

export default SelectBoxContainer
