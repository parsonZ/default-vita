export default class Logo extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            .house-wrapper {
                transform: scale(0.1);
                width: 100px;
                height: 68px;
            }
            
            .house-logo {
                border-radius: 50%;
                border: 30px solid #000;
                width: 320px;
                height: 320px;
                background: #fff;
                position: absolute;
                display: inline-block;
                -webkit-transform: translate(-50%, -50%);
                        transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
            }
            .house-logo:before {
                content: '';
                position: absolute;
                top: -40px;
                left: 50%;
                -webkit-transform: translateX(-50%);
                        transform: translateX(-50%);
                width: 20px;
                height: calc(100% + 80px);
                background: #fff;
            }
            .house-logo:after {
                content: '';
                position: absolute;
                top: 50%;
                left: -40px;
                -webkit-transform: translateY(-50%);
                        transform: translateY(-50%);
                width: calc(100% + 80px);
                height: 20px;
                background: #fff;
                z-index: 0;
            }
            .house-logo:before, .house-logo:after {
                -webkit-transition: -webkit-transform .5s;
                transition: -webkit-transform .5s;
                transition: transform .5s;
                transition: transform .5s, -webkit-transform .5s;
            }
            .house-logo.animate:before, .house-logo.animate:after {
                -webkit-animation: circle-rotate 2.5s linear infinite;
                        animation: circle-rotate 2.5s linear infinite;
            }
            
            .wrapper {
                position: relative;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-49%, -60%);
                        transform: translate(-49%, -60%);
                z-index: 10;
                text-align: center;
            }
            
            .inner {
                -webkit-animation: h-rotate 2s linear infinite;
                        animation: h-rotate 2s linear infinite;
            }
            
            .part {
                display: inline-block;
                vertical-align: top;
                background: #000;
                margin-left: -5px;
                position: relative;
            }
            .part.vertical-line {
                width: 25px;
                height: 10px;
                margin-top: 43px;
            }
            .part.square {
                width: 7px;
                height: 7px;
                position: absolute;
                top: 0;
            }
            .part.square:after {
                content: '';
                width: inherit;
                height: inherit;
                position: absolute;
                top: 0;
                left: 0;
                background: #fff;
                z-index: 2;
            }
            .part.square.square-1 {
                top: -7px;
                right: 0;
            }
            .part.square.square-1:after {
                border-radius: 0 0 6px 0;
            }
            .part.square.square-2 {
                top: 10px;
                right: 0;
            }
            .part.square.square-2:after {
                border-radius: 0 6px 0 0;
            }
            .part.square.square-3 {
                top: 10px;
                left: 6px;
            }
            .part.square.square-3:after {
                width: 15px;
                height: 15px;
                border-radius: 50% 0 0 0;
            }
            .part.square.square-4 {
                top: 10px;
                right: 0;
            }
            .part.square.square-4:after {
                left: auto;
                right: 0;
                width: 15px;
                height: 15px;
                border-radius: 0 50% 0 0;
            }
            .part.square.square-5 {
                top: -7px;
                left: 6px;
            }
            .part.square.square-5:after {
                border-radius: 0 0 0 6px;
            }
            .part.square.square-6 {
                top: 10px;
                left: 6px;
            }
            .part.square.square-6:after {
                border-radius: 6px 0 0 0;
            }
            .part.left-part, .part.right-part {
                margin-top: 43px;
            }
            .part.left-part {
                height: 107px;
                width: 42px;
                -webkit-transform: skew(-25deg) translateX(-17px);
                        transform: skew(-25deg) translateX(-17px);
                border-radius: 7px 0 7px 6px;
            }
            .part.center-part {
                border-radius: 5px;
                height: 150px;
                width: 42px;
            }
            .part.right-part {
                height: 107px;
                width: 42px;
                -webkit-transform: skew(25deg) translateX(17px);
                        transform: skew(25deg) translateX(17px);
                border-radius: 0 7px 6px 7px;
            }
            
            @-webkit-keyframes circle-rotate {
                from {
                -webkit-transform: rotate(0);
                        transform: rotate(0);
                }
                to {
                -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                }
            }
            
            @keyframes circle-rotate {
                from {
                -webkit-transform: rotate(0);
                        transform: rotate(0);
                }
                to {
                -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                }
            }
            @-webkit-keyframes h-rotate {
                from {
                -webkit-transform: rotateY(0);
                        transform: rotateY(0);
                }
                to {
                -webkit-transform: rotateY(360deg);
                        transform: rotateY(360deg);
                }
            }
            @keyframes h-rotate {
                from {
                -webkit-transform: rotateY(0);
                        transform: rotateY(0);
                }
                to {
                -webkit-transform: rotateY(360deg);
                        transform: rotateY(360deg);
                }
            }
        </style>
        <div class="house-wrapper">
            <div class="house-logo animate">
            <div class="wrapper">
                <div class="inner">
                <div class="part left-part"></div>
                <div class="part vertical-line">
                    <div class="part square square-1"></div>
                    <div class="part square square-2"></div>
                    <div class="part square square-3"></div>
                </div>
                <div class="part center-part"></div>
                <div class="part vertical-line">
                    <div class="part square square-4"></div>
                    <div class="part square square-5"></div>
                    <div class="part square square-6"></div>
                </div>
                <div class="part right-part"></div>
                </div>
            </div>
            </div></div>
        `
    }
}

if(!customElements.get('pz-logo')){
    customElements.define('pz-logo', Logo);
}
