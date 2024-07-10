import { useState } from 'react';
import styles from './Article.module.css';
import Link from 'next/link';

export default function Article({ article }) {
  const { title, journal, articleAbstract, url, linesOfResearch, slug } = article;
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  const abstractToShow = showFullAbstract ? articleAbstract : articleAbstract.substring(0, 300);
  const showButton = articleAbstract.length > 300;
  return (
    <div className={styles.articleContainer}>
      <div className={styles.dateAndResearch}>
        <p>{new Date(slug.split('-').slice(-1)).toLocaleDateString()}</p>
        <div className={styles.researchLines}>
          {linesOfResearch.map(line => (
            <p key={line.id}>{line.name}</p>
          ))}
        </div>
      </div>
      <div className={styles.articleDetails}>
        <Link className={styles.articleUrl} href={url}>
          <h2 className={styles.articleTitle}>{title}</h2>
        </Link>
        <p className={styles.articleJournal}>{journal}</p>
        <p className={styles.articleAbstract}>{abstractToShow}{!showFullAbstract && '...'}</p>
        {showButton && (
          <button 
            className={styles.showMoreButton}
            onClick={() => setShowFullAbstract(!showFullAbstract)}
          >
            {showFullAbstract ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </div>
    </div>
  );
}
