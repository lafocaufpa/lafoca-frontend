'use client';

import styles from '@components/viewer/section/SectionMain.module.css';
import Pagination from '@/components/pagination/PaginationView';
import { tccService } from '@/services/api/tcc/TccService';
import { useEffect, useState } from 'react';
import SectionMainHeader from '@components/viewer/SectionMainHeader';
import SearchView from '@components/viewer/SearchView';
import SectionMain from '@components/viewer/section/SectionMain';

export default function TccsPageMain() {

  const [lineId, setLineId] = useState(null);
  const [year, setYear] = useState(null);
  const [objs, setObjs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

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

  const fetchArticles = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '', year) => {
    try {
      resultsPerPage = resultsPerPage ?? 5;
      const data = await tccService.list(page, resultsPerPage, undefined, searchTerm, lineOfResearchId, year);
      setObjs(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, resultsPerPage, searchTerm, lineId?.value, year?.value);
  }, [currentPage, resultsPerPage, searchTerm, lineId, year]);

  useEffect(() => {
    setCurrentPage(0);
  }, [lineId, searchTerm, year]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      document.querySelector(`.${styles.sectionMain}`).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} artigos de ${totalResults} resultados`;
  };

  return (
    <main className='global-container'>
      <SectionMainHeader 
        titlePage={'TCC'}
        descriptionPage={'Todos os Trabalhos de Conclusão de Curso realizados pelos membros do LA FocA'}
      />
      <SearchView
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        loadOptions={loadOptions} 
        lineId={lineId} 
        setLineId={setLineId} 
        year={year} 
        setYear={setYear}
      />
      <SectionMain 
        lineId={lineId} 
        label={'Todos'} 
        objs={objs}/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        getResultMessage={getResultMessage}
      />
    </main>
  );
}