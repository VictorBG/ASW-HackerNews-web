import { fork, takeLatest } from 'redux-saga/effects'
import { apiCall } from '../../../common/utils/network/crud'
import { reducerFor } from '../../../common/utils/network/reducer-for'

export const FETCH_LIST = 'FETCH_LIST'
export const POST_CONTRIBUTION = 'POST_CONTRIBUTION'

export const fetchList = index => ({ type: FETCH_LIST, index })

export const listsReducer = reducerFor(FETCH_LIST, [])

function * handleFetchList ({ index }) {
    yield apiCall(FETCH_LIST, ENDPOINTS[index], data => data.items).fetch()
}

const ENDPOINTS = [
    '/main',
    '/newest',
    '/urls',
    'ask'
]

export function * listsSaga () {
    function * watchFetchList () {
        yield takeLatest(FETCH_LIST, handleFetchList)
    }

    yield fork(watchFetchList)
}


