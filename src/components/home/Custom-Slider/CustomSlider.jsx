import styles from './CustomSlider.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

export default function CustomSlider({ Slider }) {
  
  function calculateSeconds(index) {
    const intervals = [1100, 1500, 1900];
    if (index >= 0 && index < intervals.length) {
      return intervals[index];
    } else {
      return 2000;
    }
  }

  function customPagination(index, className) {

    return `<span class="${className}" style="background: #EE972D; opacity: 1"></span>`;
  }

  const pagination = {
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index, className) {
      return customPagination(index, className);
    },
  };
  
  const customStyles = {
    padding: '50px 0',

  };

  return (

    <div>
      <div className={`${styles['slider-content']}`}>
        <Swiper
          slidesPerView={3}
          spaceBetween={23}
          loop={true}
          pagination={pagination}
          navigation={false}
          modules={[Pagination, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            650: {
              slidesPerView: 2,
              spaceBetween: 80,
            },
            950: {
              slidesPerView: 3,
              spaceBetween: 23,
            },
          }}
          style={customStyles}

        >
    
          {Slider.map((Slide, index) => (
            <SwiperSlide key={index}>
              <div  data-aos="fade-up" data-aos-duration={calculateSeconds(index)}>
                {Slide}
              </div>
              
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  );
}