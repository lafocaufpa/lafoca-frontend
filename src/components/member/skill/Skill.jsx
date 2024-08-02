import stylesMember from '@components/member/Member.module.css';
import CardSkill from '@/components/member/skill/cardSkill/CardSkill';
import styles from './Skill.module.css';

export default function Skill({member}) {

  const sortedSkills = member?.skills?.sort((a, b) => b.name.length - a.name.length);


  return (
    <section className={`${stylesMember.globalPageMemberSection} ${styles.container} `}>
      <h1>Habilidades</h1>
      <div className={styles.containerCard}>
        {sortedSkills?.map((skill, index) => (
          <CardSkill key={index} name={skill.name} icon={skill.skillPictureUrl} />
        ))}
      </div>
    </section>
  );
}