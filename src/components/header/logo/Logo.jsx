import styles from './Logo.module.css';
import IconLogoWhite from '@/components/icon/IconLogoWhite';

export default function Logo() {
  return (
    <div className={styles.containerImg}>
      <IconLogoWhite color='black'/>
    </div>
  );
}