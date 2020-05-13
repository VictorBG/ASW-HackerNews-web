import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Snackbar } from '@rmwc/snackbar'
import { createReducer } from '@reduxjs/toolkit'

export const CRUD_ERROR = 'CRUD_ERROR'

export const errorReducer = createReducer(null, {
    [CRUD_ERROR]: (state, action) => action.message
})

/**
 * Interacts on a change on the state to show if an error has occurred. It show
 * during certain time and then disappears
 *
 */
export const SnackbarError = () => {
    const error = useSelector((state) => state.error)
    const dispatch = useDispatch()
    const clearError = () => {
        dispatch({ type: CRUD_ERROR, message: null })
    }

    return (
        <>
            {!!error &&
            <Snackbar
                open
                onClose={() => clearError}
                message={error}
                dismissesOnAction
            />
            }
        </>
    )
}
