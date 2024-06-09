import Logo from '@/components/home/Logo/Logo';
import HeaderPage from '@home/Header/header/Header';

export default function Header({paddingBottom}) {
  return (
    <HeaderPage 
      background={'/assets/img/header-banner/BG.png'} 
      height={30} 
      marginBotton={0} 
      paddingBottom={paddingBottom}
    > 
      <Logo/>
    </HeaderPage>
  );
}