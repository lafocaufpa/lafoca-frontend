'use client';

import { useState, useEffect } from 'react';
import styles from '@components/viewer/section/SectionMain.module.css';
import Pagination from '@/components/pagination/PaginationView';
import SectionMainHeader from '@/components/viewer//SectionMainHeader';
import SearchView from '@/components/viewer/SearchView';
import { projectsService } from '@/services/api/Projects/ProjectsService';
import SectionMain from '@components/viewer/section/SectionMain';

export default function ViewPageMain() {
  const [lineId, setLineId] = useState(null);
  const [year, setYear] = useState(null);
  const [onGoing, setOnGoing] = useState(false);
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

  const fetchArticles = async (page = 0, resultsPerPage = 5, searchTerm = '', lineOfResearchId = '', year = '', onGoind = '') => {
    try {
      resultsPerPage = resultsPerPage ?? 5;
      const data = await projectsService.list(page, resultsPerPage, 'title,asc', searchTerm, lineOfResearchId, year, onGoind);
      setObjs(data.content);
      setTotalPages(data.totalPages);
      setTotalResults(data.totalElements);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage, resultsPerPage, searchTerm, lineId?.value, year?.value, onGoing);
  }, [currentPage, resultsPerPage, searchTerm, lineId, year, onGoing]);

  useEffect(() => {
    setCurrentPage(0);
  }, [lineId, searchTerm, year,onGoing]);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      document.querySelector(`.${styles.sectionMain}`).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getResultMessage = () => {
    const start = currentPage * resultsPerPage + 1;
    const end = Math.min((currentPage + 1) * resultsPerPage, totalResults);
    return `Exibindo ${start} a ${end} projetos de ${totalResults} resultados`;
  };

  return (
    <main className='global-container'>
      <SectionMainHeader titlePage={'Projetos Realizados'} 
        descriptionPage={'Conheça os projetos desenvolvidos pelo grupo de pesquisa LAFocA. Nossa equipe está constantemente envolvida em projetos que buscam soluções práticas e inovadoras para diversos desafios. Desde projetos voltados à educação até iniciativas em áreas como tecnologia, meio ambiente e saúde, nosso trabalho visa promover o desenvolvimento e a aplicação do conhecimento. Explore nossos projetos e veja como estamos fazendo a diferença através de pesquisa aplicada e colaboração interdisciplinar.'}/>
      <SearchView 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        loadOptions={loadOptions}
        lineOfResearch={true}
        lineId={lineId} 
        setLineId={setLineId} 
        year={year} 
        setYear={setYear} 
        onGoing={onGoing} 
        setOnGoing={setOnGoing} 
        as={'checkbox'}
      />
      <SectionMain lineId={lineId} label={'Todos os projetos realizados'} type={'project'} objs={objs}/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        getResultMessage={getResultMessage} 
      />
    </main>
  );
}
