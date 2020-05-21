import {fork, put, race, take, takeLatest} from 'redux-saga/effects'
import { apiCall } from '../../../common/utils/network/crud'
import { reducerFor } from '../../../common/utils/network/reducer-for'
import {typesFor} from "../../../common/utils/network/types-for";



export const FETCH_LIST = 'FETCH_LIST'
export const CHANGE_VOTE = 'CHANGE_VOTE'

export const fetchList = index => ({ type: FETCH_LIST, index })
export const checkVote = (item, refetch) => ({type: CHANGE_VOTE, item, refetch: {type: refetch}})

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

export function * handleVote ({ item }) {
    const apiCallForVotingStuff = apiCall(CHANGE_VOTE, `/item/${item.id}/like`)

    const actions = actionFor(CHANGE_VOTE)
    yield put(item.liked ? apiCallForVotingStuff.deleteSilent() : apiCallForVotingStuff.updateSilent())

    const successAction = item.liked ? actions.deleteSuccess : actions.updateSuccess
    const errorAction = item.liked ? actions.deleteError : actions.updateError
    const [error] = yield race([errorAction, successAction])

    if (!!error) {
        yield put({type: CHANGE_VOTE, message: null})
        yield put({type: CHANGE_VOTE, message: "There was en error with the vote"})
    }
    yield put(refetch)
}


export function * listsSaga () {
    function * watchFetchList () {
        yield takeLatest(FETCH_LIST, handleFetchList)
    }
    function * watchVote () {
        yield takeLatest(CHANGE_VOTE, handleVote)
    }

    yield fork(watchFetchList)
    yield fork(watchVote)
}


