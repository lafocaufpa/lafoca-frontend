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
  const [year, setYear] = useState(null);
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

  const fetchArticles = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '', year = '') => {
    try {
      resultsPerPage = resultsPerPage ?? 5;
      const data = await articleService.list(page, resultsPerPage, undefined, searchTerm, lineOfResearchId, year);
      setArticles(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, resultsPerPage, searchTerm, lineId?.value, year?.value);
  }, [currentPage, resultsPerPage, searchTerm, lineId, year]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      document.querySelector(`.${styles.sectionMain}`).scrollIntoView({ behavior: 'smooth' });
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
      <SectionMainHeader
        titlePage={'Artigos Publicados'}
        descriptionPage={'Explore os artigos publicados pelos pesquisadores do grupo LAFocA, um centro dedicado ao ensino focado no aluno. Nossa produção acadêmica abrange diversas áreas do conhecimento, refletindo a interdisciplinaridade e a inovação que caracterizam nossas pesquisas. De metodologias educacionais a avanços tecnológicos, nossos artigos são contribuições significativas para a comunidade acadêmica. Mantenha-se atualizado com nossas descobertas e leia sobre os tópicos mais relevantes e atuais em nossas publicações.'}
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
