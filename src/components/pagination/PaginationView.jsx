import React, { useState } from 'react';
import IconLessThan from '@images/icons/lessThan.svg';
import IconGreaterThan from '@images/icons/greaterThan.svg';

import styles from './Pagination.module.css';
import Image from 'next/image';

const PaginationView = ({ currentPage, totalPages, onPageChange, getResultMessage }) => {
  const [inputPage, setInputPage] = useState(currentPage + 1);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
      setInputPage(page + 1);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputPage(value);

    const page = parseInt(value, 10) - 1;
    if (!isNaN(page) && page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagContainer}>
      <nav className={styles.navContainer}>
        <ul className={`${styles.pagination} `}>
          <li className={`${currentPage === 0 ? styles.liDisabled : ''}`}>
            <Image className={styles.buttonPrevious} src={IconLessThan} width={15} height={15} onClick={() => handlePageChange(currentPage - 1)}/>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`${currentPage === index ? styles.liActive : ''}`}>
              <button className={styles.paginationListButton} onClick={() => handlePageChange(index)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`${currentPage === totalPages - 1 ? styles.liDisabled : ''}`}>
          
            <Image className={styles.buttonNext} src={IconGreaterThan} width={15} height={15} onClick={ () => handlePageChange(currentPage + 1)}/>
          </li>
        </ul>
        {/* <div className={styles.paginationGoTo}>
          <p>Ir para a página</p>
          <input
            type="number"
            className={styles.paginationInput}
            value={inputPage}
            onChange={handleInputChange}
            style={{ width: '60px' }}
          />
        </div> */}
      </nav>
      <div className={styles.resultMessage}>{getResultMessage()}</div>
      
    </div>
  );
};

export default PaginationView;
