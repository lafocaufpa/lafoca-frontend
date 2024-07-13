'use client';
import Search from '@components/search/Search';
import LineOfResearchSelect from '@components/lineOfResearchSelect/LineOfResearchSelect';
import styles from './SearchView.module.css';
import YearSelect from '@/components/lineOfResearchSelect/YearSelect';

export default function SearchView({searchTerm, setSearchTerm, loadOptions, lineId, setLineId, year, setYear, onGoing, setOnGoing, as}) {
  return (
    <section>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.lineOfResearchContainer}>
        <LineOfResearchSelect
          loadOptions={loadOptions}
          placeholder="Filtrar por linha de pesquisa"
          value={lineId}
          onChange={setLineId}
          additionalProps={{ page: 0 }}
          id="lineId"
          required
        />
        <YearSelect
          placeholder="Filtrar por ano"
          value={year}
          onChange={setYear}
          id="year"
        />
        {as == 'checkbox' && 
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="onGoing"
            checked={onGoing}
            onChange={(e) => setOnGoing(e.target.checked)}
          />
          <label htmlFor="onGoing">Mostrar apenas projetos em andamento</label>
        </div>
        }
      </div>
    </section>
  );
}