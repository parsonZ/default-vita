import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '../../Eden/Utils/handleComponents'

const Home = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/home"
    key="home"
    component={
        () => <Home />
    }
/>
