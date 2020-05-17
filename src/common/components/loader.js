import React from 'react'
import { useSelector } from 'react-redux'
import { LinearProgress } from '@rmwc/linear-progress'
import { createReducer } from '@reduxjs/toolkit'
import styled from 'styled-components'

export const LOADING_CHANGE = 'LOADING_CHANGE'

export const linearLoadingReducer = createReducer({}, {
    [LOADING_CHANGE]: (state, { resourceName, loadingStatus }) => {
        return Object.assign({}, state, {
            [resourceName]: loadingStatus
        })
    }
})

export const Loader = ({ resourceName, loader }) => {

    const loading = useSelector((state) => state.loading[resourceName])

    if (!loader) {
        loader = <StyledLinear/>
    }

    return (<>{!!loading && loader}</>)
}

const StyledLinear = styled(LinearProgress)`
    --mdc-theme-primary: #ff6600;
`
