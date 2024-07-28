import Footer from '@/components/home/Footer/Footer';
import styles from './AboutUs.module.css';
import Header from '@components/header/Header';

export default function AboutUs() {
  return (
    <>
      <Header/>
      <div className={styles.container}>
        <h1 className={styles.title}>Sobre Nós</h1>
        <p>
          O Laboratório de Abordagens de Ensino Focada no Aluno (La FocA) é um grupo de pesquisa multidisciplinar que tem como objetivo desenvolver estudos, pesquisas e projetos com abordagem centrada no aluno, visando a inovação no processo de ensino e aprendizagem.
        </p>
        <p>
          O laboratório busca criar soluções modernas e eficazes para problemas reais da sociedade, considerando as necessidades do ser humano e da comunidade onde vivem.
        </p>
        <p>
          Com base em ações interdisciplinares, o La FocA promove articulações entre professores, estudantes de graduação e pós-graduação, membros da comunidade local e empresas do setor público e privado. Essa interação resulta no desenvolvimento de estudos e pesquisas que abrangem conceitos, metodologias e ferramentas da inovação.
        </p>
        <p>
          Como efeito, contribui para a formação de profissionais competentes e com visão empreendedora, que possam ser agentes de mudança na sociedade.
        </p>
      </div>
      <Footer />
    </>
  );
}