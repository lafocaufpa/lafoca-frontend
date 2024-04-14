import stylesMember from '@components/member/Member.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/icon-about.svg';

export default function Articles({member}) {
  return (
    <section className={stylesMember.globalPageMemberSection}>
      <h1 className={stylesMember.globalPageMemberTittle}>
        Artigos Publicados
      </h1>
      {member.articles.map((a) => <CardInfo key={a.articleId} icon={Icon} tittle={a.name} description={a.journal} link={a.url}/> )}
     
    </section>
  );
}