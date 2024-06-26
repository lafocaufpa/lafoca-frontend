import styles from './CardSkill.module.css';

export default function CardSkill({name, icon}) {

  return (
    <div className={styles.cardSkill}>
      <img className={styles.cardSkillImg} src={icon} />

      <span className={styles.cardSkillName}>{name}</span>
    </div>
  );
}