import {apiCall} from '../../../common/utils/network/crud'
import {fork, put, takeLatest} from 'redux-saga/effects'
import {reducerFor} from '../../../common/utils/network/reducer-for'

export const USER_PROFILE = 'USER_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

export const profile = (id) => ({type: USER_PROFILE, id})

export const userReducer = reducerFor(USER_PROFILE, null)

export const updateProfile = (data, id) => ({type: UPDATE_PROFILE, ...data, id})

function* handleUserProfile({id}) {
  yield put(apiCall(USER_PROFILE, `/user/${id}`).fetch())
}

function* handleUpdateProfile({payload}) {
  yield put(apiCall(USER_PROFILE, `/user`).update(payload))
}

export function* profileSaga() {
  function* watchProfile() {
    yield takeLatest(USER_PROFILE, handleUserProfile)
  }

  function* updateProfile() {
    yield takeLatest(UPDATE_PROFILE, handleUpdateProfile)
  }

  yield fork(watchProfile)
  yield fork(updateProfile)
}
