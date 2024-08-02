import stylesMember from '@components/member/Member.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/function.png';
import styles from './About.module.css';

export default function About ({member}) {

  return (
    <section className={`${stylesMember.globalPageMemberSection} ${styles.container}`}>
      <h1 className={`${styles.title}`}>Sobre</h1>
      <p className={styles.biography}>{member?.biography}</p>
      <CardInfo icon={Icon} title={member?.functionMember?.name} description={member?.functionMember?.description}/>
    </section>
  );
}