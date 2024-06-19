import CardProject from '@components/home/Main/Projects/CardProject';
import styles from './Projects.module.css';
import Artigos from '@images/menu/artigos.png';
import Tccs from '@images/menu/tccs.png';
import Projetos from '@images/menu/projetos.png';
import url from '@/routes/url';

export default function Projects() {

  return (
    <section id='pesquisas' className={`${styles.projects_container} global-container`}>
      <div className={`${styles.projects_container}`} >
        <h2 data-aos="fade-up" data-aos-duration="1000" >Nossas <span>Pesquisas</span></h2>
        <p data-aos="fade-up" data-aos-duration="2000" className='global__paragraph_text'>
        Conheça os projetos que desenvolvemos em nosso grupo, na forma de extensão universitária, pesquisas acadêmicas e parcerias com o mercado.
        </p>
      </div>
      <div className={styles.projects_card}>
    
        <CardProject 
          title={'Artigos Publicados'} 
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in scelerisque nibh'}
          image={Artigos} 
          link={url.artigos.listarArtigos} 
          durationFade={1000}
        />
        <CardProject 
          title={'Tccs Defendidos'} 
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in scelerisque nibh'}
          image={Tccs} 
          link={url.tccs.listarTccs} 
          durationFade={1500}
        />
        <CardProject 
          title={'Projetos'} 
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in scelerisque nibh'}
          image={Projetos} 
          link={url.projetos.listarProjetos} 
          durationFade={2000}
        />
      </div>     
    </section>
  );
}