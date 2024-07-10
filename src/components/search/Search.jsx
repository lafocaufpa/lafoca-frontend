'use client';

import React, { useState } from 'react';
import IconBsSearch from '@components/icon/IconBsSearch';
import IconClose from '@components/icon/IconClose';
import styles from './Search.module.css';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className={styles.searchContainer}>
      <IconBsSearch className={styles.searchIcon} />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Buscar por título"
        className={styles.searchInput}
      />
      {searchValue && <IconClose className={styles.clearIcon} onClick={handleClear} />}
    </div>
  );
}
