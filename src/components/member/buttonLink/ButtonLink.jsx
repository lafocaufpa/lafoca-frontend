import styles from './ButtonLink.module.css';
import IconLink from '@images/icons/icon-link.svg';
import IconLinkWhite from '@images/icons/icon-link-white.svg';
import Image from 'next/image';

export default function ButtonLink({white, black}) {
  return (
    <span className={styles.buttonLink}>
      {white && <Image src={IconLinkWhite} alt=''/>}
      {black && <Image src={IconLink} alt=''/>}
    </span>
  );
}