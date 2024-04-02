import Image from 'next/image';
import styles from './CardSlider-v2.module.css';
import stylesAnimate from '@components/home/Custom-Slider/Animate.module.css';
import Link from 'next/link';

export default function CardSlider({ student }) {


  return (
    <Link href={'#'} data-aos="fade-up" >
      <div className={`${styles.card} ${stylesAnimate.hover_animate}`}>
        <div className={styles.card_content}>
          <div className={styles.text_container}>
            <h2 className={styles.card_content_name}>{student.name}</h2>
            <p
              className={
                `${styles.card_content_function} 
               ${student.function.length > 21 ? styles.horizontally_animated_text : ''}`
              }
            >
              {student.function}</p>
          </div>
          
          <button className={styles.card_content_button}>{'>'}</button>
        </div>
        <Image src={student.photo} alt={student.name} width={100} height={100} quality={100}  />
      </div>
    </Link>
   
  );
}