import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Sdata } from "../data/list";
import image from '/images/SlidersCards/slide-2.png'

const SliderCards = () => {
  const settings = {
    dots: false,
    fade: true,
    arrows: false,
    adaptiveHeight: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 1800,
    autoplay: true,
    appendDots: (dots) => {
      return <ul style={{margin: "0px"}}>{dots}</ul>
    }
  };
  return (
    <div className="sliders-wraper">
      {" "}
      <Slider {...settings}>
        {Sdata.map((value, index) => {
          return (
            <div  key={index}>                       
              <img className="slide-img" src={value.cover} alt="sliderImg" />
              <div >            
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderCards;
