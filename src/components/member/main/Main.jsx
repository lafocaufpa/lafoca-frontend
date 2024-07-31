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
        {member?.biography?.length > 0 && <About member={member}/>}
        {member?.skills?.length > 0 && <Skill member={member}/>}
        {member?.tcc?.length > 0 && <Tcc member={member}/>}
        {member?.projects?.length > 0 &&  <Projects member={member}/>}
        {member?.articles?.length > 0 && <Articles member={member}/>}
      </div>
    </main>
  );  
}