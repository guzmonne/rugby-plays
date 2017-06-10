import '../_styles/App.css';
import React from "react"
import {Provider} from 'react-redux'
import configureStore from '../store/configureStore.js'
import Field from './Field.js'
import LeftBar from '../components/LeftBar/'
import {RightBar} from '../components/RightBar/'

const store = configureStore()

class App extends React.Component {
  render = () => (
    <Provider store={store}>
      <div className="App">
        <LeftBar />
        <Field />
        <RightBar />
      </div>
    </Provider>
  )
}

export default App
