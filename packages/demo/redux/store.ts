import {createStore, compose, applyMiddleware, Middleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import {routerMiddleware} from 'react-router-redux'
import {History} from 'history'

const logger: Middleware = () => (next) => (action: any) => {
  if (process.env.RUNTIME_ENV === 'client') {
    console.log('dispatching', action)
  }
  return next(action)
}

function configureStore(history: History, initialState?: any) {
  const middlewares = [
    thunk,
    routerMiddleware(history),
    logger
  ]

  const enhancers = [applyMiddleware(...middlewares)]
  const store = createStore(rootReducer, initialState, compose(...enhancers))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      try {
        const nextReducer = require('./reducer').default
        store.replaceReducer(nextReducer)
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${error}`)
      }
    })
  }

  return store
}

export default configureStore
