import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import 'antd/dist/antd.css'
import '@src/Aragorn/Styles/override.scss'

const history = createBrowserHistory()
const App = () => (r => r.keys().map(k => r(k).default))(require.context('./', true, /^\.\/((?!\/)[\s\S])+\/_skeleton\.js$/))

export default () => <Router history={history}>
    <App />
</Router>;
