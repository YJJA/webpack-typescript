import * as request from 'superagent'
import { Dispatch, ActionCreator } from 'react-redux'
import {ThunkAction} from 'redux-thunk'

import {Action, IState} from '../../types'

const LOGOUT = 'user/LOGOUT'
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'user/LOGOUT_FAILURE'

type State = {
  isFetching: boolean,
  data: null | Object
  error: null | Object
}

const initialState: State = {
  isFetching: false,
  data: null,
  error: null
}

export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case LOGOUT:
      return {...state, isFetching: true, error: null}

    case LOGOUT_FAILURE:
      return {...state, isFetching: false, error: action.payload}

    case LOGOUT_SUCCESS:
      return {...state, isFetching: false, data: null}

    default:
      return state
  }
}

// actions
export const logout: ActionCreator<ThunkAction<Promise<any>, IState, void>> = () =>
  async (dispatch: Dispatch<IState>): Promise<any> => {
    dispatch({type: LOGOUT})

    try {
      const payload = await request.get('/logout')
      dispatch({type: LOGOUT_SUCCESS})
      return payload
    } catch (payload) {
      dispatch({type: LOGOUT_FAILURE, payload})
      throw payload
    }
  }
