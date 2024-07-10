import Header from '@components/header/Header';
import ArticlesMain from '@components/articles/main/ArticlesMain';
import Footer from '@components/home/Footer/Footer';

export default function ArticlesPage() {
  return (
    <>
      <Header/>
      <ArticlesMain/>
      <Footer marginTop={6.375}/>
    </>
  );
}