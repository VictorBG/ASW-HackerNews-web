import { listsReducer, listsSaga } from '../modules/lists/duckies/index'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { crudSaga, setRequestDefaults } from '../common/utils/network/crud'
import { errorReducer } from '../common/components/snackbar-error'
import { BASE_URL_DEV, BASE_URL_PROD } from '../common/constants/index'
import { linearLoadingReducer } from '../common/components/loader'
import { contributionSaga } from '../modules/create/duckies'
import {loginReducer, loginSaga} from "../common/auth";
import {profileSaga, userReducer} from "../modules/user/patitos";

const rootReducer = combineReducers({
    list: listsReducer,
    error: errorReducer,
    loading: linearLoadingReducer,
    user : loginReducer,
    profile: userReducer
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(crudSaga)
sagaMiddleware.run(listsSaga)
sagaMiddleware.run(contributionSaga)
sagaMiddleware.run(loginSaga)
sagaMiddleware.run(profileSaga)

// TODO: move header to when the login has been performed
setRequestDefaults({
    baseURL: BASE_URL_DEV ,
    headers: {
        common: {
            'Authorization': 'eyJhbGciOiJIUzM4NCJ9.eyJpc3MiOiJqZWlrZXJuaXVzIiwiaWF0IjoxNTg5MDE0MjAxLCJzdWIiOiIxMTUyMTU0NzQxNzkzNDM3IiwianRpIjoiZGZjNDJlM2MtMGY1Ny00NTBhLTk4ZGUtNGE3YmJkNWIxMzc2In0.luTO2b3MPXtl72PtfYchB33Ux-S1mxy6IqSMxehubEF9ZmAubZRisHtahende1nu'
        }
    }
})

export default store
