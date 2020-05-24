import React, {useCallback, useEffect, useState} from 'react'
import {Toolbar} from '../../../common/components/toolbar'
import styled from 'styled-components'
import {Button} from '@rmwc/button'
import {TABS_TITLES} from '../constants/index'
import {useHistory} from 'react-router-dom'
import {useQuery} from '../../../index'

export const ListToolbar = ({onClick, pos = 0}) => {
    const query = useQuery()
    const [position, setPosition] = useState(Number(query.get('id')) || pos)
    const history = useHistory()

    const onClickButton = (pos) => {
        setPosition(pos)
        onClick(pos)
    }

    const submit = useCallback(() => {
        history.push(('/create'))
    }, [history])

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


