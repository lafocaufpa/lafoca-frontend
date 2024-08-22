import Image from 'next/image';
import styles from './CardProject.module.css';
import Link from 'next/link';

export default function CardProject({ title, image, description, link, durationFade }) {
  return (
    <div className={styles.card_wrapper}>
      <div data-aos="fade-up" data-aos-duration={durationFade} className={styles.card_project}>
        <Link href={link} className={styles.card_link}>
          <div className={styles.card_content_img}>
            <Image src={image} alt={title} fill quality={100} sizes='auto'/>
          </div>
          <div className={styles.card_info}>
            <h4>{title}</h4>
            <p>{description}</p>
        
            <strong>Ver mais</strong>
        
          </div>
        </Link>
      </div>
    </div>
    
  );
}