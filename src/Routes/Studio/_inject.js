import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '@src/Eden/Utils/handleComponents'

const Studio = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/studio"
    key="studio"
    component={() => <Studio />}
/>
