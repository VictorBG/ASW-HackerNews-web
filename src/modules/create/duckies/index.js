import { fork, takeLatest } from 'redux-saga/effects'
import { apiCall } from '../../../common/utils/network/crud'

export const POST_CONTRIBUTION = 'POST_CONTRIBUTION'

export const postNewContribution = () => ({ type: POST_CONTRIBUTION })

function * handlePostContribution ({ index }) {
    yield apiCall(POST_CONTRIBUTION, ENDPOINTS[index]).create()
}

export function * contributionSaga () {
    function * watchPostContributionSaga () {
        yield takeLatest(POST_CONTRIBUTION, handlePostContribution)
    }

    yield fork(watchPostContributionSaga)
}




