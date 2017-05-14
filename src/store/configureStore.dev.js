import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers.js'

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers.js', () => {
      const nextRootReducer = require('./reducers.js').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
