import Image from 'next/image';
import Link from 'next/link';
import LogoLafoca from '@images/header-banner/logo-lafoca.svg';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logo
      
    }>
      <Link href="/">
        <Image src={LogoLafoca} alt="Logo Lafoca" quality={100} unoptimized/>
      </Link>
    </div>
  );
}