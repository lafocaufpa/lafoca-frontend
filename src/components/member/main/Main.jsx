import MemberInfo from '@components/member/memberInfo/MemberInfo';
import About from '@components/member/about/About';
import Skill from '@components/member/skill/Skill';

export default function Main () {
  return (
    <main>
      <div className='global-container'>
        <MemberInfo/>
        <About/>
        <Skill/>
      </div>
    </main>
  );
}