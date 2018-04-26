import * as React from 'react'
import * as Loadable from 'react-loadable'
import {Switch, Route} from 'react-router-dom'

import Loading from '../../components/Loading'

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */'../Home'),
  loading: Loading,
  modules: ['../Home']
})

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */'../NotFound'),
  loading: Loading,
  modules: ['../NotFound']
})

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
