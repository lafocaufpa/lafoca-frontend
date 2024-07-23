import React, { useState } from 'react';
import IconLessThan from '@images/icons/lessThan.svg';
import IconGreaterThan from '@images/icons/greaterThan.svg';
import styles from './Pagination.module.css';
import Image from 'next/image';

const PaginationView = ({ currentPage, totalPages, onPageChange, getResultMessage }) => {
  const [inputPage, setInputPage] = useState(currentPage + 1);
  const maxPagesToShow = 5;

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
      setInputPage(page + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 0);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={currentPage === i ? styles.liActive : ''}>
          <button className={styles.paginationListButton} onClick={() => handlePageChange(i)}>
            {i + 1}
          </button>
        </li>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <li key="ellipsis" className={styles.ellipsis}>
          ...
        </li>
      );
      pages.push(
        <li key={totalPages - 1} className={currentPage === totalPages - 1 ? styles.liActive : ''}>
          <button className={styles.paginationListButton} onClick={() => handlePageChange(totalPages - 1)}>
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagContainer}>
      <nav className={styles.navContainer}>
        <ul className={styles.pagination}>
          <li className={currentPage === 0 ? styles.liDisabled : ''}>
            <Image className={styles.buttonPrevious} src={IconLessThan} width={15} height={15} onClick={() => handlePageChange(currentPage - 1)} />
          </li>
          {renderPageNumbers()}
          <li className={currentPage === totalPages - 1 ? styles.liDisabled : ''}>
            <Image className={styles.buttonNext} src={IconGreaterThan} width={15} height={15} onClick={() => handlePageChange(currentPage + 1)} />
          </li>
        </ul>
      </nav>
      <div className={styles.resultMessage}>{getResultMessage()}</div>
    </div>
  );
};

export default PaginationView;
