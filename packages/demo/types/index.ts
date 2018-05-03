import * as Redux from 'redux'

declare global {
  interface Window {
    __INITIAL_STATE__: any
    ASYNC_COMPONENTS_STATE: any
  }
}

export interface Action extends Redux.Action {
  payload?: any
}

export interface IState {
  [key: string]: any
}
