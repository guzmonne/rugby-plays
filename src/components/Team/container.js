import {connect} from 'react-redux'
import component from './component.js'
import {teamActions} from '../../store/actions.js'

const TeamContainer = (
  connect(() => ({}), teamActions)(component)
)

TeamContainer.displayName = 'TeamContainer'

export default TeamContainer
