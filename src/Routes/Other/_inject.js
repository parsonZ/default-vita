import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '@src/Eden/Utils/handleComponents'

const Other = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/other"
    key="other"
    component={
        () => <Other />
    }
/>
