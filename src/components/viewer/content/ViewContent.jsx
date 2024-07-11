import { useState } from 'react';
import styles from './ViewContent.module.css';
import Link from 'next/link';

export default function ViewContent({ obj }) {
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  const abstractToShow = showFullAbstract ? obj?.articleAbstract : obj?.articleAbstract.substring(0, 300);
  const showButton = obj?.articleAbstract.length > 300;
  return (
    <div className={styles.articleContainer}>
      <div className={styles.dateAndResearch}>
        <p>{obj?.year || obj.date }</p>
        <div className={styles.researchLines}>
          {obj?.linesOfResearch.map(line => (
            <p key={line.id}>{line.name}</p>
          ))}
        </div>
      </div>
      <div className={styles.articleDetails}>
        <Link className={styles.articleUrl} href={obj?.url}>
          <h2 className={styles.articleTitle}>{obj?.title}</h2>
        </Link>
        <p className={styles.articleJournal}>{obj?.journal}</p>
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
