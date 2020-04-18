import React from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'
import '@src/Aragorn/Common/Menu'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const STYLE = {
    WRAP: {
        margin: '10px',
        borderRadius: '5px'
    }
}

const ref = React.createRef()
class Layout extends React.Component {

    componentDidMount() {
        ref.current.shadowRoot.querySelectorAll("nav ul li").forEach(el => {
            el.addEventListener('click', () => this.handleClick(el))
        })
    }

    handleClick(el) {
        this.props.history.push(el.getAttribute('data-path'))
    }

    render() {
        return (
            <>
                <section>
                    <pz-menu
                        ref={ref}
                        routes='[{
                            "path": "resume", "label": "简历 resume", "icon": "dashboard"
                        }, {
                            "path": "article", "label": "文章 article", "icon": "customers"
                        }, {
                            "path": "other", "label": "其他 other", "icon": "users"
                        }, {
                            "path": "settings", "label": "设置 settings", "icon": "settings"
                        }]'
                    >
                    </pz-menu>
                </section>
                <section style={STYLE.WRAP}>
                    <TransitionGroup>
                        <CSSTransition
                            key={this.props.location.pathname}
                            classNames='router-transition'
                            timeout={{ enter: 500, exit: 300 }}
                        >
                            <div>{this.props.children}</div>
                        </CSSTransition>
                    </TransitionGroup>
                </section>
            </>
        )
    }
}

export default withRouter(hot(Layout))
