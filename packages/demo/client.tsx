import 'normalize.css'
import './theme/global'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter as Router} from 'react-router-redux'
import {AsyncComponentProvider} from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import createHistory from 'history/createBrowserHistory'
import {Location} from 'history'

import configureStore from './redux/store'
import App from './containers/App'

const initialState = window.__INITIAL_STATE__
const rehydrateState = window.ASYNC_COMPONENTS_STATE
const history = createHistory()
const store = configureStore(history, initialState)

let prevLocation: Location
history.listen(location => {
  const pathChanged = !prevLocation || prevLocation.pathname !== location.pathname
  const hashChanged = !prevLocation || prevLocation.hash !== location.hash
  if (pathChanged || hashChanged) window.scrollTo(0, 0)
  prevLocation = location
})

const app = (
  <AsyncComponentProvider rehydrateState={rehydrateState}>
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  </AsyncComponentProvider>
)

asyncBootstrapper(app).then(() => {
  ReactDOM.hydrate(app, document.getElementById('app'))
})
