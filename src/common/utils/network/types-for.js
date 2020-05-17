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
        `${name}_${action}_${result}`

    return {
        fetchStart: actionName(FETCH, START),
        fetchSuccess: actionName(FETCH, SUCCESS),
        fetchError: actionName(FETCH, ERROR),

        createStart: actionName(CREATE, START),
        createSuccess: actionName(CREATE, SUCCESS),
        createError: actionName(CREATE, ERROR),

        updateStart: actionName(UPDATE, START),
        updateSuccess: actionName(UPDATE, SUCCESS),
        updateError: actionName(UPDATE, ERROR),

        deleteStart: actionName(DELETE, START),
        deleteSuccess: actionName(DELETE, SUCCESS),
        deleteError: actionName(DELETE, ERROR)
    }
}

export const FETCH = 'FETCH'
export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const DELETE = 'DELETE'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'
export const START = 'START'
