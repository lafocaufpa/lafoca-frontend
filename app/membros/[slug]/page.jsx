'use client';

import { useEffect, useState } from 'react';
import LoadingPage from '@/components/loading/LoadingPage';
import MemberPage from '@components/member';
import { MemberService } from '@services/api/Members/MembersService';

async function readMemberBySlug(slug) {
  try {
    const response = await MemberService.readBySlug(slug);
    return response;
  } catch (error) {
    console.error('Erro ao buscar membros: ', error);
    return null;
  }
}

export default function Member({ params }) {
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();

    const fetchMember = async () => {
      const memberData = await readMemberBySlug(params.slug);
      setMember(memberData);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = 2000 - elapsedTime;

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime > 0 ? remainingTime : 0);
    };

    fetchMember();
  }, [params.slug]);

  return (
    <>
      {isLoading ? <LoadingPage /> : <MemberPage member={member} />}
    </>
  );
}
