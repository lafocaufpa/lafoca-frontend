import stylesMember from '@/components/member/Member.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/icon-about.svg';

export default function Projects({member}) {

  return (
    <section className={stylesMember.globalPageMemberSection}>
      <h1 className={stylesMember.globalPageMemberTittle}> Atuação em Projetos</h1>
      {member.projects.map((p) => <CardInfo key={p.projectId} icon={Icon} tittle={p.tittle} description={p.type}/> )}
    </section>
  );
}