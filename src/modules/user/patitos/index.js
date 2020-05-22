import {apiCall} from '../../../common/utils/network/crud'
import {fork, put, takeLatest} from 'redux-saga/effects'
import {reducerFor} from '../../../common/utils/network/reducer-for'

export const USER_PROFILE = 'USER_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const VOTED_SUBMISSIONS = 'VOTED_SUBMISSIONS'
export const VOTED_COMMENTS = 'VOTED_COMMENTS'

export const profile = (id) => ({type: USER_PROFILE, id})

export const userReducer = reducerFor(USER_PROFILE, null)

export const updateProfile = (data, id) => ({type: UPDATE_PROFILE, ...data, id})
export const getUpVotedSubmissions = (id) => ({type: USER_PROFILE, id})
export const getUpVotedComments =(id) => ({type: USER_PROFILE, id})

function* handleUserProfile({id}) {
  yield put(apiCall(USER_PROFILE, `/user/${id}`).fetch())
}

function* handleUpdateProfile({payload}) {
  yield put(apiCall(USER_PROFILE, `/user`).update(payload))
}

function * handleListVotedSubmissions(id) {
  yield put(apiCall(VOTED_SUBMISSIONS, `/upVotedSubmissions/${id}`)).fetch()
}
function * handleListVotedComments(id) {
  yield put(apiCall(VOTED_COMMENTS, `/upVotedComments/${id}`)).fetch()
}

export function* profileSaga() {
  function* watchProfile() {
    yield takeLatest(USER_PROFILE, handleUserProfile)
  }

  function* updateProfile() {
    yield takeLatest(UPDATE_PROFILE, handleUpdateProfile)
  }

  function * listVotedSubmissions() {
    yield takeLatest(VOTED_SUBMISSIONS, handleListVotedSubmissions)
  }

  function * listVotedComments() {
    yield takeLatest(VOTED_COMMENTS, handleListVotedComments)
  }

  yield fork(watchProfile)
  yield fork(updateProfile)
  yield fork(listVotedSubmissions)
  yield fork(listVotedComments)
}
