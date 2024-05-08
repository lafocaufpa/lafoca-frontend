import MemberInfo from '@components/member/memberInfo/MemberInfo';
import About from '@components/member/about/About';
import Skill from '@components/member/skill/Skill';
import Tcc from '@/components/member/tcc/Tcc';
import Projects from '@/components/member/projects/Projects';
import Articles from '@/components/member/articles/Articles';

export default function Main ({member}) {

  return (
    <main>
      <div className='global-container'>
        <MemberInfo member={member}/>
        <About member={member}/>
        <Skill member={member}/>
        <Tcc member={member}/>
        {member?.projects.length > 0 &&  <Projects member={member}/>}
        {member?.articles.length > 0 && <Articles member={member}/>}
      </div>
    </main>
  );  
}