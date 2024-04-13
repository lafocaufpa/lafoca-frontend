import MemberPage from '@components/member';
import {MemberService} from '@services/api/Members/MembersService';

async function getMember(slug) {
  try {
    const response = await MemberService.list(slug);
    return response;
  } catch (error) {
    console.error('Erro ao buscar membros: ', error);
  }
}

export default async function Member ({params}) {

  const member = await getMember(params.slug);
  
  return (
    <>
      <MemberPage member={member}/>
    </>
  );
}