import styles from '@components/auth/login/submitButton/Button.module.css';

const Button = ({ children }) => (
  <button className={styles.button} type="submit">
    {children}
  </button>
);

export default Button;