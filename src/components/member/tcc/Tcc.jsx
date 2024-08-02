import CardInfo from '@/components/member/cardInfo/cardInfArticle/CardInfoArticle';
import IconTcc from '@images/icons/tcc.png';
import stylesMember from '@components/member/Member.module.css';
import styles from './Tcc.module.css';


export default function Tcc({member}) {
  
  return (
    member?.tcc && <section className={`${stylesMember.globalPageMemberSection} ${styles.container}`}>
      <h1>TCC</h1>
      <CardInfo icon={IconTcc} title={member?.tcc?.title} description={member?.tcc?.date} link={member?.tcc?.url} />
    </section>
  );
}