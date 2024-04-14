import MemberInfo from '@components/member/memberInfo/MemberInfo';
import About from '@components/member/about/About';
import Skill from '@components/member/skill/Skill';
import Tcc from '@/components/member/tcc/Tcc';

export default function Main () {
  return (
    <main>
      <div className='global-container'>
        <MemberInfo/>
        <About/>
        <Skill/>
        <Tcc/>
      </div>
    </main>
  );
}