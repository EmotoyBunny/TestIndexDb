import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger();
import {loadingBarMiddleware} from 'react-redux-loading-bar';
import thunk from "redux-thunk";


export const store = {
    store: null,
    getStore() {
        if (this.store == null) {
            this.store = createStore(
                compose(applyMiddleware(
                    thunk,
                    loadingBarMiddleware({
                        promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
                    }),
                    thunkMiddleware,
                    loggerMiddleware,
                    ),
                ),
            );
        }

        return this.store;
    },

};