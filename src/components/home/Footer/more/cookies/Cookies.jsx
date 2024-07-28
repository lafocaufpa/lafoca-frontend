import Footer from '@/components/home/Footer/Footer';
import styles from './Cookies.module.css';
import Header from '@components/header/Header';
export default function Cookies() {
  return (
    <>
    <Header/>
      <div className={styles.container}>
        <h1 className={styles.title}>Política de Cookies</h1>
        <p className={styles.date}>Atualizado em: 27/07/2024</p>
        <p>
          No LAFocA - Laboratório de Abordagens de Ensino Focadas ao Aluno, reconhecemos a importância da privacidade e segurança de suas informações. Esta Política de Cookies explica como e por que utilizamos cookies em nosso site, e como isso impacta você.
        </p>
        <h2 className={styles.subtitle}>O que são Cookies?</h2>
        <p>
          Cookies são pequenos arquivos de texto que são armazenados no seu dispositivo (computador, tablet, smartphone) quando você visita um site. Eles são amplamente utilizados para fazer com que os sites funcionem, ou funcionem de maneira mais eficiente, bem como para fornecer informações aos proprietários do site.
        </p>
        <h2 className={styles.subtitle}>Tipos de Cookies que Utilizamos</h2>
        <h3 className={styles.subsubtitle}>Cookies Estritamente Necessários</h3>
        <p>
          <strong>Finalidade:</strong> Estes cookies são essenciais para que você possa navegar pelo nosso site e usar suas funcionalidades, como acessar áreas seguras do site. Sem esses cookies, os serviços que você solicitou, como o acesso à área de administração, não podem ser fornecidos.
        </p>
        <p>
          <strong>Exemplo:</strong> Cookies que armazenam tokens JWT para autenticação e outras informações de segurança.
        </p>
        <h3 className={styles.subsubtitle}>Cookies de Segurança</h3>
        <p>
          <strong>Finalidade:</strong> Utilizamos cookies para garantir a segurança das informações e proteger o site contra fraudes e acessos não autorizados. Estes cookies ajudam a manter a sessão autenticada e a garantir que você esteja sempre conectado às áreas seguras.
        </p>
        <p>
          <strong>Exemplo:</strong> Cookies utilizados para armazenar tokens de autenticação JWT e informações relacionadas à segurança da sessão.
        </p>
        <h2 className={styles.subtitle}>Como e Onde Usamos Cookies</h2>
        <p>
          <strong>Áreas Autenticadas:</strong> Cookies são utilizados exclusivamente em áreas autenticadas do nosso site, como a área de administração. Eles não são utilizados para visitantes que não estão autenticados.
        </p>
        <p>
          <strong>Armazenamento de Tokens:</strong> Utilizamos cookies para armazenar tokens JWT e outras informações relacionadas à segurança para garantir que você permaneça autenticado enquanto navega pelas áreas protegidas do site.
        </p>
        <h2 className={styles.subtitle}>Como Gerenciar Cookies</h2>
        <p>
          Você pode controlar e gerenciar cookies através das configurações do seu navegador. A maioria dos navegadores permite que você recuse cookies ou exclua cookies existentes. No entanto, se você optar por recusar cookies, pode não conseguir utilizar todas as funcionalidades do nosso site.
        </p>
        <h2 className={styles.subtitle}>Alterações à Política de Cookies</h2>
        <p>
          Podemos atualizar esta Política de Cookies ocasionalmente para refletir mudanças em nossa prática de cookies ou por outros motivos operacionais, legais ou regulatórios. Recomendamos que você revise esta política periodicamente para estar informado sobre como usamos cookies.
        </p>
        <h2 className={styles.subtitle}>Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre nossa Política de Cookies ou sobre como lidamos com cookies, entre em contato conosco:
        </p>
        <p>
          <strong>Email:</strong> lafoca.3cp@gmail.com
        </p>
        <p>
          Obrigado por visitar o site do LAFocA. Agradecemos a sua confiança e compromisso com a sua privacidade.
        </p>
      </div>
      <Footer />
    </>
  );
}
