import styles from './ButtonLink.module.css';
import IconLink from '@images/icons/icon-link.svg';
import Image from 'next/image';

export default function ButtonLink() {
  return (
    <span className={styles.buttonLink}>
      <Image src={IconLink} alt=''/>
      <p>Ver Online</p>
    </span>
  );
}