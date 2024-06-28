'use client';

import React from 'react';

const AlertMessage = ({ type, message, onClose }) => {
  const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
  const alertMessage = message + ' Aguarde alguns segundos para surtir efeito';

  return (
    <div className={`alert ${alertClass} position-fixed top-0 end-0 m-4 shadow`} role="alert" style={{ zIndex: 9999 }}>
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">{alertMessage}</div>
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default AlertMessage;
