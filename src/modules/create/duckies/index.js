import { fork, takeLatest } from 'redux-saga/effects'
import { apiCall } from '../../../common/utils/network/crud'
import {race} from "redux-saga/effects";
import {typesFor} from "../../../common/utils/network/types-for";
import {take} from "redux-saga/effects";

export const POST_CONTRIBUTION = 'POST_CONTRIBUTION'

export const postNewContribution = (data) => ({ type: POST_CONTRIBUTION, ...data })

function * handlePostContribution ({ payload }) {
    console.log(payload)
    yield apiCall(POST_CONTRIBUTION, "/item").create(payload)

    // Para determinar si se ha habido exito o no al lanzar la petición.
    const {createSuccess, createError} = typesFor(POST_CONTRIBUTION)
    console.log("Create Success: " , createSuccess)
    console.log("Create Error: ", createError)
    const [success, error] = yield race(take(createSuccess), take(createError))
    console.log("Success: " , success)
    console.log("Error: ", error)
    if (success) {
        // Redirect
    }
}

export function * contributionSaga () {
    function * watchPostContributionSaga () {
        yield takeLatest(POST_CONTRIBUTION, handlePostContribution)
    }

    yield fork(watchPostContributionSaga)
}




