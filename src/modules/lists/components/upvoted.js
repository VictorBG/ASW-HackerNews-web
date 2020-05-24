import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { FETCH_LIST, fetchList } from '../duckies/index'
import { ListToolbar } from './list-toolbar'
import { Loader } from '../../../common/components/loader'
import { ContributionsList } from './contributions-list'
import styled from 'styled-components'
import { Typography } from '@rmwc/typography'

export const Upvoted = ({ index }) => {
    const dispatch = useDispatch()
    const list = useSelector(state => state.list || [])
    const { id } = useSelector(state => state.user)

    const history = useHistory()

    const navigate = index => {
        history.push(`/?id=${index}`)
    }

    const getToolbarItem = () =>
        <ToolbarText use='body1'>Upvoted {index === 5 ? 'Submissions' : 'Comments'}</ToolbarText>

    useEffect(() => {
        dispatch(fetchList(index))
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
            }} pos={index} extraItems={getToolbarItem()}/>
            <Loader resourceName={FETCH_LIST}/>

            <ContributionsContainer>
                <ContributionsList list={list.map(item => Object.assign({}, item, { title: item.content }))}
                                   likeClickRefetch={fetchList(index)} showBadges={index === 5}/>
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

