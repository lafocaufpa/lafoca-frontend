import React, { useState } from 'react';
import styles from './ViewContent.module.css';
import Link from 'next/link';
import urlRoutes from '@/routes/url';

export default function ViewContent({ text, title, linesOfResearch, date, url, journal, endDate, type, modality, members, tccOwner}) {
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  const abstractToShow = showFullAbstract ? text : text.substring(0, 300);
  const showButton = text.length > 300;

  const displayDate = type === 'project'
    ? `${date} - ${endDate ? endDate : 'atual'}`
    : date;

  return (
    <div className={styles.articleContainer}>
      <div className={styles.dateAndResearch}>
        <p>{displayDate}</p>
        {modality && <p>{modality}</p>}
        <div className={styles.researchLines}>
          {linesOfResearch.map(line => (
            <p key={line.id}>{line.name}</p>
          ))}
        </div>
      </div>
      <div className={styles.articleDetails}>
        {url ? (
          <Link className={styles.articleUrl} href={url} target='_blank' rel="noreferrer">
            <h2 className={styles.articleTitle}>{title}</h2>
          </Link>
        ) : (
          <h2 className={styles.articleTitle}>{title}</h2>
        )}
        {members && (
          <div className={styles.subtitle}>
            {members.map((member, index) => (
              // eslint-disable-next-line react/jsx-no-undef
              <React.Fragment key={index}>
                {member.slug ? (
                  <Link href={urlRoutes.membros.buscarPeloSlug(member.slug)} className={styles.linkName}>
                    {member.name}
                  </Link>
                ) : (
                  <span  className={styles.subtitle}>{member.name}</span>
                )}
                {index !== members.length - 1 && ', '}
              </React.Fragment>
            ))}
          </div>
        )}
        {tccOwner && <Link href={urlRoutes.membros.buscarPeloSlug(tccOwner.slugMember)} className={styles.linkName}>
          {tccOwner.nameMember}
        </Link>}
        {journal && <p className={styles.articleJournal}>{journal}</p>}
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
