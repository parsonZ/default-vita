import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '../../Eden/Utils/handleComponents'

const Detail = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/detail"
    key="detail"
    component={
        () => <Detail />
    }
/>
