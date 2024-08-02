'use client';

import styles from './CardInfoArticle.module.css';
import Image from 'next/image';
import Link from 'next/link';
import IconLink from '@images/icons/icon-link.svg';
import IconLinkWhite from '@images/icons/icon-link-white.svg';
import { useState, useEffect } from 'react';

export default function CardInfo({icon, title, description, link}) {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 480);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={styles.cardInfo} onClick={handleClick}>
      <div className={styles.containerImg}>
        <Image className={styles.img} src={icon} alt='icon'/>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardContent_title}>{title}</p>
        <p className={styles.cardContent_desc}>{description}</p>
      </div>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer" 
        className={styles.cardLink}
      >
        <span className={`${styles.buttonLinkWhite} ${styles.buttonLink}`}>
          <Image src={IconLinkWhite} alt='' />
        </span>
        <span className={`${styles.buttonLinkBlack} ${styles.buttonLink}`}>
          <Image src={IconLink} alt=''/>
        </span>
      </Link>
    </div>
  );
}
