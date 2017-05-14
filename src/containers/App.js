import React from "react"
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore.js'
import Component from '../components/App.js'
import Field from '../containers/Field.js'
import LeftBar from '../containers/LeftBar.js'
import RightBar from '../containers/RightBar.js'

const store = configureStore()

class App extends React.Component {
  render = () => (
    <Provider store={store}>
      <Component>
        <LeftBar />
        <Field />
        <RightBar />
      </Component>
    </Provider>
  )
}

export default App
