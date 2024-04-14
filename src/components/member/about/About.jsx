import { useMember } from '@/contexts/member';
import stylesMember from '@components/member/Member.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/icon-about.svg';

export default function About () {

  const member = useMember();

  return (
    <section className={`${stylesMember.globalPageMemberSection}`}>
      <h1 className={stylesMember.globalPageMemberTittle}>Sobre</h1>
      <p>{member.biography}</p>
      <CardInfo icon={Icon} tittle={member.functionStudent.name} description={member.functionStudent.description}/>
    </section>
  );
}