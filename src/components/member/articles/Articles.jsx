import stylesMember from '@components/member/Member.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/article.png';

export default function Articles({member}) {
  return (
    <section className={stylesMember.globalPageMemberSection}>
      <h1 className={stylesMember.globalPageMemberTitle}>
        Artigos Publicados
      </h1>
      {member.articles.map((a) => <CardInfo key={a.id} icon={Icon} title={a.title} description={a.journal} link={a.url}/> )}
     
    </section>
  );
}