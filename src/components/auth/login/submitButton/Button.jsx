import React from 'react';
import styles from '@components/auth/login/submitButton/Button.module.css';
import IconLoading from '@components/icon/IconLoading';

const Button = ({ children, loading }) => (
  <button className={styles.button} type="submit" disabled={loading}>
    {loading ? <IconLoading /> : children}
  </button>
);

export default Button;
