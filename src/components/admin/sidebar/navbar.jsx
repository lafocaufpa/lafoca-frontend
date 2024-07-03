'use client';

import styles from './sidebar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Image from 'next/image';
import UserDefault from '@images/default_user.png';
import LogoutButton from '@/components/auth/logout/LogoutButton';
import url from '@/routes/url';
import Accordion from 'react-bootstrap/Accordion';

export default function NavBar({user}){

  const urlImage = user.urlPhoto || UserDefault;

  return (
    <div className="d-flex flex-column bg-dark text-white p-4" style={{ minHeight: '100vh', width: '250px' }}>
      <div className={`${styles.scrollableNav} mb-auto`} style={{maxHeight: 'calc(55vh)', overflowY:'auto'}}>
        <nav className="nav flex-column">
          <Link className="nav-link text-white" href={url.admin.usuario.home}>Usuário</Link>
          <Link className="nav-link text-white" href={url.admin.membro.home}>Membro</Link>
          <Link className="nav-link text-white" href={url.admin.linhadepesquisa.home}>Linhas de Pesquisa</Link>
          <Link className="nav-link text-white" href={url.admin.funcoes.home}>Funções de Membros</Link>
          <Link className="nav-link text-white" href={url.admin.habilidades.home}>Habilidades</Link>
          <Link className="nav-link text-white" href={url.admin.turmas.home}>Turmas</Link>
          <Link className="nav-link text-white" href={url.admin.tccs.home}>Trabalhos de Conclusão de Curso</Link>
          <Link className="nav-link text-white" href={url.admin.artigos.home}>Artigos</Link>
          <Link className="nav-link text-white" href={url.admin.projetos.home}>Projetos</Link>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Segurança</Accordion.Header>
              <Accordion.Body >
                <Link className="nav-link text-white ps-3" href={url.admin.projetos.home}>Grupos</Link>
                <Link className="nav-link text-white ps-3" href={url.admin.projetos.home}>Permissões</Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </nav>
      </div>
      <div className="mt-auto">
        <div className="text-center border-top border-secondary pt-4 pb-3">
          <div className="mb-3">
            <Image
              className="rounded-circle"
              src={urlImage}
              alt={user.name}
              width={80}
              height={80}
            />
          </div>
          <h5 className="mb-1">{user.name}</h5>
          <p className="mb-0 text-white fs-6">{user.email}</p>
        </div>
        <LogoutButton/>
      </div>
    </div>
  );
}
