import React, {useState} from 'react'
import {Card} from '@rmwc/card'
import {Typography} from '@rmwc/typography'
import styled from 'styled-components'
import {Button} from '@rmwc/button'
import {TextField} from '@rmwc/textfield'
import {useDispatch, useSelector} from 'react-redux'
import {postNewContribution} from "../duckies";
import {Toolbar} from "../../../common/components/toolbar";

export const CreateForm = () => {

    // Para obtener el valor introducido en los campos de texto.
    const [titleInput, setTitleInput] = useState('')
    const [urlInput, setURLInput] = useState('')
    const [textInput, setTextInput] = useState('')

    const dispatch = useDispatch()

    const onClickButton = () => {
        addNewContribution()
    }

    // Payload es el "json" que se enviara en el POST
    const addNewContribution = () => dispatch(postNewContribution({
        payload: {
            title: titleInput,
            url: urlInput,
            text: textInput
        }
    }))

    return (
        <>
            <Toolbar></Toolbar>
            <CenteredContainer>
                <FormCard>
                    <CenteredContainer>
                        <StyledTextField outlined label="Title" onChange={({target: {name, value}}) => {
                            setTitleInput(value)
                        }}>
                        </StyledTextField>
                    </CenteredContainer>
                    <CenteredContainer>
                        <StyledTextField outlined label="URL" onChange={({target: {name, value}}) => {
                            setURLInput(value)
                        }}>
                        </StyledTextField>
                    </CenteredContainer>

                    <CenteredContainer>
                        <Typography use="subtitle2" tag="h3">OR</Typography>
                    </CenteredContainer>

                    <CenteredContainer>
                        <TextField label="Your text"
                                   textarea
                                   outlined
                                   rows={4}
                                   cols={80}
                                   helpText={{
                                       persistent: true,
                                       validationMsg: true,
                                   }}
                                   onChange={({target: {name, value}}) => {
                                       setTextInput(value)
                                   }}
                        />
                    </CenteredContainer>
                    <StyledButton label='Submit' raised
                            theme={['secondaryBg', 'primary']}
                            onClick={() => onClickButton()}
                    />
                </FormCard>
            </CenteredContainer>
        </>
    )
}


const FormCard = styled(Card)`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom:20px;
    max-width: 1000px;
    float: none;
    margin: 0 auto;
`

const CenteredContainer = styled.div`
    padding: 1rem;
    margin: auto;
`

const StyledTextField = styled(TextField)`
    width: 50rem;
`
const StyledButton = styled(Button)`
    width: 70%;
    margin: auto;
`