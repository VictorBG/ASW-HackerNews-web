import { fork, put, race, take, takeLatest } from 'redux-saga/effects'
import { apiCall } from '../../../common/utils/network/crud'
import { typesFor } from '../../../common/utils/network/types-for'
import {reducerFor} from '../../../common/utils/network/reducer-for'

export const GET_CONTRIBUTION = 'GET_CONTRIBUTION'
export const POST_COMMENT = 'POST_COMMENT'

export const contributionDetails = (id) => ({type: GET_CONTRIBUTION, id})
export const postComment = (data) => ({ type: POST_COMMENT, ...data })

export const contributionDetailsReducer = reducerFor(GET_CONTRIBUTION);

function * handleContribution({id}) {
    console.log("Ruta: " + `/item?itemid=${id}`)
    yield put(apiCall(GET_CONTRIBUTION, `/item?itemid=${id}`).fetch())
}

function * handlePostComment ({ payload }) {
    /*yield put(apiCall(POST_COMMENT, "/item").create(payload))

    // Para determinar si ha habido exito o no al lanzar la petición.
    const {createSuccess, createError} = typesFor(POST_COMMENT)
    const [success] = yield race([take(createSuccess), take(createError)])
    if (success) {
        // Redirect
    }*/
}

export function * contributionDetailsSaga () {
   function * watchGetContribution () {
       yield takeLatest(GET_CONTRIBUTION, handleContribution)
   }

    function * watchPostComment () {
        yield takeLatest(POST_COMMENT, handlePostComment)
    }

    yield fork(watchGetContribution)
    yield fork(watchPostComment)
}