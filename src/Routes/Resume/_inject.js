import React from 'react'
import { Route } from 'react-router-dom'
import { resolveComponents } from '@src/Eden/Utils/handleComponents'

const Resume = resolveComponents(() => import('./'))

export default
<Route
    path="/(.*)+/resume"
    key="resume"
    component={
        () => <Resume />
    }
/>
