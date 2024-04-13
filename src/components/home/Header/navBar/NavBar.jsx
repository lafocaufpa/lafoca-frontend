import Image from 'next/image';
import LogoLafoca from '@images/header-banner/logo-lafoca.svg';
import styles from './NavBar.module.css';
import Link from 'next/link';
import routes from '@/routes';

export default function NavBar() {
  return(
    <div className={styles.header__nav}>
      <div>
        <Link href="/">
          <Image src={LogoLafoca} alt='Logo Lafoca'/>
        </Link>
        
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
  );
}