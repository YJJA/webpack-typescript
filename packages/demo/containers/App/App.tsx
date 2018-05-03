import * as React from 'react'
import {asyncComponent} from 'react-async-component'
import {Switch, Route} from 'react-router-dom'

import Loading from '../../components/Loading'

const Home = asyncComponent({
  resolve: () => import(/* webpackChunkName: "Home" */'../Home'),
  LoadingComponent: Loading
})

const NotFound = asyncComponent({
  resolve: () => import(/* webpackChunkName: "NotFound" */'../NotFound'),
  LoadingComponent: Loading
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
