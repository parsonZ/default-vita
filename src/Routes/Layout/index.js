import React from 'react'
import { hot } from 'react-hot-loader/root'
import { withRouter } from 'react-router-dom'
import '@src/Aragorn/Styles/layout.scss'
import '@src/Aragorn/Common/Logo'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';
class Layout extends React.Component {

    constructor() {
        super()
        this.state = {
            rightSide: false,
            leftSide: false,
            routes: [{
                'path': 'resume', 'name': '简历 resume'
            }, {
                'path': 'article', 'name': '文章 article'
            }, {
                'path': 'other', 'name': '其他 other'
            }, {
                'path': 'settings', 'name': '设置 settings'
            }],
            timer: null
        }

        this.toggleLeft = this.toggleLeft.bind(this)
        this.toggleRight = this.toggleRight.bind(this)
        this.toggleClose = this.toggleClose.bind(this)
        this.handleRoute = this.handleRoute.bind(this)
        this.closeAnimate = this.closeAnimate.bind(this)
    }

    toggleLeft() {
        this.setState({ leftSide: !this.state.leftSide })
    }

    toggleRight() {
        this.setState({ rightSide: !this.state.rightSide })
    }

    toggleClose() {
        this.setState({ rightSide: false, leftSide: false })
    }

    handleRoute(path) {
        this.props.history.push(path)
        this.toggleClose()
    }

    closeAnimate() {
        if (this.state.timer) {
            clearInterval(this.state.timer)
            this.setState({ timer: null })
        } else {
            this.beginTimer()
        }
    }

    beginTimer() {
        const q = document.querySelector('#q')
        const s = document.body;
        const w = (q.width = s.offsetWidth);
        const h = (q.height = s.offsetHeight);
        const ctx = q.getContext("2d");
        const p = Array(Math.floor(w / 10) + 1).fill(0);
        const random = (items) => items[Math.floor(Math.random() * items.length)];
        const hex = "0123456789ABCDEF".split("");

        const timer = setInterval(() => {
            ctx.fillStyle = "rgba(36, 39, 59, .05)";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#0f0";
            p.forEach((v, i) => {
                ctx.fillText(random(hex), i * 10, v);
                p[i] = v >= h || v > 50 + 10000 * Math.random() ? 0 : v + 10;
            });
        }, 1000 / 20);
        this.setState({ timer })
    }

    componentDidMount() {
        this.beginTimer()        
    }

    render() {
        return (
            <div className="container">
                <div className={this.state.leftSide ? 'left-side active' : 'left-side'}>
                <div className="left-side-button" onClick={this.toggleLeft}>
                    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    <svg stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                </div>
                <div className="logo">
                    <pz-logo class="logo-animate"/>
                    PARSONZ
                </div>
                <div className="side-wrapper">
                    <div className="side-title">MENU</div>
                    <div className="side-menu">
                    {
                        this.state.routes.map((v, i) => {
                            return (
                                <span onClick={() => this.handleRoute(v.path)} key={v.path}>
                                    {i === 0 ? (
                                        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                                            <path d="M9 22V12h6v10"></path>
                                        </svg>
                                    ) : null}
                                    {i === 1 ? (
                                        <svg stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                        </svg>
                                    ) : null}
                                    {i === 2 ? (
                                         <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                         </svg>
                                    ) : null}
                                    {i === 3 ? (
                                        <svg fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                                            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"></path>
                                        </svg>
                                    ) : null}
                                    {v.name}
                                </span>
                            )
                        })
                    }
                    </div>
                </div>
                </div>
                <div className="main">
                    <div className="search-bar">
                        <input type="text" placeholder="Search" />
                        <button className="right-side-button" onClick={this.toggleRight}>
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </button>
                    </div>
                    <section className="main-container">
                        <TransitionGroup>
                            <CSSTransition
                                key={this.props.location.pathname}
                                classNames={this.props.location.pathname === '/base/article' ? '' : 'router-transition'}
                                timeout={{ enter: 500, exit: this.props.location.pathname === '/base/article' ? 0 : 300 }}
                            >
                                <div>{this.props.children}</div>
                            </CSSTransition>
                        </TransitionGroup>
                    </section>
                </div>
                <div className={this.state.rightSide ? 'right-side active' : 'right-side'}>
                    <canvas id="q" />
                    <Button
                        style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                        type="primary"
                        icon={<PoweroffOutlined />}
                        onClick={this.closeAnimate}
                    />
                </div>
                <div onClick={this.toggleClose} className={this.state.rightSide || this.state.leftSide ? 'overlay active' : 'overlay'}></div>
            </div>
        )
    }
}

export default withRouter(hot(Layout))
