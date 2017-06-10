import {connect} from 'react-redux'
import component from './component.js'
import {selectedItemsSelector} from '../../store/reducers.js'
import {selectedItemsActions} from '../../store/actions.js'

const SelectedItemsContainer = (
  connect(selectedItemsSelector, selectedItemsActions)(component)
)

SelectedItemsContainer.displayName = 'SelectedItemsContainer'

export default SelectedItemsContainer
