import React, { useEffect } from 'react'
import { TopAppBarFixedAdjust } from '@rmwc/top-app-bar'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_LIST, fetchList } from '../duckies/index'
import { ContributionsList } from './contributions-list'
import styled from 'styled-components'
import { Loader } from '../../../common/components/loader'
import { ListToolbar } from './list-toolbar'

export const ListScreen = () => {
    const dispatch = useDispatch()
    const list = useSelector(state => state.list || [])

    useEffect(() => {
        fetch(0)
    }, [])

    const fetch = index => dispatch(fetchList(index))

    return (
        <>
            <ListToolbar onClick={(pos) => (dispatch(fetch(pos)))}/>
            <Loader resourceName={FETCH_LIST}/>

            <ContributionsContainer>
                <ContributionsList list={list}/>
            </ContributionsContainer>
        </>
    )
}

const CenteredContainer = styled.div`
    float: none;
    margin: 0 auto;
`

const ContributionsContainer = styled(CenteredContainer)`
    padding: 50px;
    max-width: 1280px;
    float: none;
    margin: 0 auto;
`


