import styles from './SocialMedia.module.css';
import Image from 'next/image';

export default function SocialMedia({name, backgroundColor, icon}) {
  const buttonStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <button style={buttonStyle} className={styles.buttonMedia}>
      <Image className={styles.img} src={icon} alt={name} width={24} height={24} />
      <span className={styles.buttonName}>{name}</span>
    </button>
  );
}