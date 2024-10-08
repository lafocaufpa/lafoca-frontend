import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './About.module.css';
import Menina from '@images/sobre/menina.png';

import IconVisao from '@images/sobre/icon-visao.svg';
import IconMissao from '@images/sobre/icon-missao.svg';
import IconValores from '@images/sobre/icon-valores.svg';
import IconPesquisa from '@images/sobre/icon-linha_de_pesquisa.svg';

import Accordion from '@components/home/Main/About/accordion-v2/Accordion';

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 480) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);

    // Call the handler right away to set the initial state
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = [
    {
      icon: IconVisao,
      title: 'VISÃO',
      text: 'Ser reconhecido como um grupo de pesquisa referência na formação de profissionais qualificados.'
    },
    {
      icon: IconMissao,
      title: 'MISSÃO',
      text: 'Propiciar um ambiente adequado que permita desenvolver pesquisas de qualidade, contribuindo para o desenvolvimento dos alunos.'
    },
    {
      icon: IconPesquisa,
      title: 'LINHA DE PESQUISA',
      text: <>
        • Engenharia de Software e Metodologias Ágeis<br /><br />
        • Interação Humano-Computador (IHC) e User eXperience(UX)<br /><br />
        • Jogos e Gameficação<br /><br />
        • Marketing Digital e Midias Sociais<br /><br />
        • Programação e Testes de Software
      </>
    },
    {
      icon: IconValores,
      title: 'VALORES',
      text: 
      <>
        <strong>Comunicação</strong> – Compartilhar informações, buscando transmitir conhecimento e valores.<br /><br />
        <strong>Proatividade</strong> – Tomar iniciativa e decisões na realização das suas atividades.<br /><br />
        <strong>Colaboração</strong> – Trabalhar ou cooperar com as atividades de uma ou mais pessoas do grupo.<br /><br />
        <strong>Protagonismo</strong> – Aceitar os méritos e resultados da realização das suas atividades.<br /><br />
        <strong>Comprometimento</strong> – Empenhar seus esforços e dedicação nas atividades das quais participa.<br /><br />
        <strong>Pertencimento</strong> – Fazer parte de um grupo, se identificando com a linha de pesquisa.
      </>
    },
  ];

  return (
    <section id='sobre' className={styles.about_lafoca}>
      <div className='global-container'>
        <h2 className={styles.lafocaHeading} data-aos="fade-up" data-aos-duration="2000">sobre o <span>lafoca</span></h2>
        <div className={styles.lafocaHeadingMobile}>
          <h2>sobre</h2>
          <h2 className={styles.lafocaHeadingMobile_secondH2}>o <span>lafoca</span></h2>
        </div>
        <p className='global__paragraph_text' data-aos="fade-up" data-aos-duration="1500">
          Fundado em 2017, o La FocA é formado por alunos e professores, além de parceiros de outras instituições de ensino e empresas do mercado de TI. Nosso foco é o aluno, {' '}
          {isExpanded && (
            <>
              buscando contribuir para o seu desenvolvimento pessoal, acadêmico e profissional. Esperamos ser reconhecidos como um grupo referência na formação de profissionais qualificados.
              {' '}
            </>
          )}
          <button className={styles.seeMoreButton} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Ver menos...' : 'Ver mais...'}
          </button>
        </p>
      </div>
      <div className={styles.appointments}>
        <div className={styles.appointments__menina} 
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine">
          <Image src={Menina} alt='Girl Lafoca' unoptimized/>
        </div>
        <div className={styles.container__accordion}>
          <h2 data-aos="fade-up" data-aos-duration="2000"> Compromissos que <br /> <span>desenvolvemos</span></h2>
          <p className='global__paragraph_text' data-aos="fade-up" data-aos-duration="1600">
            Conheça os princípios que norteiam as atividades do laboratório e garantem a excelência nos projetos e resultados obtidos.
          </p>
          <div className={styles.accordion}>
            <Accordion data={data}/>
          </div>
        </div>
      </div>
    </section>
  );
}
