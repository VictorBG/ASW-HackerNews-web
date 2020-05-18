import React from 'react'
import './App.css'

import {ListScreen} from './modules/lists/components/list-base-screen'
import {SnackbarError} from './common/components/snackbar-error'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {CreateForm} from './modules/create/components/create'
import {useDispatch, useSelector} from "react-redux";
import FacebookLogin from 'react-facebook-login';
import {login} from "./common/auth";
import {UserProfileForm} from "./modules/user/components/user-profile";

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const responseFacebook = (response) => {
    console.log(response)
    dispatch(login(response.id, response.name))
  }


  return (
      <div>
        <SnackbarError/>
        {!!user &&
        <BrowserRouter>
          <Switch>
            <Route path='/create'>
              <CreateForm/>
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
            autoLoad
            callback={responseFacebook}
            render={renderProps => (
                <button onClick={renderProps.onClick}>This is my custom FB
                  button</button>
            )}
        />
        }
      </div>
  )
}

export default App
