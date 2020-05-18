import {apiCall} from "../../../common/utils/network/crud";
import { fork, put, takeLatest } from 'redux-saga/effects'
import {reducerFor} from "../../../common/utils/network/reducer-for";

export const USER_PROFILE = 'USER_PROFILE'

export const profile = (id) => ({type: USER_PROFILE, id})

export const userReducer = reducerFor(USER_PROFILE, [])

function * handleUserProfile ({ id }) {

  yield put(apiCall(USER_PROFILE, `/user/${id}`).fetch())
}

// function * handleUpdateProfile ({ payload }) {
//   yield put(apiCall(USER_PROFILE, 'user').fetch())
// }

export function * profileSaga () {
  function * watchProfile () {
    yield takeLatest(USER_PROFILE, handleUserProfile)
  }

  yield fork(watchProfile)
}