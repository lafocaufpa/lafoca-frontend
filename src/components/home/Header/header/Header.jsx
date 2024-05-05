import styles from '@components/home/Header/header/Header.module.css';


export default function Header ({background, height, marginBotton, children}) {
  const headerStyle = {
    backgroundImage: `url(${background})`,
    // height: `${height}vw`,
    ...(marginBotton !== undefined && { marginBottom: `${marginBotton}rem` }),
  };

  return (
    <header className={styles.header} style={headerStyle}>
      <div className='global-container'>
        {children}
      </div>
    </header>
  );
}