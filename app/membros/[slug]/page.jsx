import MemberPage from '@components/member';
import {MemberService} from '@services/api/Members/MembersService';

async function readMemberBySlug(slug) {
  try {
    console.log(slug);
    const response = await MemberService.readBySlug(slug);
    return response;
  } catch (error) {
    console.error('Erro ao buscar membros: ', error);
  }
}

export default async function Member ({params}) {

  const member = await readMemberBySlug(params.slug);
  
  return (
    <>
      <MemberPage member={member}/>
    </>
  );
}