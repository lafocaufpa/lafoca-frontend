import stylesMember from '@components/member/Member.module.css';
import styles from './Articles.module.css';
import CardInfo from '@components/member/cardInfo/cardInfArticle/CardInfoArticle';
import Icon from '@images/icons/article.png';

export default function Articles({member}) {
  return (
    <section className={`${stylesMember.globalPageMemberSection} ${styles.container}`}>
      <h1>
        Artigos Publicados
      </h1>
      <div className={styles.containerCard}>
        {member.articles.map((a) => {
          const formattedTitle = `${a.journal}, ${a.date}`;
          return (    
            <CardInfo
              key={a.id}
              icon={Icon}
              title={a.title}
              description={formattedTitle}
              link={a.url}
            />
          );
        })}
      </div>
    </section>
  );
}