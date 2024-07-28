import React from 'react';
import styles from './LoadingPage.module.css';
import Logo from '@components/header/logo/Logo';

export default function LoadingPage() {
  return (
    <div className={styles.fullscreen}>
      <div className={styles.logo}>
        <Logo/>
      </div>
    </div>
  );
}
