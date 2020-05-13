/**
 * https://redux-resource.js.org/api-reference/action-types
 *
 * Action types name for a given name, it only created ERROR and SUCCESS states,
 * neither IDLE nor PENDING are created therefore they are not handler elsewhere by any
 * reducer
 *
 * @param name
 * @returns {{updateSuccess: string, fetchSuccess: string, fetchError: string, deleteSuccess: string, createError: string, createSuccess: string, updateError: string, deleteError: string}}
 */
export const typesFor = (name) => {

    const actionName = (action, result) =>
        `${name.toUpperCase()}_${action.toUpperCase()}_${result.toUpperCase()}`

    return {
        fetchSuccess: actionName(FETCH, SUCCESS),
        fetchError: actionName(FETCH, ERROR),
        createSuccess: actionName(CREATE, SUCCESS),
        createError: actionName(CREATE, ERROR),
        updateSuccess: actionName(UPDATE, SUCCESS),
        updateError: actionName(UPDATE, ERROR),
        deleteSuccess: actionName(DELETE, SUCCESS),
        deleteError: actionName(DELETE, ERROR)
    }
}

const FETCH = 'fetch'
const CREATE = 'create'
const UPDATE = 'update'
const DELETE = 'delete'
const SUCCESS = 'success'
const ERROR = 'error'
