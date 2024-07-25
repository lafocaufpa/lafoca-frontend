import Image from 'next/image';
import LogoLAFocABlack from '@images/icons/Logo-LAFocA-black.png';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.containerImg}>
      <Image src={LogoLAFocABlack} alt='Logo Background'/>
    </div>
  );
}