'use client';

import { useState, useEffect } from 'react';
import stylesSearchView from '@components/viewer/SearchView.module.css';
import { articleService } from '@/services/api/article/ArticleService';
import Pagination from '@/components/pagination/PaginationView';
import SectionMain from '@/components/viewer/section/SectionMain';
import SearchView from '@/components/viewer/SearchView';
import SectionMainHeader from '@/components/viewer/SectionMainHeader';
import LoadingPage from '@/components/loading/LoadingPage';
import LoadingSection from '@/components/loading/LoadingSection';

export default function ArticlesMain() {
  const [lineId, setLineId] = useState(null);
  const [year, setYear] = useState(null);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [isFetching, setIsFetching] = useState(false);

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

  const fetchArticles = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '', year = '') => {
    setIsFetching(true);
    try {
      const data = await articleService.list(page, resultsPerPage, undefined, searchTerm, lineOfResearchId, year);
      setArticles(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
    } finally {
      setTimeout(() => {
        setIsFetching(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, resultsPerPage, searchTerm, lineId?.value, year?.value);
  }, [currentPage, resultsPerPage, searchTerm, lineId, year]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      document.querySelector(`.${stylesSearchView.container}`).scrollIntoView({ behavior: 'instant' });
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [lineId, searchTerm, year]);

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} artigos de ${totalResults} resultados`;
  };

  return (
    <main className='global-container'>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <SectionMainHeader
            titlePage={'Artigos Publicados'}
            descriptionPage={'Explore os artigos publicados pelos pesquisadores do grupo LAFocA. Nossa produção acadêmica abrange diversas áreas, desde metodologias educacionais a avanços tecnológicos.'}
          />

          <SearchView
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            loadOptions={loadOptions} 
            lineOfResearch={true}
            lineId={lineId} 
            setLineId={setLineId} 
            year={year} 
            setYear={setYear} 
          />

          {isFetching ? (
            <div><LoadingSection/></div>
          ) : (
            <>
              <SectionMain 
                lineId={lineId} 
                label={'Todos os Artigos publicados'} 
                objs={articles} 
                type={'article'}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                getResultMessage={getResultMessage}
              />
            </>
          )}
        </>
      )}
    </main>
  );
}
