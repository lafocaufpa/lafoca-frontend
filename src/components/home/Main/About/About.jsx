import Image from 'next/image';
import styles from './About.module.css';
import Menina from '@images/sobre/menina.png';

import IconVisao from '@images/sobre/icon-visao.svg';
import IconMissao from '@images/sobre/icon-missao.svg';
import IconValores from '@images/sobre/icon-valores.svg';
import IconPesquisa from '@images/sobre/icon-linha_de_pesquisa.svg';

import { Accordion } from './Accordion/Accordion';

export default function About () {
  return (
    <section className={styles.about_lafoca}>
      <div className={`${styles.about_info} ${'global-container'}`}>
        <h2 data-aos="fade-up" data-aos-duration="2000">sobre o <span>lafoca</span></h2>
        <p className='global__paragraph_text' data-aos="fade-up"
          data-aos-duration="2000">Fundado em 2017, o LAFocA é formado por alunos e professores, além de parceiros de outras instituições de ensino e empresas do mercado de TI. Nosso foco é o aluno, buscando contribuir para o seu desenvolvimento pessoal, acadêmico e profissional. Esperamos ser reconhecidos como um grupo referência na formação de profissionais qualificados.</p>
      </div>
      <div className={styles.appointments}>
        <div className={styles.appointments__menina} 
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine">
          <Image src={Menina} alt='Girl Lafoca'/>
        </div>
        <div className={styles.container__accordion}>
          <h2  data-aos="fade-up" > Compromissos que <br/> <span>desenvolvemos</span></h2>
          <p className='global__paragraph_text' data-aos="fade-up" >Conheça os princípios que norteiam as atividades do laboratório e garantem a excelência nos projetos e resultados obtidos.
          </p>
          <div className={styles.accordion}>
            
            <Accordion
              Icon={IconVisao}
              title="VISÃO"
              text="Ser reconhecido como um grupo de pesquisa referência na
                    formação de profissionais qualificados."
            />
            <Accordion
              Icon={IconMissao}
              title="MISSÃO"
              text="Propiciar um ambiente adequado que permita desenvolver
                    pesquisas de qualidade, contribuindo para o desenvolvimento dos
                    alunos."
            />
            <Accordion
              Icon={IconPesquisa}
              title="LINHA DE PESQUISA"
              text={
                <>
                            
                                • Engenharia de Software e Metodologias Ágeis<br /><br />
                                • Interação Humano-Computador (IHC) e User eXperience(UX)<br /><br />
                                • Jogos e Gameficação<br /><br />
                                • Marketing Digital e Midias Sociais<br /><br />
                                • Programação e Testes de Software
                            
                </>}
            />
            <Accordion
              Icon={IconValores}
              title="VALORES"
              text={
                <>
                  <strong>Comunicação</strong> – Compartilhar informações, buscando transmitir conhecimento e valores.<br />
                  <strong>Proatividade</strong> – Tomar iniciativa e decisões na realização das suas atividades.<br />
                  <strong>Colaboração</strong> – Trabalhar ou cooperar com as atividades de uma ou mais pessoas do grupo.<br />
                  <strong>Protagonismo</strong> – Aceitar os méritos e resultados da realização das suas atividades.<br />
                  <strong>Comprometimento</strong> – Empenhar seus esforços e dedicação nas atividades das quais participa.<br />
                  <strong>Pertencimento</strong> – Fazer parte de um grupo, se identificando com a linha de pesquisa.
                </>
              }
            />
            
          </div>
          
        </div>
      </div>
    </section>
  );
}