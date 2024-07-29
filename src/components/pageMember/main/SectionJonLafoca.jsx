import styles from './SectionJoinLafoca.module.css';
import Icon4frame from '@/components/icon/Icon4frame';
export default function SectionJoinLafoca() {
  return (
    <div className={styles.section}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>
          <span>JUNTE-SE AO LAFOCA: </span>OPORTUNIDADE PARA NOVOS PESQUISADORES
        </h2>
        <p className={styles.description}>
          Você é um aluno apaixonado por pesquisa? O La FocA está recrutando novos membros. Venha contribuir para projetos
          inovadores e desenvolva suas habilidades em uma equipe dinâmica e diversificada.
        </p>
      </div>
      <div className={styles.iconContainer}>
        <Icon4frame />
      </div>
    </div>
  );
}