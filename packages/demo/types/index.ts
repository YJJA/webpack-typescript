import * as Redux from 'redux'

export interface Action extends Redux.Action {
  payload?: any
}

export interface Dispatch extends Redux.Dispatch<Action> {}
