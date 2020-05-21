import {fork, put, race, takeLatest, take} from 'redux-saga/effects'
import {apiCall} from '../../../common/utils/network/crud'
import {reducerFor} from '../../../common/utils/network/reducer-for'
import {typesFor} from "../../../common/utils/network/types-for";
import {CRUD_ERROR} from "../../../common/components/snackbar-error";
import {LOADING_CHANGE} from "../../../common/components/loader";


export const FETCH_LIST = 'FETCH_LIST'
export const CHANGE_VOTE = 'CHANGE_VOTE'

export const fetchList = index => ({type: FETCH_LIST, index})
export const checkVote = (item, refetch) => ({type: CHANGE_VOTE, item: item, refetch: refetch})

export const listsReducer = reducerFor(FETCH_LIST, [])

function* handleFetchList({index}) {
    yield put(apiCall(FETCH_LIST, ENDPOINTS[index], data => data.items).fetch())
}

const ENDPOINTS = [
    '/main',
    '/newest',
    '/urls',
    '/ask'
]

export function* handleVote({item, refetch}) {
    // To show a loader on the upcoming action if any is listening to the refetch type
    yield put({type: LOADING_CHANGE, resourceName: refetch.type, loadingStatus: true})

    const apiCallForVotingStuff = apiCall(CHANGE_VOTE, `/item/${item.id}/like`)

    const actions = typesFor(CHANGE_VOTE)
    yield put(item.liked ? apiCallForVotingStuff.delete() : apiCallForVotingStuff.create())

    const successAction = item.liked ? actions.deleteSuccess : actions.createSuccess
    const errorAction = item.liked ? actions.deleteError : actions.createError
    const [error] = yield race([take(errorAction), take(successAction)])

    if (!!error) {
        yield put({type: CRUD_ERROR, message: null})
        yield put({type: CRUD_ERROR, message: "There was en error with the vote"})
    }
    yield put(refetch)
}


export function* listsSaga() {
    function* watchFetchList() {
        yield takeLatest(FETCH_LIST, handleFetchList)
    }

    function* watchVote() {
        yield takeLatest(CHANGE_VOTE, handleVote)
    }

    yield fork(watchFetchList)
    yield fork(watchVote)
}


