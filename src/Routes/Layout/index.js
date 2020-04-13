import React from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'
import '../../Aragorn/Common/Sidebar' // 载入web-components
import '../../Aragorn/Common/Banner'

const STYLE = {
    CONTAINER: {
        width: '980px',
        margin: '0 auto'
    },
    MENU: {
        padding: 0
    },
    BANNER: {
        background: '#FFF',
        color: '#000'
    },
    WRAPPER: {}
}

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
            <div style={STYLE.CONTAINER}>
                <menu style={STYLE.MENU}>
                    <pz-sidebar ref={ref}></pz-sidebar>
                </menu>
                <section style={STYLE.BANNER}>
                    <pz-banner></pz-banner>
                </section>
                <section style={STYLE.WRAPPER}>
                    qweqw
                </section>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(hot(Layout))
