import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import HeaderHome from '../../components/sections/HeaderHome/HeaderHome';
import Line from '../../components/UI/other/Line';
import SectionAbout from '../../components/sections/SectionAbout/SectionAbout';
import SectionDescription from '../../components/sections/SectionDescription/SectionDescription';
import SectionFeedback from '../../components/sections/SectionFeedback/SectionFeedback';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <HeaderHome />
      <Line />
      <main>
        <SectionAbout />
        <SectionDescription />
        <SectionFeedback />
      </main>
    </>
  );
};

export default Home;