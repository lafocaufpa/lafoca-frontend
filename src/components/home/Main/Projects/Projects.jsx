import CardProject from './CardProject';
import styles from './Projects.module.css';
import CustomSlider from '@home/Custom-Slider/CustomSlider';
import { useEffect, useState } from 'react';
import { projectsService } from '@/services/api/Projects/ProjectsService';

export default function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await projectsService.listSummarized();
        
        setProjects(response.content);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='global-container'>
      <div className={`${styles.projects_container}`} >
        <h2>Nossos <span>Projetos</span></h2>
        <p className='global__paragraph_text'>
        Conheça os projetos que desenvolvemos em nosso grupo, na forma de extensão universitária, pesquisas acadêmicas e parcerias com o mercado.
        </p>
      </div>
      <div>
        <CustomSlider Slider={projects.map((project, index) => (
          <CardProject key={index} project={project} />
        ))}/>
      </div>
      
    </section>
  );
}