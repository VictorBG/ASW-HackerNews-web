import React, { useCallback, useEffect, useState } from 'react'
import { Toolbar } from '../../../common/components/toolbar'
import styled from 'styled-components'
import { Button } from '@rmwc/button'
import { TABS_TITLES } from '../constants/index'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../../../index'
import { useSelector } from 'react-redux'

export const ListToolbar = ({ onClick, pos = 0 }) => {
    const query = useQuery()
    const [position, setPosition] = useState(Number(query.get('id')) || pos)
    const history = useHistory()

    const { id } = useSelector(state => state.user)

    const onClickButton = (pos) => {
        setPosition(pos)
        onClick(pos)
    }

    const submit = useCallback(() => {
        history.push('/create')
    }, [history])

    const threadsClick = useCallback(() => {
        history.push(`/threads/${id}`)
    })

    useEffect(() => {
        onClick(position)
    }, [])

    return (
        <>
            <Toolbar>
                <CenteredContainer>
                    {TABS_TITLES.map((t, i) =>
                        <Button label={t}
                                theme={i === position ? 'onPrimary' : 'textSecondaryOnDark'}
                                onClick={() => onClickButton(i)}
                                key={i}/>)}
                    <Button label='Threads'
                            theme={4 === position ? 'onPrimary' : 'textSecondaryOnDark'}
                            onClick={threadsClick}/>
                    <Button label='Submit' raised
                            theme={['secondaryBg', 'primary']}
                            onClick={submit}/>
                </CenteredContainer>
            </Toolbar>
        </>
    )
}

const CenteredContainer = styled.div`
    float: none;
    margin: 0 auto;
`


