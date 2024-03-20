import Image from 'next/image';
import styles from './CardSlider.module.css';

export default function CardSlider({profile}) {
  return (
    <div className={`${styles['card']} ${'swiper-slide'}`}>
      <div className={`${styles['image-content']}`}>
        <span className={`${styles['overlay']}`}></span>
        <div className={`${styles['card-image']}`}>
          <Image src={profile} className={styles['card-img']}/>
        </div>
      </div>
      <div className={styles['card-content']}>
        <h2 className={styles['name']}>David Dell</h2>
        <p className={styles['description']}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
                expedita aliquam, aut quia eum nihil.
        </p>
        <button className={styles['button']}>View More</button>
      </div>
    </div>
  );
}