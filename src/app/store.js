import { listsReducer, listsSaga } from '../modules/lists/duckies/index'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { crudSaga, setRequestDefaults } from '../common/utils/network/crud'
import { errorReducer } from '../common/components/snackbar-error'
import { BASE_URL_DEV } from '../common/constants/index'
import { linearLoadingReducer } from '../common/components/loader'
import { contributionSaga } from '../modules/create/duckies'
import { loginReducer, loginSaga } from '../common/auth'
import { profileSaga, userReducer } from '../modules/user/patitos'
import { persistReducer, persistStore } from 'redux-persist'
import * as localforage from 'localforage'

const appReducer = combineReducers({
    list: listsReducer,
    error: errorReducer,
    loading: linearLoadingReducer,
    user: loginReducer,
    profile: userReducer
})

const rootReducer = persistReducer({
    key: 'root',
    storage: localforage,
    whitelist: ['user']
}, (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
        setRequestDefaults({ baseURL: BASE_URL_DEV })
    }
    return appReducer(state, action)
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
export const persistor = persistStore(store)

sagaMiddleware.run(crudSaga)
sagaMiddleware.run(listsSaga)
sagaMiddleware.run(contributionSaga)
sagaMiddleware.run(loginSaga)
sagaMiddleware.run(profileSaga)

setRequestDefaults({ baseURL: BASE_URL_DEV })

export default store
