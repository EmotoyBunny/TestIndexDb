import React from 'react';
import {render} from 'react-dom';
import {App} from './App';
import {store} from "./redux/_store";
import {Provider} from 'react-redux';
import config from 'config';
import "./css/css-fonts/fonts-css.css"


// // setup fake backend



// only for dev
let buildMode = config.buildMode;

render(
    <Provider store={store.getStore()}>
        <App/>
    </Provider>,
    document.getElementById('app')
);

