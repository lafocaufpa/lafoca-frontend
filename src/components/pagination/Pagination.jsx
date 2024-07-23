import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationBootstrap from '@components/admin/pagination/PaginationBootstrap';
const Pagination = ({ currentPage, totalPages, onPageChange, getResultMessage }) => {
  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <PaginationBootstrap
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className="result-message">{getResultMessage()}</div>
    </div>
  );
};

export default Pagination;
