import { fork, put, race, take, takeLatest } from 'redux-saga/effects'
import { apiCall } from '../../../common/utils/network/crud'
import { typesFor } from '../../../common/utils/network/types-for'
import { createReducer } from '@reduxjs/toolkit'

export const GET_CONTRIBUTION = 'GET_CONTRIBUTION'
export const POST_COMMENT = 'POST_COMMENT'

export const contributionDetails = (id) => ({ type: GET_CONTRIBUTION, id })
export const postComment = (data) => ({ type: POST_COMMENT, ...data })

export function contributionDetailsReducer () {
    const actionTypes = typesFor(GET_CONTRIBUTION)
    return createReducer({}, {
        [actionTypes.fetchSuccess]: (state, { data }) => {
            return Object.assign({}, state, {
                [data.id]: data
            })
        }
    })
}

function * handleContribution ({ id }) {
    yield put(apiCall(GET_CONTRIBUTION, `/item?itemid=${id}`).fetch())
}

function * handlePostComment ({data}) {
    let payload = (({parentId, text}) => ({parentId, text}))(data)
    yield put(apiCall(POST_COMMENT, "/item/comment").create(payload))

    // Para determinar si ha habido exito o no al lanzar la petición.
    const {createSuccess, createError} = typesFor(POST_COMMENT)
    const [success] = yield race([take(createSuccess), take(createError)])
    if (success) {
        if (data.contributionTopParentId === 0) {
            data.h.go(0)
        } else {
            data.h.push('/item/' + data.contributionTopParentId)
        }
    }
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
