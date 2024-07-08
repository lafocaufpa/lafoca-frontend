import styles from './MemberInfo.module.css';
import stylesMember from '@components/member/Member.module.css';
import Link from 'next/link';
import Linkedin from '@images/socialMedia/linkedin.svg';
import Portifolio from '@images/socialMedia/portifolio.svg';
import Email from '@images/socialMedia/e-mail.svg';
import Image from 'next/image';
import userDefault from '@images/default_user.png';
import SocialMedia from '@/components/member/socialMedia/SocialMedia';
import { useState } from 'react';

export default function MemberInfo({ member }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [nameEmail, setNameEmail] = useState('E-mail');

  const copyEmailToClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(member?.email)
      .then(() => {
        setCopySuccess(true);
        setNameEmail('E-mail copiado');
        setTimeout(() => {
          setCopySuccess(false);
          setNameEmail('E-mail');
        }, 2000);
      })
      .catch(() => {  
        setCopySuccess(false);
        setNameEmail('Failed to copy');
      });
  };

  return (
    <section className={styles.member}>
      <div className={styles.memberInfo}>
        <div className={styles.memberPhoto}>
          <Image src={member?.urlPhoto || userDefault} alt={member?.fullName} width={196} height={196} quality={100} />
        </div>
        <h1 className={stylesMember.globalPageMemberTitle}>{member?.fullName}</h1>
        <p className="global__paragraph">{member?.description}</p>
      </div>

      <div className={styles.memberSocialMedia}>
        
        {(!member?.linkLinkedin) && <Link 
          href={''} 
          rel="noopener noreferrer" 
          onClick={copyEmailToClipboard}
        >
          <SocialMedia icon={Email} name={nameEmail} backgroundColor={'#E84A4A'}/>
        </Link>}

        {member?.linkLinkedin && (
          <Link 
            href={member?.linkLinkedin} 
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialMedia icon={Linkedin} name={'Linkedin'} backgroundColor={'#4866B4'}/>
          </Link>
        )}

        {member?.linkPortifolio && (
          <Link 
            href={member?.linkPortifolio} 
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialMedia icon={Portifolio} name={'Portifolio'} backgroundColor={'#222'}/>
          </Link>
        )}

      </div>
    </section>
  );
}
