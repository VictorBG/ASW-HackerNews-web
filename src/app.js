import React from 'react'
import './App.css'

import { ListScreen } from './modules/lists/components/list-base-screen'
import { SnackbarError } from './common/components/snackbar-error'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Test } from './common/components/test'

function App () {
    return (
        <div>
            <SnackbarError/>
            <BrowserRouter>
                <Switch>
                    <Route path='/create'>
                        <Test/>
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
