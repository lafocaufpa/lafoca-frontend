import Logo from '@home/Logo/Logo';
import styles from './NavBar.module.css';
import Link from 'next/link';
import { useState } from 'react';
import useHash from '@/hooks/useHash';
import arrow from '@images/icons/arrou-hamburguer.svg';
import Image from 'next/image';

export default function NavBar() {
  const [isActive, setIsActive] = useState(false);
  const hash = useHash();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <div className={styles.header__nav}>
      <Logo/>
      <div> 
        <nav className={`${styles.navbar} ${isActive ? styles.active : ''}`}>
          <div className={styles.hamburguerLine}></div>
          <Link href="#sobre" onClick={closeMenu}>
            SOBRE
            {hash === 'sobre' && <Image className={styles.arrow} src={arrow}/>}
          </Link>
          <Link href="#equipe" onClick={closeMenu}>
            EQUIPE
            {hash === 'equipe' && <Image className={styles.arrow} src={arrow}/>}
          </Link>
          <Link href="#resultados" onClick={closeMenu}>
            RESULTADOS
            {hash === 'resultados' && <Image className={styles.arrow} src={arrow}/>}
          </Link>
          <Link href="#pesquisas" onClick={closeMenu}>
            PESQUISAS
            {hash === 'pesquisas' && <Image className={styles.arrow} src={arrow}/>}
          </Link>
          <Link href="/login" onClick={closeMenu}>
            LOGIN
            {hash === 'login' && <Image className={styles.arrow} src={arrow}/>}
          </Link>
        </nav>
        <button className={styles.MenuHamburger} onClick={toggleMenu}></button>
        
      </div>
    </div>
  );
}