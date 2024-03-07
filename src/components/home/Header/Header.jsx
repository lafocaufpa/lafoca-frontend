import styles from '@home/Header/Header.module.css';
// import BackgroundImage from '@public/assets/img/header-banner/.png';
import LogoLafoca from '@images/header-banner/logo-lafoca.svg';
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

        <div>
        logo header
        </div>
      </div>
      
    </header>
  );
} 