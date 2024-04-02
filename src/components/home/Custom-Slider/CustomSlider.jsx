import styles from './CustomSlider.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

export default function CustomSlider({ Slider }) {
  const customStyles = {
    padding: '50px 0',

  };

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
              {Slide}
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  );
}