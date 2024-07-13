'use client';

import { useState, useEffect } from 'react';
import styles from '@components/viewer/section/SectionMain.module.css';
import { articleService } from '@/services/api/article/ArticleService';
import Pagination from '@/components/pagination/PaginationView';
import SectionMain from '@/components/viewer/section/SectionMain';
import SearchView from '@/components/viewer/SearchView';
import SectionMainHeader from '@/components/viewer/SectionMainHeader';

export default function  ArticlesMain() {
  const [lineId, setLineId] = useState(null);
  const [articles, setArticles] = useState([]);
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

  const fetchArticles = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '') => {
    try {
      resultsPerPage = resultsPerPage ?? 5;
      const data = await articleService.list(page, resultsPerPage, undefined, searchTerm, lineOfResearchId);
      setArticles(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, resultsPerPage, searchTerm, lineId?.value);
  }, [currentPage, resultsPerPage, searchTerm, lineId]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      document.querySelector(`.${styles.sectionMain}`).scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [lineId, searchTerm]);

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} artigos de ${totalResults} resultados`;
  };

  return (
    <main className='global-container'>
      <SectionMainHeader
        titlePage={'Artigos Publicados'}
        descriptionPage={'Todos os artigos publicados pelo grupo de pesquisa LA FocA'}
      />

      <SearchView
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        loadOptions={loadOptions} 
        lineId={lineId} 
        setLineId={setLineId}
      />
      <SectionMain 
        lineId={lineId} 
        label={'Todos os Artigos publicados'} 
        objs={articles}/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        getResultMessage={getResultMessage}
      />
    </main>
  );
}
