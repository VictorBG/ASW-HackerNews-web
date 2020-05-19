import React from 'react'
import './App.css'

import { ListScreen } from './modules/lists/components/list-base-screen'
import { SnackbarError } from './common/components/snackbar-error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Test } from './common/components/test'
import { CreateForm } from './modules/create/components/create'
import {ContributionForm} from "./modules/contributionitem/components/contribution";

function App () {
    return (
        <div>
            <SnackbarError/>
            <BrowserRouter>
                <Switch>
                    <Route path='/create'>
                        <CreateForm/>
                    </Route>
                    <Route path='/item/:id'>
                        <ContributionForm/>
                    </Route>
                    <Route path='/'>
                        <ListScreen/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App
