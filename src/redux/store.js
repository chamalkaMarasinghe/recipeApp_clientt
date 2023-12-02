import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import userReducer from './reducer';
const rootReducer = combineReducers({userReducer})

const persistConfig = { key : 'root', storage, version : 1 }
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:{ignoreActions : [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]},}),
})

// export default Store;
// export const Store = createStore(rootReducer, applyMiddleware(thunk))