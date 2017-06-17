import {connect} from 'react-redux'
import component from './component.js'
import {selectedItemsBoxSelector} from '../../store/reducers.js'
import {selectedItemsBoxActions} from '../../store/actions.js'

const SelectedItemsBoxContainer = connect(
  selectedItemsBoxSelector,
  selectedItemsBoxActions
)(component)

SelectedItemsBoxContainer.displayName = 'SelectedItemsBoxContainer'

export default SelectedItemsBoxContainer
