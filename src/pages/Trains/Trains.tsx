import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';

import Header from '../../components/sections/Header/Header';
import LineCurrent from '../../components/UI/other/LineCurrent';
import Loader from '../../components/UI/other/Loader';
import SectionLastTickets from '../../components/sections/SectionLastTickets/SectionLastTickets';
import SectionSettings from '../../components/sections/SectionSettings/SectionSettings';
import SectionTickets from '../../components/sections/SectionTickets/SectionTickets';

const Trains = () => {
  const location = useLocation();
  const { trainsLoading } = useSelector((state: RootState) => state.trains);

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
      <Header />

      {trainsLoading ? (
        <Loader />
      ) : (
        <>
          <LineCurrent num={1} />
          <div className="page">
            <aside className="sidebar">
              <SectionSettings />
              <SectionLastTickets />
            </aside>
            <main className="main">
              <SectionTickets />
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Trains;