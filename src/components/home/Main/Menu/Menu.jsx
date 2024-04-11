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
        <li className={stylesAnimate.hover_animate}>
          <div className={`${stylesAnimate.hover_animate} ${styles.menu_card}`} data-aos="fade-up" data-aos-duration="1000">   
            <div className={styles.menu_content}>
              <h4>
                Artigos Publicados
              </h4>
              <Link href="/outra-pagina" className={stylesAnimate.card_link}>
                Ver mais {'>'}
              </Link>
            </div>
            <div className={styles.menu_img}>
              <Image src={Artigos} alt='Artigos'/>
            </div>
          </div>
        </li>
        <li className={stylesAnimate.hover_animate}>
          <div className={`${styles.menu_card}`} data-aos="fade-up" data-aos-duration="1500">
            <div className={styles.menu_content}>
              <h4>
                Tccs Defendidos
              </h4>
              <Link href="/outra-pagina" className={stylesAnimate.card_link}>
                Ver mais {'>'}
              </Link>
            </div>
            <div className={styles.menu_img}>
              <Image src={Tccs}  alt='Tccs'/>
  
            </div>
          </div>
        </li>
        <li className={stylesAnimate.hover_animate}>
          <div className={`${stylesAnimate.hover_animate} ${styles.menu_card}`} data-aos="fade-up" data-aos-duration="2000">
            <div className={styles.menu_content}>
              <h4>
              Projetos
              </h4>
              <Link href="/outra-pagina" className={stylesAnimate.card_link}>
              Ver mais {'>'}
              </Link>
            </div>
            <div className={styles.menu_img}>
              <Image src={Projetos}  alt='Projetos'/>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}