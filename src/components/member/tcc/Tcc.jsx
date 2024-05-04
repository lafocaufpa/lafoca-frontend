import CardInfo from '@/components/member/cardInfo/CardInfo';
import IconTcc from '@images/icons/icon-about.svg';
import stylesMember from '@components/member/Member.module.css';

export default function Tcc({member}) {

  return (
    member?.tcc && <section className={stylesMember.globalPageMemberSection}>
      <h1 className={stylesMember.globalPageMemberTittle}>TCC defendido</h1>
      <CardInfo icon={IconTcc} tittle={member?.tcc?.name} description={member?.tcc?.date} />
    </section>
  );
}