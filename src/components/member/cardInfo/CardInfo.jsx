import styles from './CardInfo.module.css';
import Image from 'next/image';

export default function CardInfo({icon, tittle, description}) {
  return (
    <div className={styles.cardInfo}>
      <div>
        <Image src={icon} alt='icon'/>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardContent_tittle}>{tittle}</p>
        <p className={styles.cardContent_desc}>{description}</p>
      </div>
    </div>
  );
}