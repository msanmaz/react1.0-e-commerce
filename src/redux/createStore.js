import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddle from 'redux-saga'
import thunk from 'redux-thunk';
import rootSaga from './rootSaga';

import rootRedurcers from './rootReducers';


const sagaMiddleware = createSagaMiddle()
export const middlewares = [thunk,sagaMiddleware,logger];

export const store = createStore(rootRedurcers, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga)


export default store;