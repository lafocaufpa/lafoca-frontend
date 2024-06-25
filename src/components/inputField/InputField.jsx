import React from 'react';

const InputField = ({ label, type, id, value, onChange, onBlur, required }) => (
  <div className="form-group mb-3">
    <label htmlFor={id} className="fw-bold mb-1">{label}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
    />
  </div>
);

export default InputField;
