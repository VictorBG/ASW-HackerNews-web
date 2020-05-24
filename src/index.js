import React from 'react'
import ReactDOM from 'react-dom'
import 'rmwc/dist/styles'
import './index.css'
import App from './app'
import store, { persistor } from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import { PersistGate } from 'redux-persist/integration/react'
import { useLocation } from 'react-router-dom'

export function useQuery () {
    return new URLSearchParams(useLocation().search)
}

ReactDOM.render(
    <Provider store={store}>
        <PersistGate store={store} persistor={persistor}>
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
