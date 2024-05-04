'use client';
import styles from './Team.module.css';
import { useEffect, useState } from 'react';
import CustomSlider from '../../Custom-Slider/CustomSlider';
import { MemberService } from '@/services/api/Members/MembersService';
import CardSlider from './CardSlider/CardSlider-v2';

export default function Team() {

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MemberService.listSummarized();
        
        setMembers(response.content);
      } catch (error) {
        console.error('Erro ao buscar membros: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.team}>
      <div className='global-container'>
        {/* <div> */}
        <h2 data-aos="fade-up" data-aos-duration="2000" >Nossa <span>Equipe</span></h2>
        <p data-aos="fade-up" data-aos-duration="1500" className='global__paragraph_text'>Conheça a equipe que compõe o nosso laboratório de pesquisa e veja um pouco mais sobre  cada um deles e como eles contribuem para o sucesso das nossas atividades.</p>
        
        
        <CustomSlider Slider={members.map((member, index) => (
          <CardSlider key={index} member={member} />
        ))}/>
        {/* </div> */}
      </div>
    </section>
  );
}