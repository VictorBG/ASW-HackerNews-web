import React, {useState} from 'react'
import {Typography} from '@rmwc/typography'
import styled from 'styled-components'
import {TextField} from '@rmwc/textfield'
import {useSelector} from "react-redux";
import {ListToolbar} from "../../lists/components/list-toolbar";
import {Card} from "@rmwc/card";
import '@rmwc/select/styles';
import {Select} from "@rmwc/select";
import {Button} from "@rmwc/button"
import '@rmwc/button/styles';

export const UserProfileForm = () => {
  const user = useSelector((state) => state.user)

  const [aboutInput, setAboutInput] = useState(user.about)
  const [emailInput, setEmailInput] = useState('')
  const [maxVisitInput, setMaxVisitInput] = useState('')
  const [minAwayInput, setMinAwayInput] = useState('')
  const [delayInput, setDelayInput] = useState('')



  return (<>
        <ListToolbar></ListToolbar>
        <FormCard>
          <Divisor>
            <label>User: {user.username}</label>
          </Divisor>
          <Divisor>
            <label>Created At: {user.createdAt}</label>
          </Divisor>
          <Divisor>
            <label>Karmita: {user.karma}</label>
          </Divisor>
          <Divisor>
            <TextField label="Tell people things they don't care"
                       textarea
                       outlined
                       rows={4}
                       cols={50}
                       helpText={{
                         persistent: true,
                         validationMsg: true,
                       }}
                       onChange={({target: {value}}) => {
                         setAboutInput(value)
                       }}
            />
          </Divisor>
          <Divisor>
            <TextField outlined label="Email"
                       onChange={({target: {value}}) => {
                         setEmailInput(value)
                       }}></TextField>
          </Divisor>
          <Divisor>
            <SmallerSelector
                label="Showdead"
                enhanced
                options={['Yes', 'No']}
            />
          </Divisor>
          <Divisor>
            <SmallerSelector
                label="Noprocast"
                enhanced
                options={['Yes', 'No']}
            />
          </Divisor>
          <Divisor>
            <TextField outlined label="Max Visit"
                       onChange={({target: {value}}) => {
                         setMaxVisitInput(value)
                       }}></TextField>
          </Divisor>
          <Divisor>
            <TextField outlined label="Min Away"
                       onChange={({target: {value}}) => {
                         setMinAwayInput(value)
                       }}></TextField>
          </Divisor>
          <Divisor>
            <TextField outlined label="Delay"
                       onChange={({target: {value}}) => {
                         setDelayInput(value)
                       }}></TextField>
          </Divisor>
          <Divisor>
            <Button label = "Update Profile"
            raised/>
          </Divisor>
        </FormCard>
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

const FuckingSimetricTextField = styled(TextField) `
  pref-width: 180px;
  width: 180px;
`

const SmallerSelector = styled(Select)`
    max-width: 215px;
`