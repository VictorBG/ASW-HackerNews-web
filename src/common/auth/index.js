import {reducerFor} from "../utils/network/reducer-for";
import {fork, put, takeLatest} from "@redux-saga/core/effects";
import {apiCall} from "../utils/network/crud";

export const LOGIN = 'LOGIN'

export const login = (id, userName) => ({type: LOGIN, id, userName})

export const loginReducer = reducerFor(LOGIN, null)

function* handleLogin({id, userName}) {
  yield put(apiCall(LOGIN, '/user').create({id, userName}))
}

export function* loginSaga() {
  function* watchLogin() {
    yield takeLatest(LOGIN, handleLogin)
  }

  yield fork(watchLogin)
}
