'use client';

import { useState, useEffect } from 'react';
import Search from '@/components/search/Search';
import styles from './ArticlesMain.module.css';
import { linesOfResearchService } from '@/services/api/linesOfResearch/LinesOfResearchService';
import Article from '@components/articles/article/Article';
import Line from '@images/icons/line.svg';
import { articleService } from '@/services/api/article/ArticleService';
import LineOfResearchSelect from '@/components/lineOfResearchSelect/LineOfResearchSelect';
import Image from 'next/image';
import Pagination from '@/components/pagination/PaginationView';

export default function ArticlesMain() {
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
      const data = await articleService.list(page, resultsPerPage, 'title,asc', searchTerm, lineOfResearchId);
      setArticles(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
      if(lineOfResearchId != 0){
        setCurrentPage(0);
      }
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

  const handleResultsPerPageChange = (event) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} artigos de ${totalResults} resultados`;
  };

  return (
    <main className='global-container'>
      <section className={`${styles.container}`}>
        <h1>Artigos Publicados</h1>
        <p>Todos os artigos publicados pelo grupo de pesquisa LA FocA</p>
      </section>
      <section>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className={styles.lineOfResearchContainer}>
          <LineOfResearchSelect
            loadOptions={loadOptions}
            placeholder="Filtrar por linha de pesquisa"
            service={linesOfResearchService}
            value={lineId}
            onChange={setLineId}
            additionalProps={{ page: 0 }}
            id="lineId"
            required
          />
        </div>
      </section>
      <section className={styles.sectionMain}>
        <h2 className={styles.title}>{lineId?.label || 'Todos os artigos publicados'}</h2>
        <Image src={Line} alt='' />
        {articles?.map((article) =>
          <Article key={article?.id} article={article} />
        )}
      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        getResultMessage={getResultMessage}
      />
    </main>
  );
}
