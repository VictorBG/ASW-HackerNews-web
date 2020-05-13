import { typesFor } from './types-for'
import { createReducer } from '@reduxjs/toolkit'

/**
 * Creates a reducer for the given name to handle all of the CRUD success states.
 * It saves the provided data in the action directly to the state, any transformation to it
 * must be performed before
 *
 * @param name
 * @param defaultState
 * @returns {Reducer<{}>}
 */
export const reducerFor = (name, defaultState = {}) => {

    const actionTypes = typesFor(name)

    const handlers = {
        [actionTypes.createSuccess]: (state, action) => handlers[actionTypes.fetchSuccess](state, action),
        [actionTypes.updateSuccess]: (state, action) => handlers[actionTypes.fetchSuccess](state, action),
        [actionTypes.deleteSuccess]: (state, action) => handlers[actionTypes.fetchSuccess](state, action),
        [actionTypes.fetchSuccess]: (state, { data }) => {
            if (data) {
                return data
            }
            else {
                return state
            }
        }
    }

    return createReducer(defaultState, handlers)
}
