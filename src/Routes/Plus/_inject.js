import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '../../Eden/Utils/handleComponents'

const Plus = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/plus"
    key="plus"
    component={
        () => <Plus />
    }
/>
