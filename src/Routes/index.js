import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import store from '@src/Store'
import 'antd/dist/antd.css'
import '@src/Aragorn/Styles/transition.scss'
import '@src/Aragorn/Styles/animate.min.css'

export const history = createBrowserHistory()
const App = () => (r => r.keys().map(k => r(k).default))(require.context('./', true, /^\.\/((?!\/)[\s\S])+\/_skeleton\.js$/))

export default () => <Router history={history}>
    <Provider store={store}>
        <App />
    </Provider>
</Router>;
