'use client';
import Search from '@components/search/Search';
import LineOfResearchSelect from '@components/lineOfResearchSelect/LineOfResearchSelect';
import styles from './SearchView.module.css';
import YearSelect from '@/components/lineOfResearchSelect/YearSelect';
import FunctionSelect from '@components/functionSelect/FunctionSelect';
import SkillSelect from '@components/skillSelect/SkillSelect';

export default function SearchView({lineOfResearch, functionSelect, searchTerm, setSearchTerm, skillId, setSkillId, skillSelect, loadOptions, lineId, setLineId, year, setYear, functionId, setFunctionId, onGoing, setOnGoing, as}) {
  return (
    <section className={styles.container}>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.lineOfResearchContainer}>
        {lineOfResearch && <LineOfResearchSelect
          loadOptions={loadOptions}
          placeholder="Filtrar por linha de pesquisa" 
          isSearchable={false}
          value={lineId}
          onChange={setLineId}
          additionalProps={{ page: 0 }}
          id="lineId"
          required
        /> }

        {skillSelect && 
        <SkillSelect 
          loadOptions={loadOptions}
          placeholder="Filtrar por habilidade" 
          value={skillId} 
          isSearchable={false}
          onChange={setSkillId}
          additionalProps={{ page: 0 }}
          id="skillId"
          required/>
        }

        {functionSelect && <FunctionSelect 
          loadOptions={loadOptions}
          placeholder="Filtrar por função no grupo" 
          value={functionId}
          isSearchable={false}
          onChange={setFunctionId}
          additionalProps={{ page: 0 }}
          id="functionId"
          required
        />}
        
        <YearSelect
          placeholder="Filtrar por ano"
          value={year}
          onChange={setYear} 
          isSearchable={false}
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