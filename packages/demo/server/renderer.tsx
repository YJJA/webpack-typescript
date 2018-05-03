/// <reference types="node" />
import * as fse from 'fs-extra'
import * as path from 'path'
import * as Koa from 'koa'

import * as React from 'react'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {ConnectedRouter as Router} from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import serialize from 'serialize-javascript'

import configureStore from '../redux/store'
import App from '../containers/App'

export default async function renderer(ctx: Koa.Context) {
  const history = createHistory({
    initialEntries: [ctx.request.url]
  })

  const store = configureStore(history)

  const indexPath = path.resolve(__dirname, `./index.html`)
  let content = await fse.readFile(indexPath, 'utf8')

  const asyncContext = createAsyncContext()
  const sheet = new ServerStyleSheet()

  const app = (
    <AsyncComponentProvider asyncContext={asyncContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <Provider store={store}>
          <Router history={history}>
            <App/>
          </Router>
        </Provider>
      </StyleSheetManager>
    </AsyncComponentProvider>
  )

  await asyncBootstrapper(app)
  const html = renderToString(app)
  const styleTags = sheet.getStyleTags()
  const asyncState = asyncContext.getState()

  // hmtl
  content = content.replace('<!--html-->', html)

  // local data
  if (typeof ctx.localeData === 'object') {
    const localeScripts = Object.keys(ctx.localeData).map(key => {
      return `window.${key}=${JSON.stringify(ctx.localeData[key])}`
    }).join(';')
    content = content.replace(/(<\/head>)/, `<script>${localeScripts}</script>$1`)
  }

  // async state
  content = content.replace(/(<\/head>)/, `<script>window.ASYNC_COMPONENTS_STATE=${serialize(asyncState)}</script>$1`)

  // styled
  content = content.replace(/(<\/head>)/, `${styleTags}$1`)

  ctx.body = content
}
