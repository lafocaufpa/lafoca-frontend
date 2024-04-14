import styles from './Skill.module.css';
import stylesMember from '@components/member/Member.module.css';
import CardSkill from '@/components/member/skill/cardSkill/CardSkill';

export default function Skill({member}) {

  return (
    <section className={`${styles.memberContainerSkill} ${stylesMember.globalPageMemberSection}`}>
      <h1 className={stylesMember.globalPageMemberTittle}>Habilidades</h1>
      <div className={styles.skills}>
        {member.skills.map((skill, index) => (
          <CardSkill key={index} name={skill.name} />
        ))}
      </div>
    </section>
  );
}