import React from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'
import '../../Aragorn/Common/Sidebar' // 载入web-components
import { Grid, Row, Col } from 'react-flexbox-grid'

const STYLE = {
    CONTAINER: {
        maxWidth: '980px',
        margin: '0 auto'
    },
    MENU: {
        padding: 0
    },
    BANNER: {
        background: '#FFF',
        color: '#000',
        borderRadius: '10px',
        marginBottom: '1rem'
    }
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
            <section style={STYLE.CONTAINER}>
                <Grid fluid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <menu style={STYLE.MENU}>
                                <pz-sidebar ref={ref}></pz-sidebar>
                            </menu>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <section style={STYLE.BANNER}>
                                {this.props.children}
                            </section>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}

export default withRouter(hot(Layout))
