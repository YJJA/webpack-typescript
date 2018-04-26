import * as request from 'superagent'
import {Dispatch, Action} from '../../types'

const LOGOUT = 'user/LOGOUT'
const LOGOUT_SUCCESS = 'user/LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'user/LOGOUT_FAILURE'

const initialState = {
  isFetching: false,
  data: null,
  error: null
}

export default (state = initialState, action: Action) => {
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
// 退出
export const logout = () => (dispatch: Dispatch) => {
  dispatch({type: LOGOUT})
  return request
    .get('/logout')
    .then(() => dispatch({type: LOGOUT_SUCCESS}))
    .catch(payload => {
      dispatch({type: LOGOUT_FAILURE, payload})
      throw payload
    })
}
