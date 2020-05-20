import React, { useEffect } from 'react'
import './App.css'

import { ListScreen } from './modules/lists/components/list-base-screen'
import { SnackbarError } from './common/components/snackbar-error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { CreateForm } from './modules/create/components/create'
import {ContributionForm} from "./modules/contributionitem/components/contribution";
import { useDispatch, useSelector } from 'react-redux'
import FacebookLogin from 'react-facebook-login'
import { login } from './common/auth'
import { UserProfileForm } from './modules/user/components/user-profile'
import { setRequestDefaults } from './common/utils/network/crud'

function App () {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const responseFacebook = (response) => {
        dispatch(login(response.id, response.name))
    }

    useEffect(() => {
        if (!!user) {
            setRequestDefaults({
                headers: {
                    common: {
                        'Authorization': user.token
                    }
                }
            })
        }
    }, [user])

    return (
        <div>
            <SnackbarError/>
            {!!user &&
            <BrowserRouter>
                <Switch>
                    <Route path='/create'>
                        <CreateForm/>
                    </Route>
                    <Route path='/item/:id'>
                        <ContributionForm/>
                    </Route>
                    <Route path='/user/:id'>
                        <UserProfileForm/>
                    </Route>
                    <Route path='/'>
                        <ListScreen/>
                    </Route>
                </Switch>
            </BrowserRouter>
            }
            {!user &&
            <FacebookLogin
                appId="934240017025454"
                callback={responseFacebook}
            />
            }
        </div>
    )
}

export default App
