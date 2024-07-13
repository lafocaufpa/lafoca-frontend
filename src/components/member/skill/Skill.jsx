import styles from './Skill.module.css';
import stylesMember from '@components/member/Member.module.css';
import CardSkill from '@/components/member/skill/cardSkill/CardSkill';

export default function Skill({member}) {

  const sortedSkills = member?.skills.sort((a, b) => b.name.length - a.name.length);


  return (
    <section className={`${styles.memberContainerSkill} ${stylesMember.globalPageMemberSection}`}>
      <h1 className={stylesMember.globalPageMemberTitle}>Habilidades</h1>
      <div className={styles.skills}>
        {sortedSkills?.map((skill, index) => (
          <CardSkill key={index} name={skill.name} icon={skill.skillPictureUrl} />
        ))}
      </div>
    </section>
  );
}