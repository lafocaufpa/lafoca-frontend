import styles from './Footer.module.css';
import Image from 'next/image';
import Logo from '@images/footer/Logo_LaFocA.png';
import Facebook from '@images/footer/facebook.svg';
import Instagram from '@images/footer/instagram.svg';
import Line from '@images/footer/line-footer.svg';

export default function Footer() {
  return (
    <footer className={styles.footer_background}>

      <div className={`${styles.footer_container} ${'global-container'}`}>

        <div className={styles.footer_lafoca_info}>

          <div>
            <Image src={Logo} alt='Logo Lafoca' />
            <p>LABORATÓRIO DE ABORDAGENS DE ENSINO FOCADAS NO ALUNO</p>
          </div>

          <div className={styles.footer_nav}>

            <div className={styles.footer_nav_column}>
              <h3>Saiba Mais</h3>
              <ul>
                <li>Sobre Nós</li>
                <li>Política de Privacidade</li>
                <li>Política de Cookies</li>
              </ul>
            </div>

            <div  className={styles.footer_nav_column}>
              <h3>Parceiros</h3>
              <ul>
                <li>NEES</li>
                <li>LABTEC</li>
                <li>LABEX</li>
              </ul>
            </div>

            <div  className={styles.footer_nav_column}>
              <h3>Alguma dúvida? Mande um email</h3>
              <ul>
                <li>lafoca@ufpa.com.br</li>
              </ul>
            </div>
     
          </div>

        </div>

      </div>
      <div className={styles.footer_line}>
        <span></span>
      </div>
      
      <div className={`${styles.footer_details} ${'global-container'}`}>
          Lafoca 2017 - {new Date().getFullYear()}
        <div className={styles.footer_details_links}>
          <ul>
            <li><a href='#'><Image src={Facebook} alt='Facebook'/></a></li>
            <li><a href='#'><Image src={Instagram} alt='Instagram'/></a></li>
          </ul>
        </div>
      </div>

      

    </footer>
  );
}