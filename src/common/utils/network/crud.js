import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { CRUD_ERROR } from '../../components/snackbar-error'
import { typesFor } from './types-for'
import { LOADING_CHANGE } from '../../components/loader'

/**
 * Performs an operation on the API and dispatches the result to success or fail, whatever
 * happens. It also applies the given transform function when dispatching the success action
 *
 * @param resource
 * @param request      The request to perform
 * @param success      type to dispatch when the call succeeds
 * @param fail         type to dispatch when the call fails
 * @param transform    Transform to apply to the data of the call when it is dispatched
 */
function * doRequest (resource, request, success, fail, transform = (transform) => transform) {
    yield put({ type: LOADING_CHANGE, resourceName: resource, loadingStatus: true })
    try {
        const response = yield request
        yield put({ type: LOADING_CHANGE, resourceName: resource, loadingStatus: false })
        yield put({ type: success, data: transform(response.data) })
    } catch (error) {
        // dispatches a CRUD_ERROR so the error snackbar can be shown
        // it first dispatches a null CRUD_ERROR to remove any previous error
        yield put({ type: LOADING_CHANGE, resourceName: resource, loadingStatus: false })
        yield put({ type: CRUD_ERROR, message: null })
        yield put({ type: CRUD_ERROR, message: error.message })
        yield put({ type: fail, error })
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
 * @param name
 * @param endpoint
 * @param transform
 * @returns {{fetch: (function(): Generator<*|<"PUT", PutEffectDescriptor<{data: *, type: *}>>|<"PUT", PutEffectDescriptor<{type: string, message: *}>>|<"PUT", PutEffectDescriptor<{type: *, error: *}>>, void, *>), create: (function(): Generator<*|<"PUT", PutEffectDescriptor<{data: *, type: *}>>|<"PUT", PutEffectDescriptor<{type: string, message: *}>>|<"PUT", PutEffectDescriptor<{type: *, error: *}>>, void, *>), update: (function(): Generator<*|<"PUT", PutEffectDescriptor<{data: *, type: *}>>|<"PUT", PutEffectDescriptor<{type: string, message: *}>>|<"PUT", PutEffectDescriptor<{type: *, error: *}>>, void, *>), delete: (function(): Generator<*|<"PUT", PutEffectDescriptor<{data: *, type: *}>>|<"PUT", PutEffectDescriptor<{type: string, message: *}>>|<"PUT", PutEffectDescriptor<{type: *, error: *}>>, void, *>)}}
 */
export function apiCall (name, endpoint, transform = (transform) => transform) {
    return {
        fetch: function () {
            const { fetchSuccess, fetchError } = typesFor(name)
            return doRequest(name, call(axios.get, endpoint), fetchSuccess, fetchError, transform)
        },
        create: function () {
            const { createSuccess, createError } = typesFor(name)
            return doRequest(name, call(axios.post, endpoint), createSuccess, createError, transform)
        },
        update: function () {
            const { updateSuccess, updateError } = typesFor(name)
            return doRequest(name, call(axios.put, endpoint), updateSuccess, updateError, transform)
        },
        delete: function () {
            const { deleteSuccess, deleteError } = typesFor(name)
            return doRequest(name, call(axios.delete, endpoint), deleteSuccess, deleteError, transform)
        }
    }
}

/**
 * Adds default configuration to axios.
 *
 * @param config The configuration to add
 */
export function setRequestDefaults (config) {
    Object.assign(axios.defaults, config)
}
