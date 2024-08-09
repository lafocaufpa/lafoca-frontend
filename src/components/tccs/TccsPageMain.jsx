'use client';

import { useState, useEffect } from 'react';
import stylesSearchView from '@components/viewer/SearchView.module.css';
import Pagination from '@/components/pagination/PaginationView';
import { tccService } from '@/services/api/tcc/TccService';
import SectionMainHeader from '@components/viewer/SectionMainHeader';
import SearchView from '@components/viewer/SearchView';
import SectionMain from '@components/viewer/section/SectionMain';
import LoadingSection from '@/components/loading/LoadingSection';

export default function TccsPageMain() {
  const [lineId, setLineId] = useState(null);
  const [year, setYear] = useState(null);
  const [objs, setObjs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
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

  const fetchArticles = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '', year) => {
    setIsFetching(true);
    try {
      resultsPerPage = resultsPerPage ?? 5;
      const data = await tccService.list(page, resultsPerPage, undefined, searchTerm, lineOfResearchId, year);
      setObjs(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      console.error('Erro ao buscar TCCs:', error);
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
    setCurrentPage(0);
  }, [lineId, searchTerm, year]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      document.querySelector(`.${stylesSearchView.container}`).scrollIntoView({ behavior: 'instant' });
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} TCCs de ${totalResults} resultados`;
  };

  return (
    <>
      <SectionMainHeader
        titlePage={'TCC'}
        descriptionPage={'Cada Trabalho de Conclusão de Curso (TCC) representa um marco na jornada acadêmica dos nossos alunos, abordando uma variedade de temas que vão desde a educação até ciências exatas e sociais. Acesse os TCCs para conhecer as ideias inovadoras e as contribuições significativas dos nossos futuros profissionais.'}
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
            label={'Todos os TCCs'}
            type={'tcc'}
            objs={objs}
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
  );
}
