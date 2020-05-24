import axios from 'axios'
import {call, fork, put, select, takeEvery} from 'redux-saga/effects'
import {CRUD_ERROR} from '../../components/snackbar-error'
import {CREATE, DELETE, FETCH, START, typesFor, UPDATE} from './types-for'
import {LOADING_CHANGE} from '../../components/loader'

/**
 * Performs an operation on the API and dispatches the result to success or fail, whatever
 * happens. It also applies the given transform function when dispatching the success action
 *
 * @param resource
 * @param request      The request to perform
 * @param success      type to dispatch when the call succeeds
 * @param fail         type to dispatch when the call fails
 * @param transform    Transform to apply to the data of the call when it is dispatched
 * @param silent
 */
function* doRequest(resource, request, success, fail, transform = (transform) => transform, silent = false) {
    yield put({type: LOADING_CHANGE, resourceName: resource, loadingStatus: true})

    if (!axios.defaults.headers.common.Authorization) {
        const user = yield select((state) => state.user)
        if (!!user) {
            setRequestDefaults({
                headers: {
                    common: {
                        'Authorization': user.token
                    }
                }
            })
        }
    }

    try {
        const response = yield request
        yield put({type: LOADING_CHANGE, resourceName: resource, loadingStatus: false})
        yield put({type: success, data: transform(response.data)})
    } catch (error) {
        // dispatches a CRUD_ERROR so the error snackbar can be shown
        // it first dispatches a null CRUD_ERROR to remove any previous error
        yield put({type: LOADING_CHANGE, resourceName: resource, loadingStatus: false})
        const message = !!error.response && !!error.response.data && !!error.response.data.message
            ? error.response.data.message
            : 'Could not connect to the server'

        if (!silent) {
            yield put({type: CRUD_ERROR, message: null})
            yield put({type: CRUD_ERROR, message})
        }
        yield put({type: fail, error})
    }
}

/**
 * Util to do an api call.
 *
 * It does one of the four CRUD operations and automatically dispatches the results to the given
 * name. The action types of the name must be a reducer of the store
 * in order to automatically handle the response of the call.
 *
 * It also accepts a transform function to transform the response data of the call
 *
 */
function crudHandlers() {
    return {
        fetch: function (action) {
            const {fetchSuccess, fetchError} = typesFor(action.name)
            return doRequest(action.name, call(axios.get, action.endpoint), fetchSuccess, fetchError, action.transform, action.silent)
        },
        create: function (action) {
            const {createSuccess, createError} = typesFor(action.name)
            return doRequest(action.name, call(axios.post, action.endpoint, action.data), createSuccess, createError, action.transform, action.silent)
        },
        update: function (action) {
            const {updateSuccess, updateError} = typesFor(action.name)
            return doRequest(action.name, call(axios.put, action.endpoint, action.data), updateSuccess, updateError, action.transform, action.silent)
        },
        delete: function (action) {
            const {deleteSuccess, deleteError} = typesFor(action.name)
            return doRequest(action.name, call(axios.delete, action.endpoint), deleteSuccess, deleteError, action.transform, action.silent)
        }
    }
}

export function apiCall(name, endpoint, transform = (transform) => transform) {
    return {
        fetch: function () {
            const {fetchStart} = typesFor(name)
            return {type: fetchStart, name, endpoint, transform}
        },
        create: function (data) {
            const {createStart} = typesFor(name)
            return {type: createStart, name, endpoint, transform, data}
        },
        update: function (data) {
            const {updateStart} = typesFor(name)
            return {type: updateStart, name, endpoint, transform, data}
        },
        delete: function () {
            const {deleteStart} = typesFor(name)
            return {type: deleteStart, name, endpoint, transform}
        },
        fetchSilent: function () {
            return {...this.fetch(), silent: true}
        },
        createSilent: function (data) {
            return {...this.create(data), silent: true}
        },
        updateSilent: function (data) {
            return {...this.update(data), silent: true}
        },
        deleteSilent: function () {
            return {...this.delete(), silent: true}
        }
    }
}

export function* crudSaga() {
    const start = (a) => (action) => action.type.endsWith(`${a}_${START}`)
    const handlers = crudHandlers()

    function* watchFetch() {
        yield takeEvery(start(FETCH), handlers.fetch)
    }

    function* watchCreate() {
        yield takeEvery(start(CREATE), handlers.create)
    }

    function* watchUpdate() {
        yield takeEvery(start(UPDATE), handlers.update)
    }

    function* watchDelete() {
        yield takeEvery(start(DELETE), handlers.delete)
    }

    yield fork(watchFetch)
    yield fork(watchUpdate)
    yield fork(watchCreate)
    yield fork(watchDelete)
}

/**
 * Adds default configuration to axios.
 *
 * @param config The configuration to add
 */
export function setRequestDefaults(config) {
    Object.assign(axios.defaults, config)
}
