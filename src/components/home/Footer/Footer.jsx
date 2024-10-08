import styles from './Footer.module.css';
import Image from 'next/image';
import Logo from '@images/footer/Logo_LaFocA.png';
import Facebook from '@images/footer/facebook.svg';
import Instagram from '@images/footer/instagram.svg';
import url from '@/routes/url';
import Link from 'next/link';

export default function Footer({ marginTop, ...props }) {
  const footerStyle = {
    ...(marginTop !== undefined && { marginTop: `${marginTop}rem` }),
  };

  return (
    <footer className={styles.footer_background} style={footerStyle}>

      <div className={`${styles.footer_container} ${'global-container'}`}>

        <div className={styles.footer_lafoca_info}>

          <div>
            <Image src={Logo} alt='Logo Lafoca' />
            <p>LABORATÓRIO DE ABORDAGENS DE ENSINO FOCADAS NO ALUNO</p>
          </div>

          <div className={styles.footer_nav}>

            <div className={styles.footer_nav_column}>
              <h3>Saiba Mais</h3>
              <ul className={styles.link}>
                <li><Link href={url.about.sobreNos}>Sobre Nós</Link></li>
                <li>Política de Privacidade</li>
                <li><Link href={url.about.cookies}>Política de Cookies</Link></li>
              </ul>
            </div>

            <div  className={styles.footer_nav_column}>
              <h3>Parceiros</h3>
              <ul className={styles.link}>
                <li><Link href={'https://www.nees.ufal.br'}  target='_blank' rel="noreferrer">NEES</Link></li>
                <li><Link href={'https://sites.google.com/view/gplabtec'}  target='_blank' rel="noreferrer">LABTEC</Link></li>
                <li><Link href={'https://projetoslabex.com.br'}  target='_blank' rel="noreferrer">LABEX</Link></li>
              </ul>
            </div>

            <div className={styles.footer_nav_column}>
              <h3>Alguma dúvida? Nos mande um e-mail! 😉🚩</h3>
              <ul>
                <li>lafoca.3cp@gmail.com</li>
              </ul>
            </div>
     
          </div>

        </div>

      </div>
      <div className={styles.footer_line}>
        <span></span>
      </div>
      
      <div className={`${styles.footer_details} ${'global-container'}`}>
          LA FocA 2017 - {new Date().getFullYear()}
        <div className={styles.footer_details_links}>
          <ul>
            <li><a href={url.redes.facebook} target='_blank' rel="noreferrer"><Image src={Facebook} alt='Facebook'/></a></li>
            <li><a href={url.redes.instagram} target='_blank' rel="noreferrer"><Image src={Instagram} alt='Instagram'/></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}