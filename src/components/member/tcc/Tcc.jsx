import CardInfo from '@/components/member/cardInfo/CardInfo';
import IconTcc from '@images/icons/icon-about.svg';
import stylesMember from '@components/member/Member.module.css';

export default function Tcc({member}) {

  return (
    member?.tcc && <section className={stylesMember.globalPageMemberSection} style={{marginTop: '2.375rem'}}>
      <h1 className={stylesMember.globalPageMemberTitle}>TCC defendido</h1>
      <CardInfo icon={IconTcc} title={member?.tcc?.name} description={member?.tcc?.date} link={member?.tcc?.url} />
    </section>
  );
}