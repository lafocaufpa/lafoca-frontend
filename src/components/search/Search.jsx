'use client';

import IconBsSearch from '@components/icon/IconBsSearch';
import IconClose from '@components/icon/IconClose';
import styles from './Search.module.css';

export default function Search({searchTerm, setSearchTerm}) {

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className={styles.searchContainer}>
      <IconBsSearch className={styles.searchIcon} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por título"
        className={styles.searchInput}
      />
      {searchTerm && <IconClose className={styles.clearIcon} onClick={handleClear} />}
    </div>
  );
}
