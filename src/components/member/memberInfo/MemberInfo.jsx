import { useMember } from '@/contexts/member';
import styles from './MemberInfo.module.css';
import Link from 'next/link';
import Linkedin from '@images/socialMedia/linkedin.svg';
import Portifolio from '@images/socialMedia/portifolio.svg';
import Email from '@images/socialMedia/e-mail.svg';
import Image from 'next/image';
import SocialMedia from '@/components/member/socialMedia/SocialMedia';

export default function MemberInfo() {

  const member = useMember();

  return (
    <section className={styles.member}>
      <div className={styles.memberInfo}>
        <div className={styles.memberPhoto}>
          <Image src={member.urlPhoto} alt={member.name} width={196} height={196} quality={100}/>
        </div>
        <h1 className={styles.memberName}>{member.name}</h1>
        <p className={styles.memberDescription}>{member.description}</p>
        {/* <h1>{JSON.stringify(member)}</h1> */}
      </div>
      <div className={styles.memberSocialMedia}>
        <Link href={'/'}><SocialMedia icon={Email} name={'E-mail'} backgroundColor={'#E84A4A'}/></Link>

        <Link href={'/'}><SocialMedia icon={Linkedin} name={'Linkedin'} backgroundColor={'#4866B4'}/></Link>

        <Link 
          href={member.linkPortifolio} 
          target="_black"
          rel="noopener noreferrer"
        >
          <SocialMedia icon={Portifolio} name={'Portifolio'} backgroundColor={'#222'}/></Link>
        
        
        
      </div>
    </section>
  );
}