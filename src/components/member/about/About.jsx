import stylesMember from '@components/member/Member.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/icon-about.svg';

export default function About ({member}) {

  return (
    <section className={`${stylesMember.globalPageMemberSection}`}>
      <h1 className={stylesMember.globalPageMemberTitle}>Sobre</h1>
      <p>{member?.biography}</p>
      <CardInfo icon={Icon} title={member?.functionMember.firstName} description={member?.functionMember?.description}/>
    </section>
  );
}