import './style.scss'
import Header from '../components/header/Header';
import MainSection from '../components/main-section/MainSection';

export const Board = () => {
  return (
    <section className="section main">
      <Header />
      <MainSection />
    </section>
  );
};
