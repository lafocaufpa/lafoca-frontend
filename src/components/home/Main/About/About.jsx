import styles from './About.module.css';

export default function About () {
  return (
    <section className={styles.about_lafoca}>
      <div className={`${styles.about_info} ${'global-container'}`}>
        <h2>sobre o <span>lafoca</span></h2>
        <p className='global__paragraph_text' data-aos="fade-up"
          data-aos-duration="2000">Fundado em 2017, o LAFocA é formado por alunos e professores, além de parceiros de outras instituições de ensino e empresas do mercado de TI. Nosso foco é o aluno, buscando contribuir para o seu desenvolvimento pessoal, acadêmico e profissional. Esperamos ser reconhecidos como um grupo referência na formação de profissionais qualificados.</p>
      </div>
      <div>
          nossos compromissos
      </div>
    </section>
  );
}