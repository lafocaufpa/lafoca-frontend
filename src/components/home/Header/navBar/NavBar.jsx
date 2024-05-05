import Image from 'next/image';
import LogoLafoca from '@images/header-banner/logo-lafoca.svg';
import styles from './NavBar.module.css';
import Link from 'next/link';

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
          <Link href="#sobre">SOBRE</Link>
          <Link href="#equipe">EQUIPE</Link>
          <Link href="#resultados">RESULTADOS</Link>
          <Link href="#pesquisas">PESQUISAS</Link>
        </nav>
      </div>
    </div>
  );
}