import styles from './Results.module.css';
import Selo from '@images/Results/Selo-LaFoca.svg';
import ResultsBg from '@images/Results/Results-banner.png';
import Image from 'next/image';

export default function Results () {
  return (
    <section className={styles.results_background} >

      <div className='global-container'>
        <div className={styles.results}>
        
          <div>
            <h2>RESULTADOS DE <br/> PESQUISAS</h2>
            <div className={styles.results_counts}>
              <div className={styles.container_count}>
                <span>{0}</span>
                <p>Artigos Publicados</p>
              </div>
              <div className={styles.container_count}>
                <span>{0}</span>
                <p>TCCs Defendidos</p>
              </div>
              <div className={styles.container_count}>
                <span>{0}</span>
                <p>Projetos</p>
              </div>
            </div>
          </div>
          <div className={styles.results_images}>
            <Image src={Selo} alt='Selo-Lafoca'/>
            <Image src={ResultsBg} alt='Equipe'/>
          </div>
        </div>
      </div>

    </section>
  );
}