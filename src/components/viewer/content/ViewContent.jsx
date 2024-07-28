import React, { useState } from 'react';
import styles from './ViewContent.module.css';
import Link from 'next/link';
import urlRoutes from '@/routes/url';

export default function ViewContent({ text, title, linesOfResearch, date, url, journal, endDate, type, modality, members, tccOwner}) {
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  const abstractToShow = showFullAbstract ? text : text?.substring(0, 300);
  const showButton = text?.length > 300;

  const displayDate = type === 'project'
    ? `${date} - ${endDate ? endDate : 'atual'}`
    : date;

  return (
    <div className={styles.articleContainer}>
      <div className={styles.dateAndResearch}>
        <p>{displayDate}</p>
        {modality && <p>{modality}</p>}
        <div className={`${styles.researchLines} ${styles.displayBlock}`}>
          {linesOfResearch.map(line => (
            <p key={line.id}>{line.name}</p>
          ))}
        </div>
        <div className={`${styles.researchLines} ${styles.displayNone}`}>
          <p>{linesOfResearch.map(line => line.name).join(', ')}</p>
        </div>
      </div>
      <div className={styles.articleDetails}>
        {url ? (
          <Link className={`${styles.articleUrl} ${styles.item}`} href={url} target='_blank' rel="noreferrer">
            <h2 className={styles.articleTitle} style={{textDecoration:'underline'}}>{title}</h2>
          </Link>
        ) : (
          <h2 className={`${styles.articleTitle} ${styles.item} `}>{title}</h2>
        )}
        {journal && <p className={`${styles.articleJournal} ${styles.item}`}>{journal}</p>}
        {journal && <p className={`${styles.articleJournalMobile} ${styles.articleJournal} ${styles.item}`}>{`${journal}, ${displayDate}`}</p>}

        {members && (
          <div style={type === 'article' ? {order: '1'} : {}} className={`${styles.subtitle} ${type === 'project' ? styles.projectMembers: ''} ${styles.item}`}>
            {members.map((member, index) => (
              <React.Fragment key={index}>
                {member.slug ? (
                  <Link href={urlRoutes.membros.buscarPeloSlug(member.slug)} className={styles.linkName}>
                    {member.name}
                  </Link>
                ) : (
                  <span className={styles.subtitle}>{member.name}</span>
                )}
                {index !== members.length - 1 && ', '}
              </React.Fragment>
            ))}
          </div>
        )}
        <p className={`${styles.renderDateBasedScreen} ${type === 'project' ? styles.project : ''} ${styles.item}`}>{displayDate}</p>
        <p className={`${styles.renderDateBasedScreen} ${type === 'tcc' ? styles.tcc : ''} ${styles.item}`}>{displayDate}</p>

        {modality && <p className={`${styles.projectModality}`}>{modality}</p>}
        {tccOwner && (
          <Link href={urlRoutes.membros.buscarPeloSlug(tccOwner.slugMember)} className={`${styles.linkName} ${styles.item}`}>
            {tccOwner.nameMember}
          </Link>
        )}
        <p className={`${styles.articleAbstract} ${styles.item}`}>{abstractToShow}{!showFullAbstract && '...'}</p>
        {showButton && (
          <button
            className={`${styles.showMoreButton} ${styles.item}`}
            onClick={() => setShowFullAbstract(!showFullAbstract)}
          >
            {showFullAbstract ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </div>
    </div>
  );
}
