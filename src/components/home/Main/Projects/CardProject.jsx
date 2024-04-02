import Image from 'next/image';
import styles from './CardProject.module.css';
import stylesAnimate from '@components/home/Custom-Slider/Animate.module.css';
import Link from 'next/link';
import img from '@images/projects/artigo.png';

export default function CardProject({project}) {
  return (
    <div className={`${styles.card_project} ${stylesAnimate.hover_animate} `}>
      
      <div className={styles.card_content}>
        <span className={styles.card_publication}>{project.status}</span>
        
        <div className={styles.card_content_img}>
          <Image src={img} alt={project.tittle} width={100} height={100} quality={100}  />
        </div>
        <span className={styles.card_year}>{project.year}</span>
      </div>

      <div className={styles.card_info}>
        <span>{project.type}</span>
        <h4 title={project.tittle}>
          {project.tittle}
        </h4>
        <p 
          title={project.description} 
          className={`${stylesAnimate.text_wrap}`}
        >{project.description}</p>
        <Link href="/outra-pagina" className={stylesAnimate.card_link}>
          Ver mais {'>'}
        </Link>
      </div>
    </div>
  );
}