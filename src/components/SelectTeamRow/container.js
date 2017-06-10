import {connect} from 'react-redux'
import component from './component.js'
import {selectTeamRowSelector} from '../../store/reducers.js'
import {selectTeamRowActions} from '../../store/actions.js'

const SelectTeamRowContainer = (
  connect(selectTeamRowSelector, selectTeamRowActions)(component)
)

SelectTeamRowContainer.displayName = 'SelectTeamRowContainer'

export default SelectTeamRowContainer
