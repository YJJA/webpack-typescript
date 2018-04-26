import 'normalize.css'
import './theme/global'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter as Router} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import {Location} from 'history'
import * as Loadable from 'react-loadable'

import configureStore from './redux/store'
import App from './containers/App'

declare global {
  interface Window {
    __INITIAL_STATE__: any
    bootstrap: Function
  }
}

const initialState = window.__INITIAL_STATE__
const history = createHistory()
const store = configureStore(history, initialState)

let prevLocation: Location
history.listen(location => {
  const pathChanged = !prevLocation || prevLocation.pathname !== location.pathname
  const hashChanged = !prevLocation || prevLocation.hash !== location.hash
  if (pathChanged || hashChanged) window.scrollTo(0, 0)
  prevLocation = location
})

window.bootstrap = () => {
  Loadable.preloadReady().then(() => {
    console.log('preloadReady.........')
    ReactDOM.hydrate(
      <Provider store={store}>
        <Router history={history}>
          <App/>
        </Router>
      </Provider>,
      document.getElementById('app')
    )
  })
}
