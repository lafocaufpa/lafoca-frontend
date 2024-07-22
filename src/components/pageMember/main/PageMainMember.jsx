import IconLogoLafoca from '@/components/icon/IconLogoLafoca';
import styles from './PageMainMember.module.css';
import ContentPageMember from '@components/pageMember/contentPageMember/ContentPageMember';
import SectionJoinLafoca from '@components/pageMember/main/SectionJonLafoca';

export default function PageMainMember() {
  return (
    <main className='global-container'>
      <section className={styles.container}>
        <IconLogoLafoca/>
        <h1>
        Conheça Nossa Equipe de Pesquisa: Diversidade de Habilidades e Experiências
        </h1>
        <h3>Reunimos uma riqueza de habilidades e experiências de uma ampla gama de áreas, comprometidos com a excelência e inovação em nossa pesquisa.</h3>
      </section>
      <ContentPageMember/>
      <SectionJoinLafoca/>
    </main>
  );
}