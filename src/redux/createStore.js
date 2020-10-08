import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootRedurcers from './rootReducers';


export const middlewares = [thunk ,logger];

export const store = createStore(rootRedurcers, applyMiddleware(...middlewares));




export default store;