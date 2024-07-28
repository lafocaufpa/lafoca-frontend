import Image from 'next/image';
import styles from './CardProject.module.css';
import Link from 'next/link';

export default function CardProject({ title, image, description, link, durationFade }) {
  return (
    <div data-aos="fade-up" data-aos-duration={durationFade} className={styles.card_project}>
      <div className={styles.card_content_img}>
        <Image src={image} alt={title} fill style={{objectFit:'cover'}} />
      </div>
      <div className={styles.card_info}>
        <h4>{title}</h4>
        <p>{description}</p>
        <Link href={link} className={styles.card_link}>
          Ver mais
        </Link>
      </div>
    </div>
  );
}