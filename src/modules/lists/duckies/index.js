import {fork, put, race, take, takeLatest} from 'redux-saga/effects'
import { apiCall } from '../../../common/utils/network/crud'
import { reducerFor } from '../../../common/utils/network/reducer-for'
import {typesFor} from "../../../common/utils/network/types-for";



export const FETCH_LIST = 'FETCH_LIST'

export const fetchList = index => ({ type: FETCH_LIST, index })

export const listsReducer = reducerFor(FETCH_LIST, [])

function * handleFetchList ({ index }) {
    yield put(apiCall(FETCH_LIST, ENDPOINTS[index], data => data.items).fetch())
}

const ENDPOINTS = [
    '/main',
    '/newest',
    '/urls',
    '/ask'
]

export function * listsSaga () {
    function * watchFetchList () {
        yield takeLatest(FETCH_LIST, handleFetchList)
    }
    yield fork(watchFetchList)
}

export const UPVOTE_CONTRIBUTION = 'UPVOTE_CONTRIBUTION'
export const UNVOTE_CONTRIBUTION = 'UNVOTE_CONTRIBUTION'

export function * upVotePostIfPossible ({ item }) {
    yield put(apiCall(UPVOTE_CONTRIBUTION, "/likes"), item.id, item.user.username)
    // Para determinar si ha habido exito o no al lanzar la petición.
    const {createSuccess, createError} = typesFor(UPVOTE_CONTRIBUTION)
    const [success] = yield race([take(createSuccess), take(createError)])
    if (success) {
        // Redirect
    }
}

export function * unVotePostIfPossible ({ item }) {
    yield put(apiCall(UNVOTE_CONTRIBUTION, "/likes"), item.id, item.user.username)
    // Para determinar si ha habido exito o no al lanzar la petición.
    const {createSuccess, createError} = typesFor(UNVOTE_CONTRIBUTION)
    const [success] = yield race([take(createSuccess), take(createError)])
    if (success) {
        // Redirect
    }
}


