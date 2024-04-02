import Image from 'next/image';
import styles from './CardSlider.module.css';
import Link from 'next/link';

export default function CardSlider({ profile: { nome, cargo, foto } }) {
  return (
    <Link href={'#'} data-aos="fade-up" >
      <div className={`${styles['card']} ${'swiper-slide'}`}>
        <div className={`${styles['image-content']}`}>
          <span className={`${styles['overlay']}`}></span>
          <div className={`${styles['card-image']}`}>
            <Image src={foto} className={styles['card-img']} alt={nome}/>
          </div>
        </div>
        <div className={styles['card-content']}>
          <h2 className={styles['name']}>{nome}</h2>
          <p className={styles['description']}>
            {cargo}
          </p>
          <button className={styles['button']}>{'>'}</button>
        </div>
      </div>
    </Link>
   
  );
}