import React from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'

import '../../Aragorn/Common/Sidebar' // 载入web-components

const ref = React.createRef()
class Layout extends React.Component {
    componentDidMount() {
        ref.current.shadowRoot.querySelectorAll("nav ul").forEach(el => {
            el.addEventListener('click', () => this.handleClick(el))
        })
    }

    handleClick(el) {
        this.props.history.push(el.getAttribute('data-path'))
    }

    render() {
        return (
            <>
                <pz-sidebar ref={ref}></pz-sidebar>
                {this.props.children}
            </>
        )
    }
}

export default withRouter(hot(Layout))
