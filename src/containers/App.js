import React from "react"
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore.js'
import App from '../components/App.js'
import Field from './Field.js'
import LeftBar from './LeftBar.js'
import RightBar from './RightBar.js'

const store = configureStore()

class AppContainer extends React.Component {
  render = () => (
    <Provider store={store}>
      <App>
        <LeftBar />
        <Field />
        <RightBar />
      </App>
    </Provider>
  )
}

export default AppContainer
