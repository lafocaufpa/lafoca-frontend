import styles from './CardInfo.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ButtonLink from '../buttonLink/ButtonLink';

export default function CardInfo({icon, tittle, description, link}) {
  return (
    <div className={styles.cardInfo}>
      <div>
        <Image src={icon} alt='icon'/>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardContent_tittle}>{tittle}</p>
        <p className={styles.cardContent_desc}>{description}</p>
      </div>
      {link && 
      <Link 
        href={'/'} 
        target="_black"
        rel="noopener noreferrer" 
        className={styles.cardLink}
      >
        <ButtonLink/>
      </Link>
      }
    </div>
  );
}