import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { FETCH_LIST, fetchSubmissions } from '../duckies/index'
import { ListToolbar } from './list-toolbar'
import { Loader } from '../../../common/components/loader'
import { ContributionsList } from './contributions-list'
import styled from 'styled-components'
import { Typography } from '@rmwc/typography'

export const Submissions = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const list = useSelector(state => state.list || [])
    const profile = useSelector(state => state.user.id === id ? state.user : state.profile || { username: '' })

    const history = useHistory()

    const navigate = index => {
        history.push(`/?id=${index}`)
    }

    const getToolbarItem = () => <ToolbarText use='button'>{profile.username} Submissions</ToolbarText>

    useEffect(() => {
        dispatch(fetchSubmissions(id))
    }, [])

    return (
        <>
            <ListToolbar onClick={(pos) => {
                if (pos < 4) {
                    navigate(pos)
                }
                else if (pos === 4) {
                    history.push(`/threads/${id}`)
                }
            }} pos={90} extraItems={getToolbarItem()}/>
            <Loader resourceName={FETCH_LIST}/>

            <ContributionsContainer>
                <ContributionsList list={list} likeClickRefetch={fetchSubmissions(id)} showBadges/>
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

const ToolbarText = styled(Typography)`
    margin-left:20px;
    margin-right: 20px
`
