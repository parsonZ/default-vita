import React from 'react'
import { Route } from 'react-router-dom'
import Base from './'

const routes = (r => r.keys().map(k => r(k).default))(require.context('../', true, /^\.\/((?!\/)[\s\S])+\/_inject\.js$/))

export default
<Route
    path="/:firstlevel"
    key="layout"
    component={
        ({ match }) => {
            let Wrapper = ({ children }) => <React.Fragment>{children}</React.Fragment>

            if (match.params.firstlevel === 'base') {
                Wrapper = Base
            }
            return <Wrapper>
                {routes}
            </Wrapper>
        }
    }
/>
