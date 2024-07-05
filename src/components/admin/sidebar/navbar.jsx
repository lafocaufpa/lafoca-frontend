'use client';

import styles from './sidebar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Image from 'next/image';
import UserDefault from '@images/default_user.png';
import LogoutButton from '@/components/auth/logout/LogoutButton';
import url from '@/routes/url';
import { FaUsersCog } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { GiArchiveResearch } from 'react-icons/gi';
import { TbSubtask } from 'react-icons/tb';
import { LiaUserCogSolid } from 'react-icons/lia';
import { GrGroup } from 'react-icons/gr';
import { LuBrainCircuit } from 'react-icons/lu';
import { MdOutlineClass } from 'react-icons/md';
import { BsJournalText } from 'react-icons/bs';
import { RiArticleLine } from 'react-icons/ri';
import { SiGoogleclassroom } from 'react-icons/si';
import { MdOutlineLock } from 'react-icons/md';
import { TbSchool } from 'react-icons/tb';

export default function NavBar({user}){

  const urlImage = user.urlPhoto || UserDefault;

  const NavLink = ({href, children, Icon }) => (
    <div>
      <Link className="nav-link text-white d-flex" href={href}><Icon size={20} className='me-2'/> {children}</Link>
    </div>
  );

  return (
    <div className="d-flex flex-column bg-dark text-white p-4 w-auto" style={{ minHeight: '100vh'}}>
      <div className={`${styles.scrollableNav} mb-auto`} style={{maxHeight: 'calc(55vh)', overflowY:'auto'}}>
        <nav className="nav flex-column">

          <NavLink href={url.admin.usuario.home} Icon={FaUsersCog}>
            Usuarios
          </NavLink>

          <NavLink href={url.admin.membro.home} Icon={GrGroup}>
            Membros
          </NavLink>

          <NavLink href={url.admin.linhadepesquisa.home} Icon={GiArchiveResearch}>
            Linhas de Pesquisa
          </NavLink>

          <NavLink href={url.admin.funcoes.home} Icon={TbSubtask}>
          Funções de Membros
          </NavLink>

          <NavLink href={url.admin.habilidades.home} Icon={LuBrainCircuit}>
          Habilidades
          </NavLink>

          <NavLink href={url.admin.turmas.home} Icon={TbSchool}>
          Turmas
          </NavLink>

          <NavLink href={url.admin.tccs.home} Icon={BsJournalText}>
          Tccs
          </NavLink>

          <NavLink href={url.admin.artigos.home} Icon={RiArticleLine}>
          Artigos
          </NavLink>

          <NavLink href={url.admin.projetos.home} Icon={SiGoogleclassroom}>
          Projetos
          </NavLink>

          <NavLink href={url.admin.seguranca.home} Icon={MdOutlineLock}>
          Segurança
          </NavLink>
           
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
          <h5 className="mb-1 fs-5">{user.name}</h5>
          <p className="mb-0 text-white fs-6">{user.email}</p>
        </div>
        <LogoutButton/>
      </div>
    </div>
  );
}
