import Foto from '@images/team/gustavo.jpeg';
import styles from './TeamSlider.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import CardSlider from './CardSlider/CardSlider-v2';
import { studentService } from '@/services/api/mEMBERS/StudentsService';
import { useEffect, useState } from 'react';


export default function TeamSlider() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studentService.listSummarized();
        
        setStudents(response.content);
      } catch (error) {
        console.error('Erro ao buscar estudantes:', error);
      }
    };

    fetchData();
  }, []);

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
              spaceBetween: 20,
            },
            650: {
              slidesPerView: 2,
              spaceBetween: 80,
            },
            950: {
              slidesPerView: 3,
              spaceBetween: 100,
            },
          }} 
          style={customStyles}

        >  
          {
            students.map((student) => (
              <SwiperSlide key={student.id}>
                <CardSlider student={student} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  );
}

