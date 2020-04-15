class BeerSlider {
    constructor(element, { start = "50", callback = null } = {}) {
      this.callback = typeof callback === 'function' ? callback : null
      this.start = parseInt(start)
        ? Math.min(100, Math.max(0, parseInt(start)))
        : 50;
      this.element = element;
      this.revealContainer = this.element.children[1];
      this.revealElement = this.revealContainer.children[0];
      this.range = this.addElement("input", {
        type: "range",
        class: `beer-range`,
        "aria-label": "Percent of revealed content",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": this.start,
        value: this.start,
        min: "0",
        max: "100"
      });
      this.handle = this.addElement("span", {
        class: `beer-handle`
      });
      this.onImagesLoad();
    }
    init() {
      this.element.classList.add(`beer-ready`);
      this.move();
      this.addListeners();
    }
    loadingImg(src) {
      return new Promise((resolve, reject) => {
        if (!src) {
          resolve();
        }
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = src;
      });
    }
    loadedBoth() {
      const mainImageSrc =
        this.element.children[0].src ||
        this.element.children[0].getAttribute(`data-beer-src`);
      const revealImageSrc =
        this.revealElement.src ||
        this.revealElement.getAttribute(`data-beer-src`);
      return Promise.all([
        this.loadingImg(mainImageSrc),
        this.loadingImg(revealImageSrc)
      ]);
    }
    onImagesLoad() {
      if (!this.revealElement) {
        return;
      }
      this.loadedBoth().then(
        () => {
          this.init();
        },
        () => {
          console.error("Some errors occurred and images are not loaded.");
        }
      );
    }
    addElement(tag, attributes) {
      const el = document.createElement(tag);
      Object.keys(attributes).forEach((key) => {
        el.setAttribute(key, attributes[key]);
      });
      this.element.appendChild(el);
      return el;
    }
    addListeners() {
      const eventTypes = ["input", "change"];
      eventTypes.forEach((i) => {
        this.range.addEventListener(i, () => {
          this.move();
        });
      });
    }
    move() {
      this.revealContainer.style.setProperty("--width", `${this.range.value}%`);
      this.handle.style.left = `${this.range.value}%`;
      this.range.setAttribute("aria-valuenow", this.range.value);
      if (this.callback) {
          this.callback()
      }
      if (this.range.value > 55) {
        this.element.classList.add("more");
      } else {
        this.element.classList.remove("more");
        if (this.range.value < 45) {
          this.element.classList.add("less");
        } else {
          this.element.classList.remove("less");
        }
      }
    }
  } 

