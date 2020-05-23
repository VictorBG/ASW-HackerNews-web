import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_LIST, fetchList } from '../duckies/index'
import { ContributionsList } from './contributions-list'
import styled from 'styled-components'
import { Loader } from '../../../common/components/loader'
import { ListToolbar } from './list-toolbar'

export const ListScreen = () => {
    const dispatch = useDispatch()
    const list = useSelector(state => state.list || [])

    const [index, setIndex] = useState(0)

    const fetch = index => {
        setIndex(index)
        dispatch(fetchList(index))
    }

    return (
        <>
            <ListToolbar onClick={(pos) => (fetch(pos))}/>
            <Loader resourceName={FETCH_LIST}/>

            <ContributionsContainer>
                <ContributionsList list={list} likeClickRefetch={fetchList(index)}/>
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


