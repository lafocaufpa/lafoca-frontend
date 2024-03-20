import Foto from '@images/team/taylor.jpeg';
import styles from './TeamSlider.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import CardSlider from './CardSlider/CardSlider';

export default function TeamSlider() {

  const customStyles = {
    padding: '40px 0',

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

  const profile = {
    nome: 'Taylor',
    cargo: 'Designer',
    foto: Foto
  };

  return (
    
    <div>
      <div className={`${styles['slider-content']}`}>
        <Swiper
          slidesPerView={3}
          spaceBetween={25} 
          loop={true}
          pagination={pagination}
          navigation={false} 
          modules={[Pagination, Navigation]} 
          breakpoints={{
            0: {
              slidesPerView: 1,
            // spaceBetween: 20,
            },
            650: {
              slidesPerView: 2,
              // spaceBetween: 40,
            },
            950: {
              slidesPerView: 3,
            // spaceBetween: 50,
            },
          }} 
          style={customStyles}

        >  
          <SwiperSlide>
            <CardSlider profile={profile}/>
          </SwiperSlide>
          <SwiperSlide><CardSlider profile={profile}/></SwiperSlide>
          <SwiperSlide><CardSlider profile={profile}/></SwiperSlide>
          <SwiperSlide><CardSlider profile={profile}/></SwiperSlide>
          <SwiperSlide><CardSlider profile={profile}/></SwiperSlide>
          <SwiperSlide><CardSlider profile={profile}/></SwiperSlide>
          
        </Swiper>
      </div>
    </div>
  );
}