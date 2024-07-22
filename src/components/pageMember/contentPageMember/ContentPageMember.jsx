'use client';

import { MemberService } from '@/services/api/Members/MembersService';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import url from '@/routes/url';
import AlertMessage from '@/components/notification/AlertMessage';
import useNotification from '@/components/notification/useNotification';
import AsyncSelect from '@/components/asyncSelectV2/AsyncSelect';
import { classService } from '@/services/api/yearClass/YearClasses';
import Pagination from '@/components/pagination/PaginationView';
import SearchView from '@/components/viewer/SearchView';
import CardSlider from '@/components/home/Main/Team/CardSlider/CardSlider-v2';
import styles from './ContentPageMember.module.css';

export default function ContentPageMember() {

  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(12);
  const [yearClassId, setYearClassId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const [error, showError, hideError] = useNotification(null);
  const [successMessage, showSuccessMessage, hideSuccessMessage] = useNotification(null);

  const router = useRouter();
  const deleteButtonRef = useRef(null);

  const fetchData = async (page = 0, resultsPerPage = 10, fullName = '', yearClassId = '') => {
    try {
      const data = await MemberService.list(page, resultsPerPage, 'fullName,asc', fullName, yearClassId);
      setMembers(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      showError(error?.userMessage || 'Erro ao buscar membros.');
    }
  };

  useEffect(() => {
    fetchData(currentPage, resultsPerPage, searchTerm, yearClassId?.value);
  }, [currentPage, resultsPerPage, searchTerm, yearClassId]);

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
      // document.querySelector(`.${styles.sectionMain}`).scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className={styles.sectionContentPageMember}>
      <SearchView
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loadOptions={loadOptions}
        year={yearClassId}
        setYear={setYearClassId}
      />

      <div className={styles.gridContainer}>
        {members.map((member, index) => (
          <CardSlider key={index} member={member} height={302} viewAll={true}/>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        getResultMessage={getResultMessage}
      />
    </section>
  );
}