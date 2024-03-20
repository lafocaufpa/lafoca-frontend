import Profile from '@images/team/profile1.png';
import styles from './TeamSlider.module.css';
import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';

import CardSlider from './CardSlider/CardSlider';

export default function TeamSlider() {

  useEffect(() => {
    // eslint-disable-next-line no-undef
    new Swiper('.slider-content', {
      // slidesPerView: 3,
      spaceBetween: 25,
      loop: true,
      // centerSlide: true,
      // effect: 'fade',
      // fadeEffect: {
      //   crossFade: true
      // },
      // grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        950: {
          slidesPerView: 3,
        },
      }
    });

  }, []);

  return (
    <div className={`${'swiper'} ${styles['slider-container']}`}>
      <div className='slider-content'>
        <div className={`${'card-wrapper'} ${'swiper-wrapper'}`}>

          <CardSlider profile={Profile}/>
          <CardSlider profile={Profile}/>
          <CardSlider profile={Profile}/>
          <CardSlider profile={Profile}/>
          <CardSlider profile={Profile}/>
          <CardSlider profile={Profile}/>
          <CardSlider profile={Profile}/>
          <CardSlider profile={Profile}/>

        </div>
      </div>
      <div className={`${'swiper-button-next'} ${'swiper-navBtn'}`}></div>
      <div className={`${'swiper-button-prev'} ${'swiper-navBtn'}`}></div>
      <div className={`${'swiper-pagination'}`}></div>
    </div>
  );
}