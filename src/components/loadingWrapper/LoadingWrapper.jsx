import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingWrapper = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
