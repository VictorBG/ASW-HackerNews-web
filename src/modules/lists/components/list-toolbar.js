import React, { useCallback, useState } from 'react'
import { Toolbar } from '../../../common/components/toolbar'
import styled from 'styled-components'
import { Button } from '@rmwc/button'
import { TABS_TITLES } from '../constants/index'
import { useHistory } from 'react-router-dom'

export const ListToolbar = ({ onClick }) => {
    const [position, setPosition] = useState(0)
    const history = useHistory()

    const onClickButton = (pos) => {
        setPosition(pos)
        onClick(pos)
    }

    const submit = useCallback(() => {
        history.push(('/create'))
    }, [])

    return (
        <>
            <Toolbar>
                <CenteredContainer>
                    {TABS_TITLES.map((t, i) =>
                        <Button label={t}
                                theme={i === position ? 'onPrimary' : 'textSecondaryOnDark'}
                                onClick={() => onClickButton(i)}/>)}
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


