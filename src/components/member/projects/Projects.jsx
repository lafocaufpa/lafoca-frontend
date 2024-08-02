import stylesMember from '@/components/member/Member.module.css';
import styles from './Projects.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/project.png';

export default function Projects({member}) {

  const formatResearchLines = (linesOfResearch) => {
    return linesOfResearch
      .map((line) => line.name)
      .join(', ');
  };

  return (
    <section className={`${stylesMember.globalPageMemberSection} ${styles.container}`}>
      <h1> Atuação em Projetos</h1>
      <div className={styles.containerCard}>
        {member.projects.map((p) => (
          <CardInfo
            key={p.id}
            icon={Icon}
            title={p.title}
            description={formatResearchLines(p.linesOfResearch)}
          />
        ))}
      </div>
    </section>
  );
}