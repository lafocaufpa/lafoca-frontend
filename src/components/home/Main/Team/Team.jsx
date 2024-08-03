'use client';

import styles from './Team.module.css';
import stylesAnimate from '@home/Custom-Slider/Animate.module.css';
import { useEffect, useState } from 'react';
import CustomSlider from '@components/home/Custom-Slider/CustomSlider';
import { MemberService } from '@/services/api/Members/MembersService';
import CardSlider from '@components/home/Main/Team/CardSlider/CardSlider-v2';
import Link from 'next/link';
import url from '@/routes/url';
import useWindowWidth from '@/hooks/useWindowWidth';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MemberService.listSummarized();
        setMembers(response.content);
      } catch (error) {
        console.error('Erro ao buscar membros: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id='equipe' className={styles.team}>
      <div className='global-container'>
        <h2 data-aos="fade-up" data-aos-duration="2000">Nossa <span>Equipe</span></h2>
        <p data-aos="fade-up" data-aos-duration="1500" className='global__paragraph_text'>
          Conheça a equipe que compõe o nosso laboratório de pesquisa e veja um pouco mais sobre cada um deles e como eles contribuem para o sucesso das nossas atividades.
        </p>

        {windowWidth >= 480 && (
          <CustomSlider 
            Slider={isLoading ? Array(5).fill(null).map((_, index) => (
              <CardSlider key={index} loading={true} />
            )) : members.map((member, index) => (
              <CardSlider key={index} member={member} />
            ))}
          />
        )}

        {windowWidth <= 480 && (
          isLoading ? '' : (
            <div className={styles.membersMobile}>
              <CardSlider member={members[0]}/>
              <CardSlider member={members[1]}/>
              <CardSlider member={members[2]}/>
            </div>
          )
        )
        }

        <div style={{ textAlign: 'right' }}>
          <Link href={url.membros.listarMembros} className={stylesAnimate.card_link}> Ver mais</Link>
        </div>
      </div>
    </section>
  );
}
