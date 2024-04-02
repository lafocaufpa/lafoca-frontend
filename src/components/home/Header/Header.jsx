import styles from '@home/Header/Header.module.css';
import LogoLafoca from '@images/header-banner/logo-lafoca.svg';
import LogoBackground from '@images/header-banner/logo-background-new.png';
import Image from 'next/image';

export default function Header() {
  return (
    <header className={styles.header} style={{ backgroundImage: 'url("/assets/img/header-banner/BG.png")'}}>
      <div className='global-container'>
        <div className={styles.header__nav}>
          <div>
            <Image src={LogoLafoca} alt='Logo Lafoca'/>
          </div>
          <div> 
            <nav className={styles.navbar}>
              <a href="#sobre">SOBRE</a>
              <a href="#equipe">EQUIPE</a>
              <a href="#projetos">PROJETOS</a>
              <a href="#resultados">RESULTADOS</a>
            </nav>
          </div>
        </div>

        <div className={styles.header__logo_Background} data-aos="fade-up" data-aos-duration="2000">
          <Image src={LogoBackground} alt='Logo Background'/>
        </div>
      </div>
      
    </header>
  );
}