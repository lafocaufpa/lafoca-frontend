import Image from 'next/image';
import styles from './CardProject.module.css';
import stylesAnimate from '@components/home/Custom-Slider/Animate.module.css';
import Link from 'next/link';

export default function CardProject({title, image, description, link, durationFade}) {
  return (
    <div data-aos="fade-up" data-aos-duration={durationFade} className={`${styles.card_project} ${stylesAnimate.hover_animate} `}>
      
      <div className={styles.card_content}>
        
        <div className={styles.card_content_img}>
          <Image src={image} alt={'Artigos'} />
        </div>
      </div>

      <div className={styles.card_info}>
        <h4>{title}</h4>
        <p className={stylesAnimate.text_wrap}>
          {description}
        </p>
        <Link href={link} className={stylesAnimate.card_link}>
          Ver mais {'>'}
        </Link>
      </div>
    </div>
  );
}