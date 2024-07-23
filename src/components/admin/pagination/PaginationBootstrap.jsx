import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginationBootstrap = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 0);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>
            {i + 1}
          </button>
        </li>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <li key="ellipsis" className="page-item">
          <span className="page-link">...</span>
        </li>
      );
      pages.push(
        <li key={totalPages - 1} className={`page-item ${currentPage === totalPages - 1 ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(totalPages - 1)}>
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous"
          >
            &laquo;
          </button>
        </li>
        {renderPageNumbers()}
        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationBootstrap;
