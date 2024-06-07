import Image from 'next/image';
import LogoLafoca from '@images/header-banner/logo-lafoca.svg';
import styles from './NavBar.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <div className={styles.header__nav}>
      <div>
        <Link href="/">
          <Image src={LogoLafoca} alt="Logo Lafoca" />
        </Link>
      </div>
      
      <div> 
        <nav className={`${styles.navbar} ${isActive ? styles.active : ''}`}>
          <Link href="#sobre" onClick={closeMenu}>
            SOBRE
          </Link>
          <Link href="#equipe" onClick={closeMenu}>
            EQUIPE
          </Link>
          <Link href="#resultados" onClick={closeMenu}>
            RESULTADOS
          </Link>
          <Link href="#pesquisas" onClick={closeMenu}>
            PESQUISAS
          </Link>
        </nav>
        <button className={styles.MenuHamburger} onClick={toggleMenu}></button>
      </div>
    </div>
  );
}