import styles from './CardInfo.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ButtonLink from '@/components/member/buttonLink/ButtonLink';

export default function  CardInfo({icon, title, description, link}) {
  return (
    <div className={styles.cardInfo}>

      <Image className={styles.img} src={icon} alt='icon'/>

      <div className={styles.cardContent}>
        <p className={styles.cardContent_title}>{title}</p>
        <p className={styles.cardContent_desc}>{description}</p>
      </div>
      {link && 
      <Link 
        href={link} 
        target="_black"
        rel="noopener noreferrer" 
        className={styles.cardLink}
      >
        <ButtonLink black/>
      </Link>
      }
    </div>
  );
}