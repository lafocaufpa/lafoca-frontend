'use client';

import styles from './Results.module.css';
import Selo from '@images/Results/Selo-LaFoca.svg';
import ResultsBg from '@images/Results/Results-banner.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { lafocaService } from '@services/api/Lafoca/LafocaService';

export default function Results () {

  const [lafoca, setLafoca] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await lafocaService.listInfo();
        setLafoca(response);
      } catch (error) {
        console.error('Erro ao buscar informações do La Foca: ', error);
      }
    };
    fetchData();
  }, []);


  return (
    <section className={styles.results_background} >

      <div className='global-container'>
        <div className={styles.results}>
          <div>
            <h2 data-aos="fade-up" data-aos-duration="2000" >RESULTADOS DE <br/> PESQUISAS</h2>
            <div data-aos="fade-up" data-aos-duration="1100" className={styles.results_counts}>
              <div className={styles.container_count}>
                <span>{lafoca?.numberOfPublishedArticles}</span>
                <p>Artigos Publicados</p>
              </div>
              <div data-aos="fade-up" data-aos-duration="1500"  className={styles.container_count}>
                <span>{lafoca?.numberOfDefendedTCCs}</span>
                <p>TCCs Defendidos</p>
              </div>
              <div data-aos="fade-up" data-aos-duration="1900" className={styles.container_count}>
                <span>{lafoca?.numberOfProjects}</span>
                <p>Projetos</p>
              </div>
            </div>
          </div>
          <div className={styles.results_images}>
            <Image data-aos="fade-up" data-aos-duration="2000" src={Selo} alt='Selo-Lafoca'/>
            <Image data-aos="fade-up" data-aos-duration="2000"  src={ResultsBg} alt='Equipe'/>
          </div>
        </div>
      </div>

    </section>
  );
}