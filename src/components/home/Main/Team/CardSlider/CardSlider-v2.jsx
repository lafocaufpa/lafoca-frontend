import Image from 'next/image';
import styles from './CardSlider-v2.module.css';
import stylesAnimate from '@components/home/Custom-Slider/Animate.module.css';
import Link from 'next/link';
import url from '@/routes/url';
import stylesView from './ViewAllCard.module.css';

export default function CardSlider({member, height, viewAll}) {

  return (
    <Link href={url.membros.buscarPeloSlug(member.slug)}>

      <div className={`${styles.card} ${viewAll ? '' : stylesAnimate.hover_animate}`} style={height ? { height: `${height}px` } : {}} >
        <div className={`${viewAll ? stylesView.card_content : styles.card_content}`} >
          <div className={styles.text_container}>
            <h2 className={`${viewAll ? stylesView.card_content_name : styles.card_content_name}
            ${member.displayName.length > 21 ? styles.horizontally_animated_text : ''}
            `}>
              {member.displayName}
            </h2>
            <p
              className={
                `${viewAll ? stylesView.card_content_function : styles.card_content_function}
               ${member.function.length > 21 ? styles.horizontally_animated_text : ''}`
              }>

              {member.function}</p>
          </div>
          
          <button className={styles.card_content_button}>{'>'}</button>
        </div>
        <Image 
          src={member.photo} 
          alt={member.displayName} 
          width={100} 
          height={100} 
          quality={100} 
          className={`${viewAll ? stylesAnimate.hover_animate_img : ''}`}
        />
      </div>
      
    </Link>
   
  );
}