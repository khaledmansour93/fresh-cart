import sliderImage1 from "../../assets/imgs/slider-image-1.jpeg";
import sliderImage2 from "../../assets/imgs/slider-image-2.jpeg";
import sliderImage3 from "../../assets/imgs/slider-image-3.jpeg";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function HomeSlider() {
  return (
    <>
      <section className="grid grid-cols-12 mb-8">
        <div className="col-span-8">
          <Swiper slidesPerView={1} loop={true} className="h-full">
            <SwiperSlide className="h-full">
              <img
                className="w-full h-full object-cover"
                src={sliderImage3}
                alt="slider-image-3"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src={sliderImage3}
                alt="slider-image-3"
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full h-full object-cover"
                src={sliderImage3}
                alt="slider-image-3"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          <img className="w-full" src={sliderImage1} alt="slider-image-1" />
          <img className="w-full" src={sliderImage2} alt="slider-image-2" />
        </div>
      </section>
    </>
  );
}
