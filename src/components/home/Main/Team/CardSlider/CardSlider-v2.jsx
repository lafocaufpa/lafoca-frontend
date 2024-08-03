import Image from 'next/image';
import styles from './CardSlider-v2.module.css';
import stylesAnimate from '@components/home/Custom-Slider/Animate.module.css';
import Link from 'next/link';
import url from '@/routes/url';
import stylesView from './ViewAllCard.module.css';
import IconArrowRightWhite from '@/components/icon/IconArrowRightWhite';

export default function CardSlider({ member, height, viewAll, loading }) {
  return (
    <Link   href={member?.slug ? url.membros.buscarPeloSlug(member.slug) : '#'}>
    
      <div className={`${styles.card} ${viewAll ? stylesView.card : styles.container} ${viewAll ? '' : stylesAnimate.hover_animate}`} style={height ? { height: `${height}px` } : {}}>
        <div className={`${viewAll ? stylesView.card_content : styles.card_content}`}>
          <div className={styles.text_container}>
            {loading ? (
              <>
                <h2 className={styles.card_content_name}>Carregando...</h2>
                <p className={styles.card_content_function}>Por favor, aguarde</p>
              </>
            ) : (
              <>
                <h2 className={`${viewAll ? stylesView.card_content_name : styles.card_content_name}
              ${member?.displayName.length > 21 ? styles.horizontally_animated_text : ''}`}>
                  {member?.displayName}
                </h2>
                <p className={`${viewAll ? stylesView.card_content_function : styles.card_content_function}
              ${member?.function.length > 21 ? styles.horizontally_animated_text : ''}`}>
                  {member?.function}
                </p>
              </>
            )}
          </div>
          {!loading && <button className={`${ viewAll ? stylesView.card_content_button : styles.card_content_button}`}>{<IconArrowRightWhite/>}</button>}
        </div>
        {!loading && (
          <Image 
            src={member.photo} 
            alt={member.displayName} 
            width={100} 
            height={100} 
            quality={100} 
            unoptimized='false'
            className={`${viewAll ? stylesAnimate.hover_animate_img : ''}`}
          />
        )}
      </div>
    </Link>
  );
}
