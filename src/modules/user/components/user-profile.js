import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListToolbar } from '../../lists/components/list-toolbar'
import { profile } from '../patitos/index'
import { useHistory, useParams } from 'react-router-dom'
import { updateProfile } from '../patitos'
import { Typography } from '@rmwc/typography'
import { formatTimeAgo } from '../../../common/utils/format/time'
import { Button } from '@rmwc/button'
import { TextField } from '@rmwc/textfield'
import { Select } from '@rmwc/select'
import styled from 'styled-components'
import { Card } from '@rmwc/card'

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
    }, [])

    useEffect(() => {
        dispatch(profile(id))
    }, [id])

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

    const updateForm = () => dispatch(updateProfile({
        payload: {
            about: aboutInput,
            uemail: emailInput,
            maxv: maxVisitInput,
            mina: minAwayInput,
            delay: delayInput,
            nopro: noProcast === 'Yes',
            showd: showDead === 'Yes'
        }
    }, loggedUser.id))

    const onUpdateClick = () => {
        updateForm()
    }

    const onUpVotedSubmissionsClick = () => {
        history.push(`/upvotedSubmissions`)
    }
    const onUpVotedCommentsClick = () => {
        history.push(`/upvotedComments`)
    }
    const onSubmissionsClick = () => {
        history.push(`/submissions/${id}`)
    }
    const onCommentsClick = () => {
        history.push(`/threads/${id}`)
    }

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
                    <PinkText use="headline4">{userProfile.username}</PinkText>
                </Divisor>
                <Divisor>
                    <label>Created At: {formatTimeAgo(userProfile.createdAt)}</label>
                </Divisor>
                <Divisor>
                    <label>Karmita: {userProfile.karma}</label>
                </Divisor>
                <Divisor>
                    {loggedUser.id === userProfile.id &&
                    <CustomTextField label="Tell people things they don't care"
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
                    }

                    {loggedUser.id !== userProfile.id &&
                    <Typography use="body1">
                        About: {aboutInput}
                    </Typography>
                    }

                </Divisor>
                {loggedUser.id === userProfile.id &&
                <div>

                    <Divisor>
                        <CustomTextField outlined label="Email"
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
                            onChange={(evt) => setNoProcast(
                                evt.currentTarget.value)}
                        />
                    </Divisor>
                    <Divisor>
                        <CustomTextField outlined label="Max Visit"
                                         value={maxVisitInput}
                                         onChange={({ target: { value } }) => {
                                             setMaxVisitInput(value)
                                         }}/>
                    </Divisor>
                    <Divisor>
                        <CustomTextField outlined label="Min Away"
                                         value={minAwayInput}
                                         onChange={({ target: { value } }) => {
                                             setMinAwayInput(value)
                                         }}/>
                    </Divisor>
                    <Divisor>
                        <CustomTextField outlined label="Delay"
                                         value={delayInput}
                                         onChange={({ target: { value } }) => {
                                             setDelayInput(value)
                                         }}/>
                    </Divisor>

                    <ButtonContainer>
                        <TextButton label="Upvoted submissions"
                                    onClick={() => onUpVotedSubmissionsClick()}/>
                    </ButtonContainer>
                    <ButtonContainer>
                        <TextButton label="Upvoted comments"
                                    onClick={() => onUpVotedCommentsClick()}/>
                    </ButtonContainer>

                </div>
                }
                <ButtonContainer>
                    <TextButton label="Submissions"
                                onClick={() => onSubmissionsClick()}/>
                </ButtonContainer>
                <ButtonContainer>
                    <TextButton label="Comments"
                                onClick={() => onCommentsClick()}/>
                </ButtonContainer>
                {loggedUser.id === userProfile.id &&
                <Divisor>
                    <CustomButton label="Update Profile"
                                  raised
                                  onClick={() => onUpdateClick()}/>

                    <CustomButton label="Logout"
                                  onClick={logout}
                                  outlined
                                  danger/>
                </Divisor>
                }
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

const CustomTextField = styled(TextField)`
        width: 100%;
        --mdc-theme-primary: #ff6600;
`

const CustomButton = styled(Button)`
    width: 50%;
`

const TextButton = styled(Button)`
    --mdc-theme-primary: #ff6600;
`

const SmallerSelector = styled(Select)`
        width: 100%;
        --mdc-theme-primary: #ff6600;
`
const PinkText = styled(Typography)`
        color: #FF0080
`

const ButtonContainer = styled.div`
    padding:5px;
`
