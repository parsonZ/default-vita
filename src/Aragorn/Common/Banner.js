import React from 'react';
class Banner extends React.Component {
    constructor(props) {
      super(props);
      
      this.IMAGE_PARTS = 4;
      
      this.changeTO = null;
      this.AUTOCHANGE_TIME = 4000;
      
      this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }
    
    componentWillUnmount() {
      window.clearTimeout(this.changeTO);
    }
    
    componentDidMount() {
      setTimeout(() => {
        this.setState({ activeSlide: 0, sliderReady: true });
      }, 0);
    }
    
    changeSlides(change) {
      window.clearTimeout(this.changeTO);
      const { length } = this.props.slides;
      const prevSlide = this.state.activeSlide;
      let activeSlide = prevSlide + change;
      if (activeSlide < 0) activeSlide = length - 1;
      if (activeSlide >= length) activeSlide = 0;
      this.setState({ activeSlide, prevSlide });
    }

    render() {
      const { activeSlide, prevSlide, sliderReady } = this.state;
      return (
        <div className={sliderReady ? 'slider s--ready' : 'slider'}>
          <p className="slider__top-heading">My Self</p>
          <div className="slider__slides">
            {this.props.slides.map((slide, index) => (
              <div
                className={`slider__slide ${activeSlide === index ? 's--active' : ''} ${prevSlide === index ? 's--prev' : ''}`}
                key={slide.title}
                >
                <div className="slider__slide-content">
                  <h3 className="slider__slide-subheading">{slide.title}</h3>
                  <h2 className="slider__slide-heading">
                    {slide.title.split('').map((l, i) => <span key={i}>{l}</span>)}
                  </h2>
                </div>
                <div className="slider__slide-parts">
                  {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                    <div className="slider__slide-part" key={i}>
                      <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="slider__control" onClick={() => this.changeSlides(-1)} />
          <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
        </div>
      );
    }
  }
  
export default Banner

  
