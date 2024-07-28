'use client';
import styles from '@home/Header/Header.module.css';

import LogoBackground from '@images/header-banner/LAFocA.png';
import Image from 'next/image';
import NavBar from '@home/Header/navBar/NavBar';
import HeaderPage from '@home/Header/header/Header';

export default function Header() {
  return (
    <HeaderPage 
      background={'/assets/img/header-banner/BG.png'} 
      height={40} 
      paddingBottom={'2'}
    > 
      
      
      <NavBar/>
      <div className={styles.header__logo} data-aos="fade-up" data-aos-duration="2000">
        <Image src={LogoBackground} alt='Logo Background'/>
      </div>
    </HeaderPage>
  );
}