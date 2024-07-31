import stylesMember from '@/components/member/Member.module.css';
import CardInfo from '@components/member/cardInfo/CardInfo';
import Icon from '@images/icons/project.png';

export default function Projects({member}) {

  // Função para transformar linesOfResearch em uma string separada por vírgulas
  const formatResearchLines = (linesOfResearch) => {
    return linesOfResearch
      .map((line) => line.name) // Mapeia para obter apenas os nomes
      .join(', '); // Junta os nomes com vírgulas
  };

  return (
    <section className={stylesMember.globalPageMemberSection}>
      <h1 className={stylesMember.globalPageMemberTitle}> Atuação em Projetos</h1>
      {console.log(member.projects)}
      {member.projects.map((p) => (
        <CardInfo
          key={p.id}
          icon={Icon}
          title={p.title}
          description={formatResearchLines(p.linesOfResearch)}
        />
      ))}
    </section>
  );
}