import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/sections/Header/Header';
import LineCurrent from '../../components/UI/other/LineCurrent';
import SectionDetails from '../../components/sections/SectionDetails/SectionDetails';
import SectionPayment from '../../components/sections/SectionPayment/SectionPayment';

const Payment = () => {
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
      <Header />
      <LineCurrent num={3} />
      <div className="page">
        <aside className="sidebar">
          <SectionDetails />
        </aside>
        <main className="main">
          <SectionPayment />
        </main>
      </div>
    </>
  );
};

export default Payment;