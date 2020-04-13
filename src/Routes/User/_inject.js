import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '../../Eden/Utils/handleComponents'

const User = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/user"
    key="user"
    component={
        () => <User />
    }
/>
