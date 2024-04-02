import Link from 'next/link';
import styles from './Menu.module.css';
import stylesAnimate from '@home/Custom-Slider/Animate.module.css';
import Image from 'next/image';
import Artigos from '@images/menu/artigos.png';
import Tccs from '@images/menu/tccs.png';
import Projetos from '@images/menu/projetos.png';

export default function Menu () {
  return (
    <nav className={`${styles.menu_container} global-container`}>
      <ul>
        <li> <div className={`${stylesAnimate.hover_animate} ${styles.menu_card}`}>
        
          <div className={styles.menu_content}>
            <h4>
                Artigos Publicados
            </h4>
            <Link href="/outra-pagina" className={stylesAnimate.card_link}>
                Ver mais {'>'}
            </Link>
          </div>
          <div className={styles.menu_img}>
            <Image src={Artigos}/>
  
          </div>
        </div></li>
        <li><div className={`${stylesAnimate.hover_animate} ${styles.menu_card}`}>
        
          <div className={styles.menu_content}>
            <h4>
                Tccs Defendidos
            </h4>
            <Link href="/outra-pagina" className={stylesAnimate.card_link}>
                Ver mais {'>'}
            </Link>
          </div>
          <div className={styles.menu_img}>
            <Image src={Tccs}/>
  
          </div>
        </div></li>
        <li><div className={`${stylesAnimate.hover_animate} ${styles.menu_card}`}>
        
          <div className={styles.menu_content}>
            <h4>
              Projetos
            </h4>
            <Link href="/outra-pagina" className={stylesAnimate.card_link}>
              Ver mais {'>'}
            </Link>
          </div>
          <div className={styles.menu_img}>
            <Image src={Projetos}/>

          </div>
        </div></li>
      </ul>
     
  
      
    
    </nav>
  );
}