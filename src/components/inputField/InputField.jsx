import React from 'react';
import IconBsSearch from '@components/icon/IconBsSearch';

const InputField = ({ label, type, id, value, onChange, onBlur, required, maxLength, as, isSearch }) => (
  <div className="form-group mb-3 position-relative">
    <label htmlFor={id} className="fw-bold mb-1">{label}</label>
    {as === 'textarea' ? (
      <textarea
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        maxLength={maxLength}
        rows={5}
      />
    ) : (
      <div className="input-group">
        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          maxLength={maxLength}
        />
        {isSearch && (
          <span className="input-group-text">
            <IconBsSearch idth={20} height={20} />
          </span>
        )}
      </div>
    )}
  </div>
);

export default InputField;
