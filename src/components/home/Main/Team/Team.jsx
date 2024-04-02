import { useEffect, useState } from 'react';
import CustomSlider from '../../Custom-Slider/CustomSlider';
import { studentService } from '@/services/api/Students/StudentsService';
import CardSlider from './TeamSlider/CardSlider/CardSlider-v2';

export default function Team() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studentService.listSummarized();
        
        setStudents(response.content);
      } catch (error) {
        console.error('Erro ao buscar membros: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className='global-container'>
        <div>
          <h2 data-aos="fade-up">Nossa <span>Equipe</span></h2>
          <p data-aos="fade-up" className='global__paragraph_text'>Conheça a equipe que compõe o nosso laboratório de pesquisa e veja um pouco mais sobre  cada um deles e como eles contribuem para o sucesso das nossas atividades.</p>
        </div>
        
        <CustomSlider Slider={students.map((student) => (
          <CardSlider key={student.id} student={student} />
        ))}/>
        
      </div>
    </section>
  );
}