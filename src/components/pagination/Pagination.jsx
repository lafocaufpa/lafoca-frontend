import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Pagination = ({ currentPage, totalPages, onPageChange, getResultMessage }) => {
  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
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
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index)}>
                {index + 1}
              </button>
            </li>
          ))}
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
      <div className="result-message">{getResultMessage()}</div>
    </div>
  );
};

export default Pagination;
