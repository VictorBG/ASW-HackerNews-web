import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { FETCH_LIST, fetchThreads } from '../duckies/index'
import { ListToolbar } from './list-toolbar'
import { Loader } from '../../../common/components/loader'
import { ContributionsList } from './contributions-list'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

export const Threads = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const list = useSelector(state => state.list || [])

    const history = useHistory()

    const navigate = index => {
        history.push(`/?id=${index}`)
    }

    useEffect(() => {
        dispatch(fetchThreads(id))
    }, [])

    return (
        <>
            <ListToolbar onClick={(pos) => {
                if (pos !== 4) {
                    navigate(pos)
                }
            }} pos={4}/>
            <Loader resourceName={FETCH_LIST}/>

            <ContributionsContainer>
                <ContributionsList list={list.map(item => Object.assign({}, item, { title: item.content }))}
                                   likeClickRefetch={fetchThreads(id)} showBadges={false}/>
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

