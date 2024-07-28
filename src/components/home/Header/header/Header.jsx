import styles from '@components/home/Header/header/Header.module.css';


export default function Header ({background, marginBotton, paddingBottom, as, children}) {
  const headerStyle = {
    backgroundImage: `url(${background})`,
    ...(marginBotton !== undefined && { marginBottom: `${marginBotton}rem` }),
    ...(paddingBottom !== undefined && { paddingBottom: `${paddingBottom}rem`})
  };

  return (
    <header className={`${styles.header} ${as === 'memberHeader' ? styles.memberHeader : ''}`} style={headerStyle}>
      <div className='global-container'>
        {children}
      </div>
    </header>
  );
}