import styles from './SectionMain.module.css';
import Line from '@images/icons/line.svg';
import Image from 'next/image';
import ViewContent from '@components/viewer/content/ViewContent';

export default function SectionMain ({lineId, label, objs, type}) {
  return (
    <section className={styles.sectionMain}>
      <h2 className={styles.title}>{lineId?.label || label}</h2>
      <Image src={Line} alt='' />
      {objs?.map((obj) =>
        <ViewContent 
          key={obj?.id} 
          text={obj?.abstractText} 
          title={obj?.title} 
          date={obj?.date} 
          journal={obj?.journal}
          url={obj?.url} 
          endDate={obj?.endDate} 
          type={type} 
          modality={obj?.modality} 
          members={obj?.members} 
          linesOfResearch={obj?.linesOfResearch} 
          tccOwner={obj.nameMember && obj.slugMember ? { nameMember: obj.nameMember, slugMember: obj.slugMember } : null}
        />
      )}
    </section>
  );
}