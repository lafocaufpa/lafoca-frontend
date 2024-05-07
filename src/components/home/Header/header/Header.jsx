import styles from '@components/home/Header/header/Header.module.css';


export default function Header ({background, marginBotton, paddingBottom, children}) {
  const headerStyle = {
    backgroundImage: `url(${background})`,
    ...(marginBotton !== undefined && { marginBottom: `${marginBotton}rem` }),
    ...(paddingBottom !== undefined && { paddingBottom: `${paddingBottom}rem`})
  };

  return (
    <header className={styles.header} style={headerStyle}>
      <div className='global-container'>
        {children}
      </div>
    </header>
  );
}