import stylesMember from '@/components/member/Member.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/project.png';

export default function Projects({member}) {

  return (
    <section className={stylesMember.globalPageMemberSection}>
      <h1 className={stylesMember.globalPageMemberTitle}> Atuação em Projetos</h1>
      {member.projects.map((p) => <CardInfo key={p.id} icon={Icon} title={p.title} description={p.type}/> )}
    </section>
  );
}