import React from 'react';
import styles from './LoadingPage.module.css';
import Logo from '@components/header/logo/Logo';

export default function LoadingSection() {
  return (
    <div className={styles.fullsection}>
      <div className={styles.logo}>
        <Logo/>
      </div>
    </div>
  );
}