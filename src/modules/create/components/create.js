import React from 'react'
import { Card } from '@rmwc/card'
import { Typography } from '@rmwc/typography'
import styled from 'styled-components'
import { Button } from '@rmwc/button'
import { TextField } from '@rmwc/textfield'
import { useDispatch, useSelector } from 'react-redux'

export const CreateForm = () => {

    const onClickButton = () => {
        addNewContribution()
    }

    const addNewContribution = () => dispatch(postNewContribution())

    return (
    <>
        <Container>
            <ContributionCard>
                <Container>
                    <Typography use="subtitle2" tag="h3">Title</Typography>
                    <TextField outlined></TextField>
                </Container>
                <Container>
                    <Typography use="subtitle2" tag="h3">URL</Typography>
                    <TextField outlined></TextField>
                </Container>

                <Container>
                    <Typography use="subtitle2" tag="h3">OR</Typography>
                </Container>

                <Container>
                    <Typography use="subtitle2" tag="h3">Text</Typography>
                    <TextField
                        textarea
                        outlined
                        rows={4}
                        cols={50}
                        helpText={{
                            persistent: true,
                            validationMsg: true,
                        }}
                    />
                </Container>
                <Button label='Submit' raised
                        theme={['secondaryBg', 'primary']}
                        onClick={() => onClickButton()}
                />
            </ContributionCard>
        </Container>
    </>
    )
}



const ContributionCard = styled(Card)`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom:20px;
    max-width: 1280px;
    float: none;
    margin: 0 auto;
`

const  Container = styled.div`
    padding: 1rem;
`