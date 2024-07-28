import Image from 'next/image';
import styles from './CardSkill.module.css';

export default function CardSkill({ name, icon }) {
  return (
    <div className={styles.cardSkill}>
      <Image className={styles.cardSkillImg} src={icon} alt={name} width={75} height={75} />
      <span className={`${styles.cardSkillName} ${name.length > 12 ? styles.skillNameFont: ''}`}>
        {name}
      </span>
    </div>
  );
}