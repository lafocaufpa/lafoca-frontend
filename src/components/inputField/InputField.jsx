import React from 'react';

const InputField = ({ label, type, id, value, onChange, onBlur, required, maxLength, as }) => (
  <div className="form-group mb-3">
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
    )}
  </div>
);

export default InputField;
