import React, {useState} from 'react'
import {Card} from '@rmwc/card'
import {Typography} from '@rmwc/typography'
import styled from 'styled-components'
import {Button} from '@rmwc/button'
import {TextField} from '@rmwc/textfield'
import {useDispatch} from 'react-redux'
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
            <Container>
                <FormCard>
                    <Container>
                        <Typography use="subtitle2" tag="h3">Title</Typography>
                        <TextField outlined label="Title" onChange={({target: {name, value}}) => {
                            setTitleInput(value)
                        }}/>
                    </Container>
                    <Container>
                        <Typography use="subtitle2" tag="h3">URL</Typography>
                        <TextField outlined label="URL" onChange={({target: {name, value}}) => {
                            setURLInput(value)
                        }}></TextField>
                    </Container>

                    <Container>
                        <Typography use="subtitle2" tag="h3">OR</Typography>
                    </Container>

                    <Container>
                        <Typography use="subtitle2" tag="h3">Text</Typography>
                        <TextField label="Your text"
                                   textarea
                                   outlined
                                   rows={4}
                                   cols={50}
                                   helpText={{
                                       persistent: true,
                                       validationMsg: true,
                                   }}
                                   onChange={({target: {name, value}}) => {
                                       setTextInput(value)
                                   }}
                        />
                    </Container>
                    <Button label='Submit' raised
                            theme={['secondaryBg', 'primary']}
                            onClick={() => onClickButton()}
                    />
                </FormCard>
            </Container>
        </>
    )
}


const FormCard = styled(Card)`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom:20px;
    max-width: 1280px;
    float: none;
    margin: 0 auto;
`

const Container = styled.div`
    padding: 1rem;
`