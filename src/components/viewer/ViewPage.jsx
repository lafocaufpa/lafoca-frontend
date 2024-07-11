import Header from '@components/header/Header';
import ViewPageMain from '@components/viewer/main/ViewPageMain';
import Footer from '@components/home/Footer/Footer';

export default function ViewPage({titlePage, descriptionPage}) {
  return (
    <>
      <Header/>
      <ViewPageMain/>
      <Footer marginTop={6.375}/>
    </>
  );
}