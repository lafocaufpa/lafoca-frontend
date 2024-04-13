import styles from './Header.module.css';

export default function Header ({background, height, children}) {
  return (
    <header className={styles.header} style={{ backgroundImage: `url(${background})`, height: `${height}vw` }}>
      <div className='global-container'>
        {children}
      </div>
      
    </header>
  );
}