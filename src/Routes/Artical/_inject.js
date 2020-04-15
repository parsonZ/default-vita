import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '../../Eden/Utils/handleComponents'

const Article = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/article"
    key="article"
    component={
        () => <Article />
    }
/>
