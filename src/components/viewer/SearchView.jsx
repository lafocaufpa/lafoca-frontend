'use client';
import Search from '@components/search/Search';
import LineOfResearchSelect from '@components/lineOfResearchSelect/LineOfResearchSelect';
import styles from './SearchView.module.css';

export default function SearchView({searchTerm, setSearchTerm, loadOptions, linesOfResearchService, lineId, setLineId}) {
  return (
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
  );
}