import Image from 'next/image';
import styles from './CardSlider-v2.module.css';
import stylesAnimate from '@components/home/Custom-Slider/Animate.module.css';
import Link from 'next/link';
import routes from '@/routes';

export default function CardSlider({member}) {

  return (
    <Link href={routes.members.MEMBERS}>
      <div>
        <div className={`${styles.card} ${stylesAnimate.hover_animate}`} >
          <div className={styles.card_content} >
            <div className={styles.text_container}>
              <h2 className={styles.card_content_name}>{member.name}</h2>
              <p
                className={
                  `${styles.card_content_function} 
               ${member.function.length > 21 ? styles.horizontally_animated_text : ''}`
                }
              >
                {member.function}</p>
            </div>
          
            <button className={styles.card_content_button}>{'>'}</button>
          </div>
          <Image src={member.photo} alt={member.name} width={100} height={100} quality={100}/>
        </div>
      </div>
      
    </Link>
   
  );
}