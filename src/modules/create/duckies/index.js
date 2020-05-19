import { fork, put, race, take, takeLatest } from 'redux-saga/effects'
import { apiCall } from '../../../common/utils/network/crud'
import { typesFor } from '../../../common/utils/network/types-for'

export const POST_CONTRIBUTION = 'POST_CONTRIBUTION'

export const postNewContribution = (data) => ({ type: POST_CONTRIBUTION, ...data })

function * handlePostContribution ({ data }) {
    let payload = (({title, url, text}) => ({title, url, text}))(data)
    yield put(apiCall(POST_CONTRIBUTION, "/item").create(payload))

    // Para determinar si ha habido exito o no al lanzar la petición.
    const {createSuccess, createError} = typesFor(POST_CONTRIBUTION)
    const [success] = yield race([take(createSuccess), take(createError)])
    if (success) {
        //TODO: Change this to /newest or similar
        data.h.push('/')
    }
}

export function * contributionSaga () {
    function * watchPostContributionSaga () {
        yield takeLatest(POST_CONTRIBUTION, handlePostContribution)
    }

    yield fork(watchPostContributionSaga)
}




