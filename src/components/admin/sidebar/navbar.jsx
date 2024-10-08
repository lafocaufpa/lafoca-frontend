'use client';

import stylesNavBar from './navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Image from 'next/image';
import UserDefault from '@images/default_user.png';
import LogoutButton from '@/components/auth/logout/LogoutButton';
import url from '@/routes/url';
import IconUsers from '@/components/icon/IconUsers';
import IconMembers from '@/components/icon/IconMembers';
import IconResearchs from '@/components/icon/IconResearchs';
import IconFunctions from '@/components/icon/IconFunctions';
import IconSkills from '@/components/icon/IconSkills';
import IconClasses from '@/components/icon/IconClasses';
import IconTccs from '@/components/icon/IconTccs';
import IconArticles from '@/components/icon/IconArticles';
import IconProjects from '@/components/icon/IconProjects';
import IconSecurity from '@/components/icon/IconSecurity';
import IconEdit from '@/components/icon/IconEdit';
import { useRouter } from 'next/navigation';
import IconInfo from '@/components/icon/IconInfo';
import { useState } from 'react';

export default function NavBar({ user }) {

  const router = useRouter();

  const urlImage = user.urlPhoto || UserDefault;

  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  const NavLink = ({ href, children, Icon, size = '20' }) => (
    <div className={stylesNavBar.linkHoverEffect}>
      <Link className="nav-link text-white d-flex ps-3" href={href}>
        <Icon width={size} height={size} className='me-2' />
        {children}
      </Link>
    </div>
  );

  const handleEdit = (user) => {
    router.push(url.admin.usuario.home + '/' + url.admin.usuario.editar(user.id));
  };

  return (
    <div className={`d-flex flex-column text-white ${stylesNavBar.container }`} style={{ minHeight: '100vh'}}>
      <div className={stylesNavBar.hamburguerLine}></div>
      <div className={`${stylesNavBar.scrollableNav} mb-auto`} style={{ maxHeight: 'calc(80vh)', overflowY: 'auto' }}>
        <nav className={`nav flex-column pt-3 ${stylesNavBar.navbar} ${isActive ? stylesNavBar.active : ''}`} >
          <NavLink href={url.admin.membro.home} Icon={IconMembers}>
            Membros
          </NavLink>

          <NavLink href={url.admin.usuario.home} Icon={IconUsers} onClick={closeMenu}>
            Usuarios
          </NavLink>

          <NavLink href={url.admin.linhadepesquisa.home} Icon={IconResearchs}>
            Linhas de Pesquisa
          </NavLink>

          <NavLink href={url.admin.funcoes.home} Icon={IconFunctions}>
            Funções de Membros
          </NavLink>

          <NavLink href={url.admin.habilidades.home} Icon={IconSkills} size='20'>
            Habilidades
          </NavLink>

          <NavLink href={url.admin.tccs.home} Icon={IconTccs}>
            Tccs
          </NavLink>

          <NavLink href={url.admin.artigos.home} Icon={IconArticles}>
            Artigos
          </NavLink>

          <NavLink href={url.admin.projetos.home} Icon={IconProjects}>
            Projetos
          </NavLink>

          <NavLink href={url.admin.seguranca.home} Icon={IconSecurity}>
            Segurança
          </NavLink>

          <NavLink href={url.admin.system.info} Icon={IconInfo}>
            Informações do Sistema
          </NavLink>
          <div className={`mt-auto ${stylesNavBar.profile}`}>
            <div className='border-top border-secondary m-auto'></div>
            <div className={'text-center pt-4 pb-3 p-3 d-flex align-items-center justify-content-center'} >
              <div className={stylesNavBar.hoverEffect} role='button' onClick={() => handleEdit(user)}>
                <div className="d-flex align-items-center">
                  <Image
                    className="rounded-circle me-3 mb-1"
                    src={urlImage}
                    alt={user.name}
                    width={50}
                    height={50}
                  />
                  <div className="flex-grow-1">
                    <h5 className="mb-0 fs-5">{user.name}</h5>
                    <p className="mb-0 text-white fs-6">{user.email}</p>
                    <IconEdit className={stylesNavBar.iconEdit} width={20} height={20} />
                  </div>

                </div>
              </div>
              <div className='ms-3' role="button">
                <LogoutButton />
              </div>
            </div>
          </div>
        </nav>
        <button className={stylesNavBar.MenuHamburger} onClick={toggleMenu}></button>
      </div>
      <div className={`mt-auto ${stylesNavBar.profile}`}>
        <div className='border-top border-secondary m-auto'></div>
        <div className={'text-center pt-4 pb-3 p-3 d-flex align-items-center justify-content-center'} >
          <div className={stylesNavBar.hoverEffect} role='button' onClick={() => handleEdit(user)}>
            <div className="d-flex align-items-center">
              <Image
                className="rounded-circle me-3 mb-1"
                src={urlImage}
                alt={user.name}
                width={50}
                height={50}
              />
              <div className="flex-grow-1">
                <h5 className="mb-0 fs-5">{user.name}</h5>
                <p className="mb-0 text-white fs-6">{user.email}</p>
                <IconEdit className={stylesNavBar.iconEdit} width={20} height={20} />
              </div>

            </div>
          </div>
          <div className='ms-3' role="button">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