export default class Banner extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        .beer-slider {
            display: inline-block;
            position: relative;
            overflow: hidden;
            border-radius: 5px 5px 0 0;
        }
        .beer-slider svg {
            vertical-align: bottom;
        }
        .beer-slider:before,
        .beer-slider:after {
            box-sizing: border-box
        }

        .beer-reveal {
            --width: 50%;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            clip-path: polygon(0 0, var(--width) 0, var(--width) 100%, 0 100%);
            overflow: hidden;
            z-index: 1;
            opacity: 0;
            transition: opacity 0.35s;
        }

        .beer-range {
            position: absolute;
            z-index: 2;
            bottom: 0;
            height: 5rem;
            margin: 0;
            left: -1px;
            width: calc(100% + 2px);
            cursor: pointer;
            -webkit-appearance: slider-horizontal !important;
            -moz-appearance: none;
            opacity: 0;
            -ms-touch-action: auto;
            touch-action: auto;
        }
        .beer-range:-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 300vh;
        }
        .beer-range:-moz-range-thumb {
            -webkit-appearance: none;
            height: 300vh;
        }
        .beer-range:-ms-tooltip {
            display: none;
        }

        .beer-ready image,
        .beer-ready .beer-reveal,
        .beer-ready .beer-handle {
            opacity: 1;
        }

        .beer-slider {
            width: 100%;
            height: 35vh;
        }

        .ctnr {
            height: 35vh;
        }
        
        .beer-handle {
            position: absolute;
            z-index: 2;
            pointer-events: none;
            opacity: 0;
            background: white;
            color: #000;
            transition: opacity 1s;
            transform: translateX(-50%);
            height: 5rem;
            width: 100%;
            left: 50%;
            bottom: 0;
            clip-path: url(#svgPath);
        }
        .beer-handle:before,
        .beer-handle:after {
              content: "";
              position: absolute;
              width: 10px;
              height: 10px;
              top: 50%;
              border-top: solid 2px;
              border-left: solid 2px;
              transform-origin: 0 0;
        }
        .beer-handle:before {
              left: calc(50% - 20px);
              transform: rotate(-45deg);
        }
        .beer-handle:after {
              right: calc(50% - 30px);
              transform: rotate(135deg);
        }
        h2,
        h3 {
            font-family: -webkit-pictograph;
            font-weight: 400;
        }
        h2 {
            margin: 0;
        }
        h3 {
            font-size: 2rem;
            line-height: 1;
        }
        .b {
            position: absolute;
            top: 2rem;
            width: 50%;
            max-width: 700px;
        }
        .b * {
            opacity: 0;
            transform: translate3d(0, 2rem, 0);
            transition: 1s;
        }
        .b1 {
            left: 4rem;
            z-index: 1;
            color: white;
        }
        .b2 {
            right: 4rem;
            z-index: 1;
            color: black;
        }
        .more .b1 * {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
        .less .b2 * {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }
        .ctnr:after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        .ctnr-summer:after {
            background: linear-gradient(135deg, #2a2d4e, transparent);
        }
          
        .ctnr-winter:after {
            background: linear-gradient(-135deg, white, transparent);
        }
          
        image {
            transition: 0.6s;
            opacity: 0;
        }
          
        p {
            letter-spacing: 1px;
        }

        @media (max-width: 37.5em) {
            h3 {
              font-size: 1rem;
            }
            .b1 {
              left: 2rem;
            }
            .b2 {
              right: 2rem;
            }
            .ctnr-summer:after {
              background: linear-gradient(180deg, #2a2d4e, transparent 120%);
            }
        }
          
        main {
            max-width: 48rem;
            overflow: hidden;
            position: relative;
        }
        main section#more,
        main section#less {
            padding: 1rem;
            transition: .3s;
            opacity: 0;
            left: -100%;
            position: relative;
        }
        main section#less {
            left: 100%;
        }
        main section#less{
            position: absolute;
            top: 0;
        }
        main section.active {
            opacity: 1 !important;
            left: 0 !important;
        }
        </style>
        <div id="slider" class="beer-slider" data-start="75">
            <div class="ctnr ctnr-winter">
                <svg class="winter" width="100%" height="100%" viewBox="0 0 600 361" preserveAspectRatio="xMidYMid slice" data-beer-src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/original-baltic.jpg" aria-labelledby="title1" aria-role="img">
                    <title id="title1">Baltic seashore -sepicol</title>
                    <image xlink:href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/winter.jpg" x="0" y="0" width="100%" height="100%"></image>
                </svg>
                <section class="b b2">
                    <h3>项目2</h3>
                    <p>
                        介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
                    </p>
                </section>
            </div>
            <div class="beer-reveal">
                <div class="ctnr ctnr-summer">
                    <svg width="100%" height="100%" viewBox="0 0 600 361" preserveAspectRatio="xMidYMid slice" data-beer-src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/warmsphere-baltic.jpg" aria-labelledby="title2" aria-role="img">
                        <title id="title2">Baltic seashore - warmshphere preset applied</title>
                        <image xlink:href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74321/warmsphere-baltic.jpg" x="0" y="0" width="100%" height="100%"></image>
                    </svg>
                    <section class="b b1">
                        <h3>项目1</h3>
                        <p>
                            介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍
                        </p>
                    </section>
                </div>
            </div>
        </div>
        <main>
            <section id="more" class="active">
                <h2>Welcome to the Baltic seaside1111</h2>
                <p>The Baltic Sea is a mediterranean sea of the Atlantic Ocean, enclosed by Denmark, Estonia, Finland, Latvia, Lithuania, Sweden, northeast Germany, Poland, Russia and the North and Central European Plain. The sea stretches from 53°N to 66°N latitude and from 10°E to 30°E longitude.</p>
            </section>
            <section id="less">
                <h2>Welcome to the Baltic seaside2222</h2>
                <p>The Baltic Sea is a mediterranean sea of the Atlantic Ocean, enclosed by Denmark, Estonia, Finland, Latvia, Lithuania, Sweden, northeast Germany, Poland, Russia and the North and Central European Plain. The sea stretches from 53°N to 66°N latitude and from 10°E to 30°E longitude.</p>
            </section>
        </main>
        <svg height='0'>
            <defs>
                <clipPath id="svgPath" clipPathUnits="objectBoundingBox" transform="scale(0.00083 0.0075)">
                <path d="M1397,490H204c263,0,160-32,371-33,191.52-.91,150.49-135.14,225-92C990,475,1144,490,1397,490Z" transform="translate(-178 -350.46)" />
                </clipPath>
            </defs>
        </svg>
        `
    }
    connectedCallback() {
        const slider = new BeerSlider(this.shadowRoot.getElementById("slider"), { start: 100, callback: () => {
            if (Array.from(slider.element.classList).includes('more')) {
                this.shadowRoot.querySelectorAll('main section').forEach(el => {
                    el.classList.remove('active')
                })
                this.shadowRoot.querySelector('main section#more').classList.add('active')
            }
            if (slider.range.value < 45) {
                this.shadowRoot.querySelectorAll('main section').forEach(el => {
                    el.classList.remove('active')
                })
                this.shadowRoot.querySelector('main section#less').classList.add('active')
            }
        } });
    }
}

if(!customElements.get('pz-banner')){
    customElements.define('pz-banner', Banner);
}
