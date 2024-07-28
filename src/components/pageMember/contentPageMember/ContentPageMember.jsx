'use client';

import { useEffect, useState } from 'react';
import { MemberService } from '@/services/api/Members/MembersService';
import useNotification from '@/components/notification/useNotification';
import Pagination from '@/components/pagination/PaginationView';
import SearchView from '@/components/viewer/SearchView';
import CardSlider from '@/components/home/Main/Team/CardSlider/CardSlider-v2';
import styles from './ContentPageMember.module.css';
import stylesSearchView from '@components/viewer/SearchView.module.css';
import LoadingSection from '@/components/loading/LoadingSection';

export default function ContentPageMember() {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 12;
  const [yearClassId, setYearClassId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [functionId, setFunctionId] = useState(null);
  const [skillId, setSkillId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, showError, hideError] = useNotification(null);

  const fetchData = async (page = 0, resultsPerPage = 10, fullName = '', yearClassId = '', functionId, skillId) => {
    setIsFetching(true);
    try {
      const data = await MemberService.list(page, resultsPerPage, 'fullName,asc', fullName, yearClassId, functionId, skillId);
      setMembers(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar membros.');
    } finally {
      setTimeout(() => {
        setIsFetching(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm, yearClassId?.value, functionId?.value, skillId?.value);
  }, [currentPage, resultsPerPage, searchTerm, yearClassId, functionId, skillId]);

  const loadOptions = async (service, inputValue, loadedOptions, { page }) => {
    try {
      const response = await service.list(page, 5, undefined, inputValue);
      return {
        options: response.content.map(item => ({
          value: item.id,
          label: item.name || item.title || item.year,
        })),
        hasMore: !response.lastPage,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error('Error fetching options:', error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} membros de ${totalResults} resultados`;
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      document.querySelector(`.${stylesSearchView.container}`).scrollIntoView({ behavior: 'instant' });
    }
  };

  return (
    <section className={styles.sectionContentPageMember}>
      <>
        <SearchView
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loadOptions={loadOptions}
          functionId={functionId}
          functionSelect={true}
          skillSelect={true}
          setFunctionId={setFunctionId}
          year={yearClassId}
          setYear={setYearClassId}
          skillId={skillId}
          setSkillId={setSkillId}
        />

        {isFetching ? (
          <div><LoadingSection/></div>
        ) : (
          <>
            <div className={styles.gridContainer}>
              {members.map((member, index) => (
                <CardSlider key={index} member={member} height={302} viewAll={true} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              getResultMessage={getResultMessage}
            />
          </>
        )}
      </>
    </section>
  );
}
