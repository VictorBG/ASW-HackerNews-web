import React, { useCallback, useEffect, useState } from 'react'
import { TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection } from '@rmwc/top-app-bar'
import { TABS_TITLES } from '../constants/index'
import { Button } from '@rmwc/button'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_LIST, fetchList } from '../duckies/index'
import { ContributionsList } from './contributions-list'
import styled from 'styled-components'
import { Loader } from '../../../common/components/loader'
import { useHistory } from 'react-router-dom'

export const ListScreen = () => {
    const [position, setPosition] = useState(0)
    const dispatch = useDispatch()
    const list = useSelector(state => state.list || [])
    const history = useHistory()

    useEffect(() => {
        fetch(position)
    }, [])

    const onClickButton = (pos) => {
        setPosition(pos)
        fetch(pos)
    }

    const fetch = index => dispatch(fetchList(index))

    const submit = useCallback(() => {
        history.push(('/create'))
    }, [])

    return (
        <>
            <TopAppBar fixed>
                <TopAppBarRow>
                    <TopAppBarSectionFull>
                        <CenteredContainer>
                            {TABS_TITLES.map((t, i) =>
                                <Button label={t}
                                        theme={i === position ? 'onPrimary' : 'textSecondaryOnDark'}
                                        onClick={() => onClickButton(i)}/>)}
                            <Button label='Submit' raised
                                    theme={['secondaryBg', 'primary']}
                                    onClick={submit}/>
                        </CenteredContainer>
                    </TopAppBarSectionFull>
                    <TopAppBarSection alignEnd>
                        <StyledUsernameText label='(123) VictorBG' theme={['onSecondary']}/>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust/>
            <Loader resourceName={FETCH_LIST}/>

            <ContributionsContainer>
                <ContributionsList list={list}/>
            </ContributionsContainer>
        </>
    )
}
const TopAppBarSectionFull = styled(TopAppBarSection)`
    width: 100vw;
`

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

const StyledUsernameText = styled(Button)`
    --mdc-typography-button-text-transform: none; 
    white-space: nowrap;
`

