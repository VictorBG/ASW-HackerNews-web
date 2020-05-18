import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextField } from '@rmwc/textfield'
import { useDispatch, useSelector } from 'react-redux'
import { ListToolbar } from '../../lists/components/list-toolbar'
import { Card } from '@rmwc/card'
import '@rmwc/select/styles'
import { Select } from '@rmwc/select'
import { Button } from '@rmwc/button'
import '@rmwc/button/styles'
import { profile } from '../patitos/index'
import { useHistory, useParams } from 'react-router-dom'

export const UserProfileForm = () => {
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.user)
    const userProfile = useSelector((state) => state.profile)

    const { id } = useParams()
    const history = useHistory()

    const [aboutInput, setAboutInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [maxVisitInput, setMaxVisitInput] = useState('')
    const [minAwayInput, setMinAwayInput] = useState('')
    const [delayInput, setDelayInput] = useState('')
    const [noProcast, setNoProcast] = useState('No')
    const [showDead, setShowDead] = useState('No')

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' })
    })

    useEffect(() => {
        dispatch(profile(id))
    }, [])

    useEffect(() => {
        if (!!userProfile) {
            setAboutInput(userProfile.about)
            setEmailInput(userProfile.email)
            setMaxVisitInput(userProfile.maxVisit)
            setMinAwayInput(userProfile.minAway)
            setDelayInput(userProfile.delay)
            setNoProcast(userProfile.noprocast ? 'Yes' : 'No')
            setShowDead(userProfile.showDead ? 'Yes' : 'No')
        }
    }, [userProfile])

    // 5 is a random number to be out of range, so no tab is selected
    return (<>
            <ListToolbar onClick={(pos) => {
                if (pos !== 5) {
                    history.push(`/?id=${pos}`)
                }
            }} pos={5}/>
            {!!userProfile &&
            <FormCard>
                <Divisor>
                    <label>User: {userProfile.username}</label>
                </Divisor>
                <Divisor>
                    <label>Created At: {userProfile.createdAt}</label>
                </Divisor>
                <Divisor>
                    <label>Karmita: {userProfile.karma}</label>
                </Divisor>
                <Divisor>
                    <CorrectlyColoredTextField label="Tell people things they don't care"
                                               textarea
                                               outlined
                                               value={aboutInput}
                                               rows={4}
                                               cols={50}
                                               helpText={{
                                                   persistent: true,
                                                   validationMsg: true
                                               }}
                                               onChange={({ target: { value } }) => {
                                                   setAboutInput(value)
                                               }}
                                               theme={['onSecondary']}
                    />
                </Divisor>
                <Divisor>
                    <CorrectlyColoredTextField outlined label="Email"
                                               value={emailInput}
                                               onChange={({ target: { value } }) => {
                                                   setEmailInput(value)
                                               }}/>
                </Divisor>
                <Divisor>
                    <SmallerSelector
                        label="Showdead"
                        value={showDead}
                        enhanced
                        options={['Yes', 'No']}
                        onChange={(evt) => setShowDead(evt.currentTarget.value)}
                    />
                </Divisor>
                <Divisor>
                    <SmallerSelector
                        label="Noprocast"
                        value={noProcast}
                        enhanced
                        options={['Yes', 'No']}
                        onChange={(evt) => setNoProcast(evt.currentTarget.value)}
                    />
                </Divisor>
                <Divisor>
                    <CorrectlyColoredTextField outlined label="Max Visit"
                                               value={maxVisitInput}
                                               onChange={({ target: { value } }) => {
                                                   setMaxVisitInput(value)
                                               }}/>
                </Divisor>
                <Divisor>
                    <CorrectlyColoredTextField outlined label="Min Away"
                                               value={minAwayInput}
                                               onChange={({ target: { value } }) => {
                                                   setMinAwayInput(value)
                                               }}/>
                </Divisor>
                <Divisor>
                    <CorrectlyColoredTextField outlined label="Delay"
                                               value={delayInput}
                                               onChange={({ target: { value } }) => {
                                                   setDelayInput(value)
                                               }}/>
                </Divisor>
                <Divisor>
                    <Button label="Update Profile"
                            raised/>
                    <Button label="Logout"
                            onClick={logout}
                            danger/>
                </Divisor>
            </FormCard>
            }
        </>
    )
}

const Divisor = styled.div`
    padding: 1rem;
`

const FormCard = styled(Card)`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom:20px;
    max-width: 1280px;
    float: none;
    margin: 0 auto;
`

const CorrectlyColoredTextField = styled(TextField)`
    --mdc-theme-primary: #ff6600;
`

const FuckingSimetricTextField = styled(TextField)`
  pref-width: 180px;
  width: 180px;
`

const SmallerSelector = styled(Select)`
    max-width: 215px;
     --mdc-theme-primary: #ff6600;
`
