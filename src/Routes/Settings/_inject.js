import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '@src/Eden/Utils/handleComponents'

const Settings = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/settings"
    key="settings"
    component={
        () => <Settings />
    }
/>
