import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger;'

import rootRedurcers from './rootReducers';


export const middlewares = [logger];

export const store = createStore(rootRedurcers, applyMiddleware(...middlewares));




export default store;