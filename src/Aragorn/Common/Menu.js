export default class Menu extends HTMLElement {
    
    static get observedAttributes() { return ['routes'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        const Style = `
            <style>
                .menu {
                    background: #5e5e5f;
                    height: 100vh;
                    width: 240px;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 5;
                    outline: none;
                    color: #FFF;
                }
                .menu .avatar {
                    background: rgba(0, 0, 0, 0.1);
                    padding: 2em 0.5em;
                    text-align: center;
                }
                .menu .avatar .mark {
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    left: 50%;
                    padding: 1.2em;
                    transform: translateX(-50%);
                }
                .menu .avatar .mark:before {
                    content: ' ';
                    display: table;
                    width: 100px;
                    height: 100px;
                    background: rgba(0, 0, 0, 0.46);
                    position: absolute;
                    left: 50%;
                    top: -100%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    transition: .5s;
                }
                
                .menu .avatar .mark:hover:before {
                    top: 50%;
                }
                .menu .avatar .mark .mark-title {
                    display: flex;
                    justify-content: center;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .menu .avatar .mark .mark-title span {
                    display: block;
                    position: absolute;
                    top: 100%;
                    transition: .3s;
                    white-space: nowrap;
                }
                .menu .avatar .mark:hover span.cname {
                    top: 20%;
                    transition-delay: 0s;
                }
                .menu .avatar .mark:hover span.line {
                    top: 40%;
                    transition-delay: .2s;
                }
                .menu .avatar .mark:hover span.ename {
                    top: 60%;
                    transition-delay: .4s;
                }
                .menu .avatar img {
                    width: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid #FFF;
                    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
                }
                .menu .avatar h2 {
                    font-weight: normal;
                    margin-bottom: 0;
                }
                .menu ul {
                    list-style: none;
                    padding: 0.5em 0;
                    margin: 0;
                }
                .menu ul li {
                    padding: 0.5em 1em 0.5em 4em;
                    font-size: 1.2em;
                    font-weight: bold;
                    background-repeat: no-repeat;
                    background-position: left 15px center;
                    background-size: auto 20px;
                    transition: all 0.15s linear;
                    cursor: pointer;
                }
                .menu ul li.icon-dashboard {
                    background-image: url("http://www.entypo.com/images//gauge.svg");
                }
                .menu ul li.icon-customers {
                    background-image: url("http://www.entypo.com/images//briefcase.svg");
                }
                .menu ul li.icon-users {
                    background-image: url("http://www.entypo.com/images//users.svg");
                }
                .menu ul li.icon-settings {
                    background-image: url("http://www.entypo.com/images//tools.svg");
                }
                .menu ul li:hover {
                    background-color: rgba(0, 0, 0, 0.1);
                }
                .menu ul li:focus {
                    outline: none;
                }
                @media screen and (max-width: 980px) and (min-width: 768px) {
                    body {
                        padding-left: 90px;
                    }
                    .menu {
                        width: 90px;
                    }
                    .menu .avatar {
                        padding: 0.5em;
                        position: relative;
                    }
                    .menu .avatar img {
                        width: 60px;
                    }
                    .menu .avatar h2 {
                        opacity: 0;
                        position: absolute;
                        display: none;
                        top: 50%;
                        left: 100px;
                        margin: 0;
                        min-width: 200px;
                        border-radius: 4px;
                        background: rgba(0, 0, 0, 0.4);
                        transform: translate3d(-20px, -50%, 0);
                        transition: all 0.15s ease-in-out;
                    }
                    .menu .avatar:hover h2 {
                        opacity: 1;
                        transform: translate3d(0px, -50%, 0);
                    }
                    .menu ul li {
                        height: 60px;
                        background-position: center center;
                        background-size: 30px auto;
                        position: relative;
                    }
                    .menu ul li span {
                        opacity: 0;
                        position: absolute;
                        background: rgba(0, 0, 0, 0.8);
                        padding: 0.2em 0.5em;
                        border-radius: 4px;
                        top: 50%;
                        left: 95px;
                        white-space: nowrap;
                        transform: translate3d(-15px, -50%, 0);
                        transition: all 0.15s ease-in-out;
                    }
                    .menu ul li span:before {
                        content: '';
                        width: 0;
                        height: 0;
                        position: absolute;
                        top: 50%;
                        left: -5px;
                        border-top: 5px solid transparent;
                        border-bottom: 5px solid transparent;
                        border-right: 5px solid rgba(0, 0, 0, 0.5);
                        transform: translateY(-50%);
                    }
                    .menu ul li:hover span {
                        opacity: 1;
                        transform: translate3d(0px, -50%, 0);
                    }
                }
                @media screen and (max-width: 768px) {
                    body {
                        padding-left: 0;
                    }
                    .menu {
                        width: 230px;
                        box-shadow: 0 0 0 100em rgba(0, 0, 0, 0);
                        transform: translate3d(-230px, 0, 0);
                        transition: all 0.3s ease-in-out;
                    }
                    .menu .smartphone-menu-trigger {
                        width: 40px;
                        height: 40px;
                        position: absolute;
                        left: 100%;
                        background: #5e5e5f;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .menu .smartphone-menu-trigger span {
                        height: 4px;
                        position: absolute;
                        width: 25px;
                        background: #fff;
                        border-radius: 5px;
                        transition: .3s;
                    }
                    .menu .smartphone-menu-trigger span.hamb-top {
                        transform: translateY(-8px)
                    }
                    .menu .smartphone-menu-trigger span.hamb-bottom {
                        transform: translateY(8px)
                    }
                    .menu ul li {
                        padding: 1em 1em 1em 4em;
                        font-size: 1em;
                    }
                    .menu:focus {
                        transform: translate3d(0, 0, 0);
                        box-shadow: 0 0 0 100em rgba(0, 0, 0, 0.6);
                    }
                    .menu:focus .smartphone-menu-trigger span.hamb-top {
                        transform: rotate(-45deg) translate(0, -7px);
                        width: 12px;
                    }
                    .menu:focus .smartphone-menu-trigger span.hamb-bottom {
                        transform: rotate(45deg) translate(0, 7px);
                        width: 12px;
                    }
                    .menu:focus .smartphone-menu-trigger span.hamb-middle {
                        
                    }
                    .menu:focus .smartphone-menu-trigger {
                        pointer-events: none;
                    }
                }
            </style>
        `;
        const Html = `
            <nav class="menu" tabindex="0">
                <div class="smartphone-menu-trigger">
                    <span class="hamb-top"></span>
                    <span class="hamb-middle"></span>
                    <span class="hamb-bottom"></span>
                </div>
                <header class="avatar">
                    <div class="mark">
                        <img src="${process.env.REACT_APP_URL}/static/avator.jpg" />
                        <div class="mark-title">
                            <span class="cname">庞宗</span>
                            <span class="line">-----------------</span>
                            <span class="ename">zong pang</span>
                        </div>
                    </div>
                    <h2>一句话介绍你自己</h2>
                </header>
                <ul id="ul">
                </ul>
            </nav>
        `
        shadowRoot.innerHTML = `${Style}${Html}`
    }

    get elemHeihgt() {
        return this.shadowRoot.querySelector('.smartphone-menu-trigger').offsetHeight
    }

    get routes() {
        return JSON.parse(this.getAttribute('routes'))
    }

    dragTrigger(cllopse) {
        let cur = { x:0, y:0 }
        let ny, dy, y;
        let flag = false;
        const down = (e) => {
            flag = true;
            let touch = e.touches ? e.touches[0] : e
            cur.y = touch.clientY;
            dy = cllopse.offsetTop;
        }
        const move = (e) => {
            if (flag) {
                let touch = e.touches ? e.touches[0] : e
                ny = touch.clientY - cur.y;
                y = dy + ny;
                if (y <= 0) {
                    y = 0
                }
                if (y >= window.screen.height - this.elemHeihgt) {
                    y = window.screen.height - this.elemHeihgt
                }
                cllopse.style.top = y +'px';
            }
            e.preventDefault()
        }
        const end = () => flag = false
        cllopse.addEventListener('mousedown', e => down(e));
        cllopse.addEventListener('touchstart', e => down(e))
        cllopse.addEventListener('mousemove', e => move(e));
        cllopse.addEventListener('touchmove', e => move(e))
        document.body.addEventListener('mouseup', e => end(e));
        cllopse.addEventListener('touchend', e => end(e));
    }

    updateHtml() {
        let template = ''

        this.routes.forEach(v => {
            template += `<li tabindex="0" data-path="${v.path}" class="icon-${v.icon}"><span>${v.label}</span></li>`
        })
        this.shadowRoot.querySelector('#ul').innerHTML = template
    }

    connectedCallback() {
        this.updateHtml()
        this.dragTrigger(this.shadowRoot.querySelector('.smartphone-menu-trigger'))
    }
}

if(!customElements.get('pz-menu')){
    customElements.define('pz-menu', Menu);
}
