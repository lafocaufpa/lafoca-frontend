import styles from './CardSkill.module.css';

export default function CardSkill({name}) {

  return (
    <div className={styles.cardSkill}>
      <img className={styles.cardSkillImg} src={`/assets/img/icons/skill/${name}.svg`} />

      
      <span className={styles.cardSkillName}>{name}</span>
    </div>
  );
}