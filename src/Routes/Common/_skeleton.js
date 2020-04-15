import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default
<React.Fragment key="common">
    <Route path="/(.*)/" exact render={() => <Redirect to="/base/resume" />} />
</React.Fragment>
