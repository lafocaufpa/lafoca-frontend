'use client';

import classNames from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';

const Modal = ({ open, children }) => {
  return (
    <div
      className={classNames('modal fade', {
        show: open,
      })}
      style={{ display: open ? 'block' : 'none' }}
      id="modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden={!open}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">Escolha a foto</h5>
          </div>
          <div className="modal-body p-4">
            {children}
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Modal;
